"use client";
import React from "react";

import dynamic from "next/dynamic";
import { Tabs } from "./ui/tabs";

/* const ClientOnlyTabs = dynamic(() => import("@/components/ui/tabs") as any, {
  ssr: false,
}); */
const NavbarAndTabs = () => {
  return (
    <div className=" md:h-[90vh] [perspective:1000px] ">
      <Tabs />
    </div>
  );
};

export default NavbarAndTabs;
