import type { Metadata } from "next";
import { Poppins, Righteous } from "next/font/google";
import "./globals.css";
import OCConnectWrapper from "../components/OCConnectWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-poppins",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-righteous",
});

export const metadata: Metadata = {
  title: "Campus Arc BETA",
  description: "This is the BETA version of the Campus Arc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const opts = {
    redirectUri: "https://www.campusarc.io/redirect",
  };
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${righteous.variable}`}>
        <OCConnectWrapper opts={opts} sandboxMode={false}>
          {children}
        </OCConnectWrapper>
      </body>
    </html>
  );
}
