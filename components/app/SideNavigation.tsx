"use client";
import React from "react";
import Link from "next/link";
import {
  BookCheck,
  ChartColumn,
  CircleHelp,
  CircleUser,
  Component,
  House,
  LibraryBig,
  LifeBuoy,
  Settings,
  Users,
  WandSparkles,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const SideNavigation = () => {
  return (
    <section className="w-[25%] min-h-[70vh] bg-white rounded-3xl flex flex-col justify-between p-6 border h-full">
      <div className="">
        <h1 className="text-2xl font-semibold">Navigation</h1>
        <hr className="my-2" />
        <div className="flex flex-col ">
          <Link
            className="flex items-center gap-2 py-2 px-1 hover:bg-gray-50 rounded-lg"
            href="/dashboard"
          >
            <LibraryBig size={24} />
            My Learning
          </Link>
          <Link
            className="flex items-center gap-2 py-2 px-1 hover:bg-gray-50 rounded-lg"
            href="/dashboard/arc-modules"
          >
            <Component size={24} />
            Arc Modules
          </Link>

          <Link
            className="flex items-center gap-2 py-2 px-1 hover:bg-gray-50 rounded-lg"
            href="/dashboard/profile"
          >
            <CircleUser size={24} />
            Profile
          </Link>
          <button className="hover:bg-[#fff6db] cursor-not-allowed flex items-center gap-2 rounded-lg py-2 px-1">
            <WandSparkles size={24} />
            My Certificates
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp size={18} className="text-brand-yellow" />
                </TooltipTrigger>
                <TooltipContent className="bg-white text-gray-950 border border-brand-yellow">
                  <p>This feature is not available in the beta version.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
          {/*  <Link
            className="flex items-center gap-2 py-2 px-1 hover:bg-gray-50 rounded-lg"
            href="/dashboard/my-certificates"
          >
            <BookCheck size={24} />
            My Certificates
          </Link> */}

          <hr className="my-4" />

          <button className="hover:bg-[#fff6db] cursor-not-allowed flex items-center gap-2 rounded-lg py-2 px-1">
            <WandSparkles size={24} />
            Arc Designer Panel
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp size={18} className="text-brand-yellow" />
                </TooltipTrigger>
                <TooltipContent className="bg-white text-gray-950 border border-brand-yellow">
                  <p>This feature is not available in the beta version.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
          <button className="hover:bg-[#fff6db] cursor-not-allowed flex items-center gap-2 rounded-lg py-2 px-1">
            <Users size={24} />
            Community
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp size={18} className="text-brand-yellow" />
                </TooltipTrigger>
                <TooltipContent className="bg-white text-gray-950 border border-brand-yellow">
                  <p>This feature is not available in the beta version.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
          <button className="hover:bg-[#fff6db] cursor-not-allowed flex items-center gap-2 rounded-lg py-2 px-1">
            <ChartColumn size={24} />
            Statistics
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp size={18} className="text-brand-yellow" />
                </TooltipTrigger>
                <TooltipContent className="bg-white text-gray-950 border border-brand-yellow">
                  <p>This feature is not available in the beta version.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t pt-2">
        <button className="hover:bg-[#fff6db] cursor-not-allowed flex items-center gap-2 rounded-lg py-2 px-1">
          <LifeBuoy size={22} /> Support
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp size={18} className="text-brand-yellow" />
              </TooltipTrigger>
              <TooltipContent className="bg-white text-gray-950 border border-brand-yellow">
                <p>This feature is not available in the beta version.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </button>
        <button className="hover:bg-[#fff6db] cursor-not-allowed flex items-center gap-2 rounded-lg py-2 px-1">
          <Settings size={24} /> Settings
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp size={18} className="text-brand-yellow" />
              </TooltipTrigger>
              <TooltipContent className="bg-white text-gray-950 border border-brand-yellow">
                <p>This feature is not available in the beta version.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </button>
      </div>
    </section>
  );
};

export default SideNavigation;
