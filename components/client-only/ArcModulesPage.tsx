"use client";
import React from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import NotAuthenticated from "@/components/app/NotAuthenticated";
import SideNavigation from "@/components/app/SideNavigation";

const ArcModulesPage = () => {
  const { authState } = useOCAuth();
  let isLogOut = sessionStorage.getItem("isLogOut");

  return authState.isAuthenticated && isLogOut && isLogOut != "true" ? (
    <main className="text-gray-950 max-w-[80%] mx-auto py-12 flex justify-center  gap-8">
      <SideNavigation />
      <section className="w-[75%] bg-white rounded-3xl border min-h-[80vh] p-6">
        <h1 className="text-5xl righteous-text">All Arc Modules</h1>
        <p className="text-lg text-gray-500">
          Your certificates will be displayed here.
        </p>
      </section>
    </main>
  ) : (
    <NotAuthenticated />
  );
};

export default ArcModulesPage;
