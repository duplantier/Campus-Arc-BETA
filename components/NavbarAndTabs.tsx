import React from "react";
import { Tabs } from "./ui/tabs";
import HomeTab from "./home/HomeTab";
import AboutTab from "./home/AboutTab";
import FeaturesTab from "./home/FeaturesTab";
import HowItWorksTab from "./home/HowItWorksTab";
import CoursesTab from "./home/CoursesTab";

const NavbarAndTabs = () => {
  const tabs = [
    {
      title: "Home",
      value: "home",
      content: <HomeTab />,
    },
    {
      title: "Features",
      value: "features",
      content: <FeaturesTab />,
    },
    {
      title: "About",
      value: "about",
      content: <AboutTab />,
    },

    {
      title: "How It Works",
      value: "howitworks",
      content: <HowItWorksTab />,
    },
    {
      title: "Courses",
      value: "coures",
      content: <CoursesTab />,
    },
  ];
  return (
    <div className=" md:h-[90vh] [perspective:1000px] ">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default NavbarAndTabs;
