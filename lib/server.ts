"use server"

export async function getPrivateKey() {
    return process.env.ADMIN_WALLET_PRIVATE_KEY! as `0x${string}`
}