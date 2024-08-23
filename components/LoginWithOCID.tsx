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

  return <button onClick={handleLogin}>Verify with Open Campus</button>;
};

export default LoginWithOCID;
