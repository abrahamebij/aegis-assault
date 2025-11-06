"use server"
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session'; // Assumes lib/session.ts exists
// Import your Somnia/DynamoDB logic here in the future
// import { submitToBlockchain, saveToDatabase } from '@/lib/somnia';

/**
 * @route POST /api/submit-score
 * @desc Receives a score from the game, verifies the user,
 * and submits it to the blockchain and/or database.
 * This is used by the `useSubmitScore` hook.
 */
export async function POST(request: Request) {
  try {
    // 1. Check if user is logged in
    const session = await getSession();
    if (!session.isLoggedIn || !session.walletAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get the score from the request body
    const { score } = await request.json();
    if (typeof score !== 'number') {
      return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
    }

    const player = session.walletAddress;

    console.log(`Received score ${score} from player ${player}`);

    // 3. --- THIS IS WHERE YOU DO YOUR WEB3 & DB LOGIC ---
    //
    //    For the hackathon, you would do two things here:
    //
    //    a) Submit to your DynamoDB (for fast reads by the AI)
    //    await saveToDatabase({ player, score });
    //
    //    b) Submit to the Somnia smart contract (for verifiable proof)
    //    const tx = await submitToBlockchain({ player, score });
    //    console.log('Transaction hash:', tx.hash);

    // 4. For now, we'll just log it and return success
    return NextResponse.json({ 
      ok: true, 
      message: `Score of ${score} for ${player} received.` 
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}