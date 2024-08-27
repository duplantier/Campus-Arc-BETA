"use client";
import React from "react";
import SideNavigation from "@/components/app/SideNavigation";

const SupportPage = () => {
  return (
    <main className="text-gray-950 max-w-[80%] mx-auto py-12 flex justify-center  gap-8">
      <SideNavigation />
      <section className="w-[75%] bg-white rounded-3xl border min-h-[80vh] p-6">
        <h1 className="text-5xl righteous-text">Support Center</h1>
        <p className="text-lg text-gray-500">You can get help from here</p>
      </section>
    </main>
  );
};

export default SupportPage;
