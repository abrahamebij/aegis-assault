"use server"
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session'; // Adjust path if needed

export async function GET() {
  try {
    const session = await getSession();
    
    // 4. Destroy the session
    session.destroy();

    return NextResponse.json({ ok: true, message: 'Logged out' });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}