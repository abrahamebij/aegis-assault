"use server"
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session'; // Assumes lib/session.ts exists

/**
 * @route GET /api/auth/nonce
 * @desc Generates a unique message (nonce) for the user to sign.
 * This is the first step in the `useLogin` hook.
 */
export async function GET() {
  try {
    const session = await getSession();

    // Create a unique, time-stamped message for the user to sign
    const message = `Sign in to Aegis Assault: ${Date.now()}`;

    // Store this exact message in the session, so we can verify it later
    // This prevents "replay attacks"
    session.messageToSign = message;
    await session.save();

    return NextResponse.json({ message });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}