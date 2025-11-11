/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { NextResponse } from "next/server";
import { SchemaEncoder } from "@somnia-chain/streams";
import { privateKeyToAccount } from "viem/accounts";
import { getPrivateKey } from "@/lib/server";
import { gameSchema, initSomnia } from "@/lib/somnia";
import { parseLeaderboard } from "@/lib/utils";

/**
 * @route GET /api/leaderboard
 * @desc Fetches leaderboard data stored under the same schemaId.
 */
export async function GET() {
  const { sdk, schemaId } = await initSomnia();
  // console.log('schemaId: ', schemaId);

  try {
    // 1️⃣ Resolve admin address (same wallet that submitted the scores)
    const adminAccount = privateKeyToAccount(await getPrivateKey());
    const publisher = adminAccount.address;

    // 2️⃣ Fetch all stream entries for this publisher + schema
    const entries = await sdk.streams.getAllPublisherDataForSchema(schemaId!, publisher);

    if (!entries?.length) {
      return NextResponse.json([]);
    }

    // 3️⃣ Decode data based on your schema
    const encoder = new SchemaEncoder(
      gameSchema
    );

    // entries contains the raw data, we need to decode each entry
    const decoded = entries.map((entry: any) => {
      // entry should be the raw hex data that needs decoding
      const decodedData = encoder.decodeData(entry as `0x${string}`);
      const obj: any = {};
      for (const field of decodedData) {
        obj[field.name] = field.value;
      }
      return obj;
    });
    // console.log('decoded: ', decoded);

    // Sort and format for the leaderboard
    const leaderboard = parseLeaderboard(decoded);

    return NextResponse.json(leaderboard);
  } catch (err) {
    console.error("Leaderboard fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
