import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Operation Black Vault",
  description:
    "A browser-based cybersecurity escape-room CTF. Infiltrate Black Vault Bank, solve 10 challenges, and exfiltrate the evidence before AEGIS wipes it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-200 antialiased">{children}</body>
    </html>
  );
}
