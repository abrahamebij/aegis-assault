"use client"

import { GameSession } from "@/lib/gameDatabase";
import { useMutation } from "@tanstack/react-query";

export function useAI() {
    return useMutation({
        mutationFn: askAI,
        mutationKey: ['askAI']
    })
}

const askAI = async (data: GameSession[]) => {
    const response = await fetch('/api/strategist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameData: data })
    });
    const result = await response.json();
    return result.advice;
}