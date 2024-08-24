import type { Metadata } from "next";
import { Poppins, Righteous } from "next/font/google";
import "../globals.css";
import OCConnectWrapper from "@/components/OCConnectWrapper";
import AppNavbar from "@/components/app/Navbar";

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
    redirectUri: "http://localhost:3003/redirect",
  };
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${righteous.variable} bg-gray-100 `}>
        <AppNavbar />
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          {children}
        </OCConnectWrapper>
      </body>
    </html>
  );
}
