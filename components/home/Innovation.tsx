
import { Brain, Link2, Award } from "lucide-react";
import { Card } from "../ui/card";

const features = [
  {
    title: "AI-Powered Strategist",
    subtitle: "Your Personal Battle Analyst",
    icon: Brain,
    description: "Powered by Amazon Q, our AI Strategist analyzes your on-chain game history. After each run, ask it for personalized strategies, weapon loadouts, and insights on how to beat the top scores.",
    badge: "Amazon Q",
  },
  {
    title: "True On-Chain Gaming",
    subtitle: "Built on Somnia",
    icon: Link2,
    description: "This isn't a \"fake\" dApp. Every game session and high score is logged as a permanent, verifiable transaction on the high-speed Somnia blockchain, feeding the AI in real-time.",
    badge: "Somnia",
  },
  {
    title: "Verifiable Player Identity",
    subtitle: "Own Your Achievements",
    icon: Award,
    description: "Connect your wallet to use your NFT ship skins in-game. Your high scores and rare achievements are minted back to you as new, soul-bound tokens (SBTs) as proof of your skill.",
    badge: "NFT",
  },
];

export const Innovation = () => {
  return (
    <section className="py-24 px-4 bg-card/30">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-5xl font-bold text-center mb-6">
          More Than a Game. A Next-Gen dApp.
        </h2>
        <p className="text-muted-foreground text-center mb-16 text-lg">
          Built for the hackathon with cutting-edge blockchain and AI technology
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="gradient-card border-primary/20 p-8 transition-smooth hover:border-primary/40 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-6">
                <feature.icon className="w-12 h-12 text-primary" />
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                  {feature.badge}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-secondary font-semibold mb-4">{feature.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
