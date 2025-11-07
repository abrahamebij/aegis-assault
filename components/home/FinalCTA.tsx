import Link from "next/link";
import { Button } from "../ui/button";

export const FinalCTA = () => {
  return (
    <section className="py-32 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
          Defend the Core.
          <br />
          Secure Your Legacy.
        </h2>
        <p className="text-xl text-muted-foreground mb-12">
          Join the arena and prove your skills on the blockchain
        </p>
        <Button variant="hero" size="lg" className="text-lg px-12 py-6 h-auto">
          <Link href={"/play"}>PLAY NOW</Link>
        </Button>
      </div>
    </section>
  );
};
