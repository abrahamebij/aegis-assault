"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";
import { useGetLeaderboard } from "@/hooks/useSession";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

export function Leaderboard() {
  const { data, isPending } = useGetLeaderboard();
  const { walletAddress } = useUser();

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  return (
    <section className="py-24 px-4 min-h-screen bg-card/30">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Trophy className="w-12 h-12 text-primary" />
          <h1 className="text-5xl font-bold text-center">
            Live On-Chain Leaderboard
          </h1>
        </div>
        <p className="text-muted-foreground text-center mb-12 text-lg">
          Every score verified and stored on the Somnia blockchain
        </p>

        <Card className="gradient-card border-primary/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-primary/20 hover:bg-transparent">
                <TableHead className="text-primary font-bold">Rank</TableHead>
                <TableHead className="text-primary font-bold">
                  Wallet Address
                </TableHead>
                <TableHead className="text-right text-primary font-bold">
                  High Score
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isPending
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TableRow
                      key={i}
                      className="border-primary/10 animate-pulse"
                    >
                      <TableCell className="py-4">
                        <div className="h-4 w-6 bg-primary/10 rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-48 bg-primary/10 rounded" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="h-4 w-12 ml-auto bg-primary/10 rounded" />
                      </TableCell>
                    </TableRow>
                  ))
                : data?.map((entry) => (
                    <TableRow
                      key={entry.rank}
                      className={`border-primary/10 hover:bg-primary/5 transition-smooth ${
                        entry.wallet === walletAddress
                          ? "bg-linear-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50"
                          : ""
                      }`}
                    >
                      <TableCell
                        className={`font-bold ${getRankColor(entry.rank)}`}
                      >
                        #{entry.rank}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {entry.wallet}...
                      </TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {entry.score.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Card>

        {!isPending && (
          <p className="text-center mt-6 text-sm text-muted-foreground">
            Updated in real-time • Data synced from{" "}
            <Link
              className="underline hover:no-underline underline-offset-2"
              href="https://shannon-explorer.somnia.network/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Somnia
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
