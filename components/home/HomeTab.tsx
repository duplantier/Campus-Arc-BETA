"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Atom } from "lucide-react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import Image from "next/image";

const HomeTab = () => {
  const { ocAuth } = useOCAuth();

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: "opencampus" });
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <section className="w-full overflow-hidden flex gap-10 relative h-[80vh] mb-20 bg-dot-white/[0.4] rounded-2xl text-xl md:text-4xl border  bg-gray-950 z-100 ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gray-950 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>

      <div className="w-full p-3 text-gray-50 flex  h-full items-center justify-center gap-20 px-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl font-sans tracking-tight z-50">
            E-learning.{" "}
            <span className=" font-bold py-4 text-brand-yellow [text-shadow:0_0_rgba(0,0,0,0.1)]">
              Reinvented.
            </span>
          </h1>
          <div className="z-50 ">
            <p className=" text-3xl font-normal text-white z-50 max-w-[70%]">
              Stake, Learn, Earn. <br />
            </p>
            <p className="text-xl font-normal text-white-50 z-50 ">
              Campus Arc is the decentralized way of hands-on learning
              experience.
            </p>
          </div>
          <button
            className="z-50 text-xl flex items-center gap-2 text-white justify-center rounded-xl text-center border-2 px-4 py-3 bg-brand-black w-[300px] border-brand-blue hover:border-brand-yellow"
            onClick={handleLogin}
          >
            <Atom /> Get Started
          </button>
        </div>
        <Image
          src="/hero.svg"
          alt="Campus Arc Hero"
          width={400}
          height={400}
          className="z-50"
        />
      </div>
      {/*  <div className="w-[45%] flex justify-center items-center h-full  p-30">
        <div className="absolute w-[600px] top-auto h-[80vh] z-10 ">
          <World data={globeSampleArcs} globeConfig={globeConfig} />
        </div>
      </div> */}
    </section>
  );
};

export default HomeTab;
