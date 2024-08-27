import type { Metadata } from "next";
import { Raleway, Righteous } from "next/font/google";
import "./globals.css";
import OCConnectWrapper from "../components/OCConnectWrapper";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-raleway",
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
  /* 
  START YOUR LOCALHOST AS SUDO!!!!!!!!!!!!!!!!!!!!!!!!
  */
  return (
    <html lang="en">
      <body className={`raleway-text ${righteous.variable}`}>
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          {children}
        </OCConnectWrapper>
      </body>
    </html>
  );
}
