"use server"
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session'; // Assumes lib/session.ts exists

/**
 * @route GET /api/auth/me
 * @desc Gets the current user's session data.
 * This is used by the `useGetSession` hook.
 */
export async function GET() {
  try {
    const session = await getSession();
    // console.log('session: ', session);

    if (!session.isLoggedIn) {
      return NextResponse.json({ isLoggedIn: false }, { status: 200 });
    }

    return NextResponse.json(
      {
        isLoggedIn: session.isLoggedIn,
        walletAddress: session.walletAddress,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}