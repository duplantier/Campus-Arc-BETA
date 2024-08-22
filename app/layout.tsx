import type { Metadata } from "next";
import { Poppins, Righteous } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const righteous = Righteous({ subsets: ["latin"],weight: ["400"], variable: "--font-righteous" });

export const metadata: Metadata = {
  title: "Campus Arc BETA",
  description: "This is the BETA version of the Campus Arc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${righteous.variable}`}>
        {children}
      </body>
    </html>
  );
}
