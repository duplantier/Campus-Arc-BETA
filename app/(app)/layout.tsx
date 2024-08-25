import type { Metadata } from "next";
import { Raleway, Righteous } from "next/font/google";
import "../globals.css";
import OCConnectWrapper from "@/components/OCConnectWrapper";

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
import dynamic from "next/dynamic";

const ClientOnlyAppNavbar = dynamic(
  () =>
    import("@/components/app/Navbar").then(
      (mod) => mod as { default: React.ComponentType }
    ),
  {
    ssr: false,
  }
);
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
      <body className={`raleway-text ${righteous.variable} bg-dot-gray-400 `}>
        <ClientOnlyAppNavbar />
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          {children}
        </OCConnectWrapper>
      </body>
    </html>
  );
}
