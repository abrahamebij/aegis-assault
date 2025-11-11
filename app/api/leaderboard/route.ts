"use server"
import { NextResponse } from "next/server";
import { SchemaEncoder } from "@somnia-chain/streams";
import { privateKeyToAccount } from "viem/accounts";
import { getPrivateKey } from "@/lib/server";
import { initSomnia } from "@/lib/somnia";

/**
 * @route GET /api/leaderboard
 * @desc Fetches leaderboard data stored under the same schemaId.
 */
export async function GET() {
  const { sdk, schemaId } = await initSomnia();

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
      "string runId, uint256 finalScore, uint32 finalLevelReached, uint32 timeSurvived, uint32 totalKills, uint32 totalUpgrades, string buildJson, string killCountJson"
    );

    const decoded = entries.map((fields: any[]) => {
      const obj: Record<string, any> = {};
      for (const f of fields) {
        obj[f.name] = f.value?.value ?? f.value;
      }
      return obj;
    });

    // 4️⃣ Sort and format for the leaderboard
    const leaderboard = decoded
      .sort((a, b) => Number(b.finalScore) - Number(a.finalScore))
      .slice(0, 10)
      .map((item, i) => ({
        rank: i + 1,
        player: item.runId || "Unknown",
        score: Number(item.finalScore),
      }));

    return NextResponse.json(leaderboard);
  } catch (err) {
    console.error("Leaderboard fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
