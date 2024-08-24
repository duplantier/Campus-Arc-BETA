"use client";
import React from "react";

import dynamic from "next/dynamic";

const ClientOnlyTabs = dynamic(() => import("@/components/ui/tabs") as any, {
  ssr: false,
});
const NavbarAndTabs = () => {
  return (
    <div className=" md:h-[90vh] [perspective:1000px] ">
      <ClientOnlyTabs />
    </div>
  );
};

export default NavbarAndTabs;
