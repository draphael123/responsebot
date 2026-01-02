import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fountain Response Bot",
  description: "Generate empathetic, compliant patient responses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

