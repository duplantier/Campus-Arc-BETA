"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

import HomeTab from "../home/HomeTab";
import FeaturesTab from "../home/FeaturesTab";
import AboutTab from "../home/AboutTab";
import HowItWorksTab from "../home/HowItWorksTab";
import ArcModulesTab from "../home/ArcModulesTab";
import AccountButton from "../AccountButton";
import { useRouter } from "next/navigation";

export const Tabs = ({
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const staticTabs = [
    {
      title: "Home",
      value: "home",
      content: <HomeTab />,
    },
    {
      title: "About",
      value: "about",
      content: <AboutTab />,
    },
    {
      title: "Features",
      value: "features",
      content: <FeaturesTab />,
    },
  /*   {
      title: "How It Works",
      value: "howitworks",
      content: <HowItWorksTab />,
    },
    {
      title: "Arc Modules",
      value: "arcModules",
      content: <ArcModulesTab />,
    }, */
  ];
  const [active, setActive] = useState<Tab>(staticTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(staticTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...staticTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };
  const router = useRouter();

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-row py-5 items-center justify-between [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-[90%] mx-auto ",
          containerClassName
        )}
      >
        <Image
          src="/logo.svg"
          alt="Campus Arc BETA Logo"
          width={200}
          height={100}
          className="w-48 h-auto cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="flex items-center">
          {staticTabs.map((tab, idx) => (
            <button
              key={tab.title}
              onClick={() => {
                moveSelectedTabToTop(idx);
              }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn("relative px-4 py-2 rounded-full", tabClassName)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {active.value === tab.value && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 bg-brand-yellow font-bold dark:bg-zinc-800 rounded-full ",
                    activeTabClassName
                  )}
                />
              )}

              <span className="relative block font-medium text-black dark:text-white">
                {tab.title}
              </span>
            </button>
          ))}
          <AccountButton />
        </div>
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-8", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-[90%] mx-auto h-full ">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
