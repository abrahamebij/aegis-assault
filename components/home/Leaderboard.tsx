import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Trophy } from "lucide-react";

// Mock data for demonstration
const mockLeaderboard = [
  { rank: 1, address: "0x742d35Cc6634C0532925a3b8", score: 145670 },
  { rank: 2, address: "0x89205A3A3b2A69De6Dbf7f01", score: 132450 },
  { rank: 3, address: "0x1f9840a85d5aF5bf1D1762F9", score: 128900 },
  { rank: 4, address: "0xC02aaA39b223FE8D0A0e5C4F", score: 124230 },
  { rank: 5, address: "0x514910771AF9Ca656af840dff8", score: 119850 },
  { rank: 6, address: "0x95aD61b0a150d79219dCF64E1", score: 115670 },
  { rank: 7, address: "0x4d224452801ACEd8B2F0aebE", score: 112340 },
  { rank: 8, address: "0x2260FAC5E5542a773Aa44fBCf", score: 108920 },
  { rank: 9, address: "0x0bc529c00C7b3B8D0329b8A2", score: 105670 },
  { rank: 10, address: "0x7D1AfA7B718fb893dB30A3aB", score: 102450 },
];

export const Leaderboard = () => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Trophy className="w-12 h-12 text-primary" />
          <h2 className="text-5xl font-bold text-center">
            Live On-Chain Leaderboard
          </h2>
        </div>
        <p className="text-muted-foreground text-center mb-12 text-lg">
          Every score verified and stored on the Somnia blockchain
        </p>

        <Card className="gradient-card border-primary/20">
          <Table>
            <TableHeader>
              <TableRow className="border-primary/20 hover:bg-transparent">
                <TableHead className="text-primary font-bold">Rank</TableHead>
                <TableHead className="text-primary font-bold">Wallet Address</TableHead>
                <TableHead className="text-right text-primary font-bold">High Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeaderboard.map((entry) => (
                <TableRow 
                  key={entry.rank} 
                  className="border-primary/10 hover:bg-primary/5 transition-smooth"
                >
                  <TableCell className={`font-bold ${getRankColor(entry.rank)}`}>
                    #{entry.rank}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {entry.address}...
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    {entry.score.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
};
