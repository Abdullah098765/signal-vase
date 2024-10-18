import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Signal Vase",
  description:
    "Signal Vase is a comprehensive trading platform designed to empower users with accurate trading signals across various financial markets including currency, gold, crypto, and forex. With Signal Vase, users can access a diverse range of signals provided by experienced traders, enabling them to make informed trading decisions and potentially enhance their financial success. The platform also features a robust review system where users can rate signal providers based on their performance, helping to foster transparency and accountability within the trading community. Whether you're a seasoned trader looking for reliable signals or a novice seeking guidance, Signal Vase offers a user-friendly and secure environment to explore and engage in the world of trading.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={inter.className + " w-full h-full "}>{children}</body>
    </html>
  );
}
