import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zanwei.guo",
  description: "zanwei's portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <main>{children}</main>
      </body>
    </html>
  );
}
