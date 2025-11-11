import { SDK } from "@somnia-chain/streams"
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from "viem/accounts";
import { somniaTestnet } from 'viem/chains'
import { getPrivateKey } from "./server";

export const gameSchema = 
  "string runId, uint256 finalScore, uint32 finalLevelReached, uint32 timeSurvived, uint32 totalKills, uint32 totalUpgrades, string buildJson, string killCountJson, string player";

export async function initSomnia() {
  const publicClient = createPublicClient({
    chain: somniaTestnet,
    transport: http(somniaTestnet.rpcUrls.default.http[0])
  });

  const adminAccount = privateKeyToAccount(await getPrivateKey());

  const adminWalletClient = createWalletClient({
    account: adminAccount,
    chain: somniaTestnet,
    transport: http(somniaTestnet.rpcUrls.default.http[0]),
  });

  const sdk = new SDK({
    public: publicClient,
    wallet: adminWalletClient,
  });

  const schemaId = await sdk.streams.computeSchemaId(gameSchema);
  const nonce = await publicClient.getTransactionCount({
    address: adminAccount.address,
    blockTag: 'pending',
  });

  return { sdk, schemaId, nonce, gameSchema };
}
