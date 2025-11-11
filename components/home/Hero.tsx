import { Button } from "../ui/button";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(/img/hero-gameplay.jpg)` }}
      />
      <div className="absolute inset-0 gradient-hero" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          Aegis Assault
        </h1>
        <p className="text-xl md:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          The On-Chain Arena Shooter with an AI-Powered Strategist
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button variant="hero" size={"lg"}>
            <Link className="flex gap-2 items-center text-lg" href={"/play"}>
              Play Now <FaPlay />
            </Link>
          </Button>
          <Button variant="outline" size={"lg"}>
            <Link
              className="flex gap-2 items-center text-lg"
              href={"/leaderboard"}
            >
              View Leaderboard <MdLeaderboard />
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full mx-auto" />
        </div>
      </div>
    </section>
  );
};
