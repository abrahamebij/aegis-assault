"use server"
import { NextResponse } from 'next/server';

// This is a mock database. In your real app, you'd
// query your AWS DynamoDB or Firebase here.
const MOCK_LEADERBOARD = [
  { rank: 1, player: '0x1a2...b3c4', score: 15200 },
  { rank: 2, player: '0x9f8...e7d6', score: 12100 },
  { rank: 3, player: '0x4c5...d6e7', score: 9800 },
  { rank: 4, player: '0x7b8...a9f0', score: 7500 },
  { rank: 5, player: '0x2d3...c4b5', score: 5100 },
];

/**
 * @route GET /api/leaderboard
 * @desc Fetches the global leaderboard data.
 * This is used by the `useGetLeaderboard` hook.
 */
export async function GET() {
  try {
    // In a real app:
    // const leaderboardData = await db.collection('scores').orderBy('score', 'desc').limit(10).get();
    
    // For the hackathon, we'll return mock data immediately.
    return NextResponse.json(MOCK_LEADERBOARD);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}