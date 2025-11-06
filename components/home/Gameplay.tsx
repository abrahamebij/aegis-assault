import { Card } from "../ui/card";
import { Target, Shield, Zap } from "lucide-react";

const enemies = [
  {
    name: "Darter",
    icon: Target,
    description: "Fast and agile. Swarms in numbers to overwhelm defenses.",
  },
  {
    name: "Brute",
    icon: Shield,
    description: "Heavily armored. Slow but devastating when they reach you.",
  },
  {
    name: "Splitter",
    icon: Zap,
    description: "Divides into smaller units when destroyed. Chain reactions await.",
  },
];

export const Gameplay = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-center mb-8">
          Survive the Onslaught
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          You are the Aegis Core. Locked at the center of the arena, you must defend yourself 
          against endless, evolving waves of enemies. Aim with your mouse, destroy the swarm, 
          and fight for your place on the blockchain.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {enemies.map((enemy) => (
            <Card 
              key={enemy.name} 
              className="gradient-card border-primary/20 p-8 text-center transition-smooth hover:border-primary/40 hover:-translate-y-2"
            >
              <enemy.icon className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-3">{enemy.name}</h3>
              <p className="text-muted-foreground">{enemy.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
