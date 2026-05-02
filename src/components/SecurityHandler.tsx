'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function SecurityHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      // Set inactivity timeout to 5 minutes (300,000ms)
      timeoutId = setTimeout(() => {
        signOut({ callbackUrl: '/login' });
      }, 300000); 
    };

    // Activity listeners
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, resetTimer));

    // Initial timer start
    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, [session]);

  return null;
}
