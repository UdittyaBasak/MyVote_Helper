'use client';

import { SessionProvider } from "next-auth/react";
import SecurityHandler from "./SecurityHandler";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SecurityHandler />
      {children}
    </SessionProvider>
  );
}
