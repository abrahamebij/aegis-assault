/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { toast } from 'sonner';
import { createWalletClient, custom } from 'viem';
import { somniaTestnet } from 'viem/chains';
import { useLogin } from './useSession';

export function useWallet() {
    const {mutate: login, data: signature} = useLogin();

    // A function to handle the connection
    const connect = async () => {
        if (
            typeof window !== "undefined" &&
            (window as any).ethereum !== undefined
        ) {
            try {
                await (window as any).ethereum.request({
                    method: "eth_requestAccounts",
                });
                const client = createWalletClient({
                    chain: somniaTestnet,
                    transport: custom((window as any).ethereum),
                });
                const [walletAddress] = await client.getAddresses();
                if (walletAddress) {
                   login({walletAddress, walletClient: client});
                    return { walletAddress, signature }
                } else {
                    throw Error("No wallet address found");
                }
            } catch (e: any) {
                console.error(e.toString());
            }
        } else {
            toast.error("Please install MetaMask");
            throw Error("MetaMask not detected");
        }
    };



    return { connect };
}