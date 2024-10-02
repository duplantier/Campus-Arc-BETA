"use client";
import Image from "next/image";
import React from "react";
import AccountButton from "../AccountButton";
import Link from "next/link";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

const AppNavbar = () => {
  const { authState } = useOCAuth();
  const router = useRouter();
  let isLogOut = sessionStorage.getItem("isLogOut");
  return authState.isAuthenticated && isLogOut && isLogOut != "true" ? (
    <div className="w-full border-b bg-white z-50">
      <nav className="min-h-[10vh] py-6 flex items-center justify-between max-w-[90%] mx-auto">
        <Image
          src="/logo.svg"
          alt="Campus Arc BETA Logo"
          width={200}
          height={100}
          className="w-48 h-auto cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="flex justify-center items-center gap-2">
          <w3m-button />
          <AccountButton />
        </div>
      </nav>
    </div>
  ) : (
    <div className="w-full border-b bg-white z-50">
      <nav className="min-h-[10vh] py-6 flex items-center justify-between max-w-[90%] mx-auto">
        <Image
          src="/logo.svg"
          alt="Campus Arc BETA Logo"
          width={200}
          height={100}
          className="w-48 h-auto cursor-pointer"
          onClick={() => router.push("/")}
        />

        <div className="flex justify-center items-center gap-2">
          <w3m-button />
          <AccountButton />
        </div>
      </nav>
    </div>
  );
};

export default AppNavbar;
