"use client";

import React from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";

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
      className="rounded-full px-6 py-3 border-2 transition-all duration-300 border-brand-blue hover:bg-brand-blue hover:text-gray-50 text-gray-950 inline-block"
      onClick={handleLogin}
    >
      Verify with OC ID
    </button>
  );
};

export default LoginWithOCID;
