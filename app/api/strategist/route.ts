import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    const { gameData } = await request.json();

    const prompt = `
    You are the Oracle, an AI strategist for the space shooter game "Aegis Assault". 

Your job is to provide a single, one-time, proactive analysis based only on the player's run history. You must not ask any questions.

You will be given a JSON array of the player's run history. The first element in the array ([0]) is the player's most recent game session. The rest of the array is their past performance.


Your Task:
1. Analyze the most recent run (the first item).
2. Compare this recent run to their past history to find the most significant pattern or difference.
3. Focus on how their finalBuild (the upgrades) affected their timeSurvived and finalScore.
4. Provide a single, concise paragraph of actionable advice for their next run. Start your response with "Strategy Analysis:".

Player Run History: ${JSON.stringify(gameData, null, 2)}

Provide concise strategic advice focusing on:
1. Upgrade selection priorities
2. Survival tactics
3. Areas for improvement

Keep response under 180 words and speak as the mystical Oracle.`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const advice = result.text;

    return NextResponse.json({ advice });
  } catch (error) {
    console.error('Oracle error:', error);
    return NextResponse.json({ error: 'Oracle is unavailable' }, { status: 500 });
  }
}

export async function GET() {
  return new Response(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Oracle - AI Strategist</title>
      <style>
        body { font-family: Arial, sans-serif; background: #000; color: #fff; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        button { background: #4f46e5; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
        #advice { background: #1f2937; padding: 20px; border-radius: 10px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🔮 Oracle - AI Strategist</h1>
        <p>Consult the Oracle for strategic advice on your Aegis Assault gameplay.</p>
        <button onclick="getAdvice()">Get Strategic Advice</button>
        <div id="advice"></div>
      </div>
      <script>
        async function getAdvice() {
          const gameData = JSON.parse(localStorage.getItem('aegis-game-data') || '{}');
          const response = await fetch('/api/strategist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameData })
          });
          const result = await response.json();
          document.getElementById('advice').innerHTML = '<h3>Oracle\'s Wisdom:</h3><p>' + result.advice + '</p>';
        }
      </script>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}