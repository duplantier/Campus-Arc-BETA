import React from "react";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { globeConfig, globeSampleArcs } from "@/constants";
import Link from "next/link";
import { Atom } from "lucide-react";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

const HomeTab = () => {
  return (
    <BackgroundBeamsWithCollision className="w-full overflow-hidden flex gap-10 relative h-[100vh] mb-10 rounded-2xl text-xl md:text-4xl border  bg-gradient-t-b from-gray-950 to-gray-900  ">
      <div className="w-full p-3 text-gray-50 flex flex-col gap-6 h-full items-center justify-center">
        <h1 className="text-6xl font-sans tracking-tight">
          E-learning.{" "}
          <span className=" font-bold py-4 text-brand-yellow [text-shadow:0_0_rgba(0,0,0,0.1)]">
            Reinvented.
          </span>
        </h1>
        <p className="text-center text-3xl font-normal text-gray-300">
          Introducing the next-generation e-learning experience, designed to{" "}
          <strong className="text-brand-yellow">
            revolutionize how students connect and collaborate
          </strong>
          , leveraging Open Campus.
        </p>
        <Link
          className=" text-xl flex items-center gap-2 text-white justify-center rounded-xl text-center border-2 px-4 py-3 bg-brand-black w-[220px] border-brand-blue hover:border-brand-yellow"
          href="/"
        >
          <Atom /> Get Started
        </Link>
      </div>
      {/*  <div className="w-[45%] flex justify-center items-center h-full  p-30">
        <div className="absolute w-[600px] top-auto h-[80vh] z-10 ">
          <World data={globeSampleArcs} globeConfig={globeConfig} />
        </div>
      </div> */}
    </BackgroundBeamsWithCollision>
  );
};

export default HomeTab;
