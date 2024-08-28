import React from "react";
import { CardSpotlight } from "../ui/card-spotlight";
import Image from "next/image";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import Link from "next/link";

const AboutTab = () => {
  return (
    <section className="w-full  flex-col items-center px-20 overflow-auto flex gap-10 h-[80vh] mb-16 rounded-2xl text-xl md:text-4xl border  bg-gray-950 ">
      <h1 className="text-center w-full text-gray-50 mt-10 text-5xl righteous-text">
        About Us
      </h1>
      <p className="text-lg text-center w-full -mt-8 text-gray-500">
        Learn more about Campus Arc, its mission and its purpose.
      </p>

      <h3 className="text-3xl text-center font-semibold text-gray-50">
        Web2 & Educational Aspect
      </h3>
      <div className="w-full flex justify-center items-center gap-10 h-auto">
        <CardSpotlight className=" py-8 w-[55%] text-gray-50 bg-gradient-t-r from-gray-900 to-gray-800 h-full border border-gray-600 hover:border-brand-blue">
          <div className="flex  gap-10 items-center z-50 mb-6">
            <Image
              src="/buyutec.svg"
              alt="What is Campus Arc?"
              width={180}
              height={200}
              className="z-50 w-44"
            />
            <h1 className="text-3xl relative z-20 righteous-text">
              What is Campus Arc?
            </h1>
          </div>

          <p className="z-20 text-xl relative mt-4">
            Campus Arc is a next-gen web-based e-learning application where
            college students can match with their (campus) fellows, build
            meaningful projects in their field of expertise together, and
            increase their competency by gaining project-based experiences.
            <br />
            <br />
            Campus Arc aims to spread{" "}
            <strong className="text-brand-yellow">
              project-based competency
            </strong>{" "}
            in the scope of college campuses and{" "}
            <strong className="text-brand-yellow">
              make graduations more meaningful
            </strong>{" "}
            .
          </p>
        </CardSpotlight>
        <CardSpotlight className=" py-8 w-[45%] text-gray-50 bg-gradient-t-r from-gray-900 to-gray-800 h-full border border-gray-600 hover:border-brand-blue">
          <div className="flex gap-10 items-center z-50 mb-6">
            <Image
              src="/problem-girl.svg"
              alt="The problem with current college life"
              width={200}
              height={200}
              className="z-50 w-48"
            />
            <h1 className="font-righteous text-3xl relative z-20 righteous-text flex">
              The Problem With Today&#39;s College Life
            </h1>
          </div>

          <p className="z-20 text-xl relative mt-4">
            Throughout their college life, students have difficulties to
            involved in concrete projects on their expertise field. This
            situation turns into an{" "}
            <strong className="text-brand-yellow">
              incredible career and life anxiety
            </strong>{" "}
            for students when they graduate. They most likely face an
            <em className="text-brand-yellow">
              {" "}
              &ldquo;inexperienced wall&ldquo;
            </em>{" "}
            when they look for a job.
          </p>
          <div className="relative w-full"></div>
        </CardSpotlight>
      </div>
      <div className="w-full flex justify-center items-center gap-10 h-auto">
        <CardSpotlight className=" py-8 w-[50%] text-gray-50 bg-gradient-t-r from-gray-900 to-gray-800 h-full border border-gray-600 hover:border-brand-blue">
          <div className="flex gap-10  items-center z-50 mb-6">
            <Image
              src="/solution-computer.svg"
              alt="The solution Campus Arc provides"
              width={200}
              height={200}
              className="z-50 w-48 h-auto"
            />
            <h1 className="text-3xl relative z-20 righteous-text">
              The Solution Campus Arc Provides
            </h1>
          </div>

          <p className="z-20 text-xl relative mt-4">
            With the help of Campus Arc,{" "}
            <strong className="text-brand-yellow">
              college students will have a chance
            </strong>{" "}
            to find and meet other students from similar expertise fields with
            them and on the same campus or from the world, be involved in a
            project together, and{" "}
            <strong className="text-brand-yellow">
              gain project-based experience
            </strong>{" "}
            in their fields while doing so.
          </p>
        </CardSpotlight>
        <CardSpotlight className=" py-8 w-[50%] text-gray-50 bg-gradient-t-r from-gray-900 to-gray-800 h-full border border-gray-600 hover:border-brand-blue">
          <div className="flex gap-10  items-center z-50 mb-6">
            <Image
              src="/world.svg"
              alt="The solution Campus Arc provides"
              width={120}
              height={200}
              className="z-50 w-28 h-auto"
            />
            <h1 className="text-3xl relative z-20 righteous-text">
              The Sustainable Development Goal (SDGs) Campus Arc aligns with
            </h1>
          </div>

          <p className="z-20 text-xl relative mt-4">
            Campus Arc aims to contribute the Target 4.4 of the 4th Goal
            (Quality Education), which is &ldquo;By 2030,{" "}
            <strong className="text-brand-yellow">
              substantially increase the number of youth and adults who have
              relevant skills{" "}
            </strong>
            , including technical and vocational skills, for employment, decent
            jobs and entrepreneurship.&ldquo; Also, specifically, we want to
            reach Target 4.4.1:{" "}
            <strong className="text-brand-yellow">
              &ldquo;Proportion of youth and adults with information and
              communications technology (ICT) skills, by type of skill.&ldquo;
            </strong>
          </p>
        </CardSpotlight>
      </div>

      <div className="w-full flex justify-center items-center gap-10 h-auto mb-12">
        <CardSpotlight className=" py-8 w-[60%] text-gray-50 bg-gradient-t-r from-gray-900 to-gray-800 h-full border border-gray-600 hover:border-brand-blue">
          <div className="flex justify-center items-center z-50 mb-6">
            <Image
              src="/tohum.svg"
              alt="Tohum Foundation"
              width={400}
              height={200}
              className="z-50 w-96 h-auto"
            />
          </div>
          <h1 className="text-3xl relative z-20 righteous-text">
            How will Campus Arc address this goal?
          </h1>

          <p className="z-20 text-xl relative mt-4">
            We believe that{" "}
            <strong className="text-brand-yellow">
              there are insufficient opportunities for youth to reveal their
              potential{" "}
            </strong>{" "}
            through gaining project-based experience in their expertise field.
            By providing proper conditions and chances,{" "}
            <strong className="text-brand-yellow">
              we can significantly increase the number of competent young people
              and fresh graduates.
            </strong>
          </p>
        </CardSpotlight>
      </div>

      <h3 className="text-3xl text-center font-semibold text-gray-50">
        Web3 & Blockchain (EduFi) Aspect
      </h3>
      <div className="w-full flex justify-center items-center gap-10 h-auto mb-20">
        <Link
          href="https://github.com/duplantier/Campus-Arc-BETA-EDU-Chain-Hackathon-Semester1"
          target="_blank"
          className="w-full "
        >
          <CardSpotlight className="mx-auto flex flex-col justify-center items-center gap-4 py-8 w-[60%] text-gray-50 bg-gradient-t-r from-gray-900 to-gray-800 h-full border border-gray-600 hover:border-brand-blue">
            <div className="flex gap-10 justify-center  items-center z-50 mb-6">
              <Image
                src="/github-white.svg"
                alt="Earn and Learn"
                width={250}
                height={200}
                className="z-50 w-36 h-auto"
              />
              <h1 className="text-3xl relative z-20 righteous-text">
                Visit GitHub Repo
              </h1>
            </div>

            <p className="z-20 text-xl relative mt-4 text-center px-6">
              Please visit our GitHub repository to learn more about the EduFi
              side of the Campus Arc (Click to this card).
            </p>
          </CardSpotlight>
        </Link>
      </div>
    </section>
  );
};

export default AboutTab;
