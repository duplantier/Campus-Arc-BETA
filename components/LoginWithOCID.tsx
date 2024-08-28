"use client";

import React from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import Image from "next/image";

const LoginWithOCID = () => {
  const { ocAuth } = useOCAuth();

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: "opencampus" });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <button
      className="rounded-full  px-6 py-3 border-2 bg-white transition-all duration-300 border-brand-blue hover:bg-brand-blue hover:text-gray-50 text-gray-950 inline-block"
      onClick={handleLogin}
    >
      <span className="flex justify-center items-center gap-2">
        <Image
          src="/oc-logo.svg"
          alt="Campus Arc BETA Logo"
          width={50}
          height={100}
          className="w-8 h-auto"
        />{" "}
        Verify with OC ID
      </span>
    </button>
  );
};

export default LoginWithOCID;
