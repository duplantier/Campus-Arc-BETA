import type { Metadata } from "next";
import { Raleway, Righteous } from "next/font/google";
import "./globals.css";
import OCConnectWrapper from "../components/OCConnectWrapper";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";

import { config } from "@/config";
import AppKitProvider from "@/context";
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
    redirectUri: "http://www.campusarc.io/redirect",
    //redirectUri: "http://localhost:3000/redirect",
  };
  /* 
  START YOUR LOCALHOST AS SUDO!!!!!!!!!!!!!!!!!!!!!!!!
  */ const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={`${raleway.variable} ${righteous.variable} font-sans`}>
        <AppKitProvider initialState={initialState}>
          <OCConnectWrapper opts={opts} sandboxMode={true}>
            {children}
          </OCConnectWrapper>
        </AppKitProvider>
      </body>
    </html>
  );
}
