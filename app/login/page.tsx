"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaCopy, FaCheckCircle } from "react-icons/fa";
import { useWallet } from "@/hooks/useWallet";
import { useMutation } from "@tanstack/react-query";
import { useGetSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isCopied, setIsCopied] = useState(false);
  const { connect } = useWallet();
  const { data: session, isPending: isSessionPending } = useGetSession();
  const router = useRouter();

  const { data, isPending, mutate } = useMutation({
    mutationKey: ["wallet"],
    mutationFn: connect,
  });

  useEffect(() => {
    if (session?.isLoggedIn) {
      router.push("/play");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleCopy = () => {
    navigator.clipboard.writeText(data?.walletAddress as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-background to-background-end">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
            Aegis Assault
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect your wallet to enter the arena
          </p>
        </div>

        {!session?.isLoggedIn && (
          <Button
            variant="hero"
            size="lg"
            onClick={() => mutate()}
            disabled={isPending || isSessionPending}
            className="text-lg px-12"
          >
            {isPending ? "Connecting..." : "Connect MetaMask"}
          </Button>
        )}

        {(data?.signature || session?.walletAddress) && (
          <div className="flex items-center justify-center gap-2 text-green-500 font-mono bg-green-500/10 rounded-lg p-3 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Connected: {session?.walletAddress ? session?.walletAddress.slice(0, 6): data?.walletAddress.slice(0, 6)}...
            {session?.walletAddress ? session?.walletAddress.slice(-4): data?.walletAddress.slice(-4)}
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {isCopied ? <FaCheckCircle /> : <FaCopy />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
