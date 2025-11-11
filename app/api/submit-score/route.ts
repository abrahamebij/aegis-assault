"use server"
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session'; // Assumes lib/session.ts exists
import { stringToHex } from 'viem';
import { SchemaEncoder } from '@somnia-chain/streams';
import { initSomnia } from '@/lib/somnia';

/**
 * @route POST /api/submit-score
 * @desc Receives a score from the game, verifies the user,
 * and submits it to the blockchain and/or database.
 * This is used by the `useSubmitScore` hook.
 */
export async function POST(request: Request) {
  const { sdk, schemaId, gameSchema } = await initSomnia();
  try {
    // 1. Check if user is logged in
    const session = await getSession();
    if (!session.isLoggedIn || !session.walletAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get the score from the request body
    const data = await request.json();
    console.log('data: ', data);

    const playerAddress = session.walletAddress as `0x${string}`;
    console.log('playerAddress: ', playerAddress);

    console.log(`Received score ${data.finalScore} from player ${playerAddress}`);

    // 3. --- THIS IS WHERE YOU DO YOUR WEB3 & DB LOGIC ---
    //
    const schemaEncoder = new SchemaEncoder(gameSchema);

    // const adminAccount = privateKeyToAccount(
    //   process.env.ADMIN_WALLET_PRIVATE_KEY as `0x${string}`
    // );
    // const adminWalletClient = createWalletClient({
    //   account: adminAccount,
    //   chain: somniaTestnet,
    //   transport: http(somniaTestnet.rpcUrls.default.http[0]),
    // });

    // const publicClient = createPublicClient({
    //   chain: somniaTestnet,
    //   transport: http(somniaTestnet.rpcUrls.default.http[0]),
    // });

    // const sdk = new SDK({
    //   public: publicClient,
    //   wallet: adminWalletClient,
    // });

    const encodedData = schemaEncoder.encodeData([
      { name: 'runId', value: data.runId, type: 'string' },
      {
        name: 'finalScore',
        value: data.finalScore.toString(),
        type: 'uint256',
      },
      {
        name: 'finalLevelReached',
        value: data.finalLevelReached.toString(),
        type: 'uint32',
      },
      {
        name: 'timeSurvived',
        value: data.timeSurvived.toString(),
        type: 'uint32',
      },
      { name: 'totalKills', value: data.totalKills.toString(), type: 'uint32' },
      {
        name: 'totalUpgrades',
        value: data.totalUpgrades.toString(),
        type: 'uint32',
      },
      { name: 'buildJson', value: data.buildJson, type: 'string' }, // Now holds '{"multiShot":2, ...}'
      { name: 'killCountJson', value: data.killCountJson, type: 'string' }, // Holds '{"basic":21, ...}'
      { name: 'player', value: playerAddress.toString(), type: "string" }
    ]);
    //
    //    b) Submit to the Somnia smart contract (for verifiable proof)

    const publishTxHash = await sdk.streams.set([{
      id: stringToHex(`${data.runId}`, { size: 32 }),
      schemaId: schemaId!,
      data: encodedData,
    }])

    console.log('Score saved to Somnia Stream. Tx:', publishTxHash);

    return NextResponse.json({
      ok: true,
      message: `Score saved to Somnia.`,
      transactionHash: publishTxHash,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error: Unable to save result to the blockchain' }, { status: 500 });
  }
}