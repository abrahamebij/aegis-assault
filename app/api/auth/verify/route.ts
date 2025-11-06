"use server"
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session'; // Adjust path if needed
import { verifyMessage } from 'viem';

export async function POST(request: Request) {
  const { message, signature, walletAddress } = await request.json();

  if (!message || !signature || !walletAddress) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  try {
    // Use viem to verify the signature
    const isSignatureValid = await verifyMessage({
      address: walletAddress,
      message: message,
      signature: signature,
    });

    if (!isSignatureValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // --- SIGNATURE IS VALID ---
    // 1. Get the session
    const session = await getSession();

    // 2. Set the session data
    session.isLoggedIn = true;
    session.walletAddress = walletAddress;

    // 3. Save the session (this writes the cookie)
    await session.save();

    return NextResponse.json({ ok: true, message: 'Login successful' });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}