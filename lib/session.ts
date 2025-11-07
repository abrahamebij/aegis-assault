import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

// 1. Define the shape of your session data
// This is where you can add whatever you want to store
export interface SessionData extends SessionOptions {
  isLoggedIn?: boolean;
  walletAddress?: string;
  messageToSign?: string;
  // Add any other data you want to store in the session
}

// 2. Define your session options
export const sessionOptions = {
  cookieName: 'aegis-session', // Name of your cookie
  cookieOptions: {
    // secure: process.env.NODE_ENV === 'production', // Use this in production (HTTPS)
    secure: false, // Use this for local development (HTTP)
  },
};

// 3. Create a helper function to get the session
// This uses the Next.js 14 App Router `cookies()` function
export async function getSession() {
  "use server"
  const session = await getIronSession<SessionData>(await cookies(), { ...sessionOptions, password: process.env.SECRET_COOKIE_PASSWORD! });
  // console.log('session: ', session);
  return session;
}
