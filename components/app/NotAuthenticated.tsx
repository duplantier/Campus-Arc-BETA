import { ShieldX } from "lucide-react";
import Image from "next/image";
import React from "react";
import LoginWithOCID from "../LoginWithOCID";

const NotAuthenticated = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-3 justify-center items-center">
      <Image
        src="/logo.svg"
        alt="Campus Arc BETA Logo"
        width={200}
        height={100}
        className="w-48 h-auto"
      />
      <div className=" flex flex-col justify-center items-center gap-4 rounded-3xl p-6 border bg-white">
        <h1 className="text-2xl text-gray-950 flex justify-center items-center">
          <ShieldX size={34} className="animate-pulse text-red-500" /> You are
          not authenticated.
        </h1>
        <p>Please verify your identity with Open Campus ID.</p>
        <LoginWithOCID />
      </div>
    </div>
  );
};

export default NotAuthenticated;
