import { Hero } from "@/components/home/Hero";
import { Gameplay } from "@/components/home/Gameplay";
import { Innovation } from "@/components/home/Innovation";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Leaderboard } from "@/components/home/Leaderboard";
import { TechStack } from "@/components/home/TechStack";

const Home = () => (
  <div className="min-h-screen grid">
    <Hero />
    <Gameplay />
    <Innovation />
    <Leaderboard />
    <TechStack />
    <FinalCTA />
  </div>
);

export default Home;
