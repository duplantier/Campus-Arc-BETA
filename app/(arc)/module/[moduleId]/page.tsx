"use client";
import { ArcModule1 } from "@/constants";
import { cn } from "@/lib/utils";
import {
  Book,
  Check,
  CircleCheck,
  Clock,
  FolderCode,
  GraduationCap,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
interface ArcDesigner {
  name: string;
  designation: string;
  image: string;
  twitter: string;
  linkedin: string;
  description: string;
}

interface ArcModule {
  title: string;
  description: string;
  category: string;
  imageSrc: string;
  lessons: number;
  time: string;
  projects: string;
  level: string;
  whatYouWillLearn: string[];
  arcDesigner: ArcDesigner;
  studentsRegistered: string[]; // Assuming students are represented by strings
  arcDesignerId: string;
}
const ArcModulePage = ({
  params,
}: {
  params: {
    moduleId: string;
  };
}) => {
  const [ArcModule, setArcModule] = React.useState<ArcModule | null>(null);

  useEffect(() => {
    if (params.moduleId === "1") {
      setArcModule(ArcModule1);
    }
  }, []);
  return (
    <main className="text-gray-950 max-w-[95%] mx-auto py-12 flex justify-center  gap-12 raleway-text">
      <section
        id="content"
        className="w-[75%] flex flex-col gap-8 min-h-[80vh]  "
      >
        <div
          id="header"
          className="w-full border rounded-2xl flex flex-col p-8 gap-8 shadow-md bg-white"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-5xl righteous-text">{ArcModule?.title}</h1>
            <p
              className={cn(
                "text-md font-normal px-2 py-1 border rounded-full",
                ArcModule?.level === "Beginner"
                  ? "border-green-500 bg-green-50 text-green-800"
                  : ArcModule?.level === "Intermediate"
                  ? " border-blue-500 bg-blue-100 text-blue-500"
                  : "border-orange-500 bg-orange-100 text-orange-500"
              )}
            >
              {ArcModule?.level}
            </p>
          </div>
          <div className="flex justify-between items-center gap-8">
            <Image
              alt="module image"
              width={500}
              height={200}
              src={`/arc-modules/${ArcModule?.imageSrc}`}
              className="rounded-lg border w-1/2"
            />
            <div className=" w-1/2 min-h-[300px]">
              <p className="text-gray-700 mb-8 text-lg">
                {ArcModule?.description}
              </p>
              <hr className="border" />
              <div className="flex items-center gap-6 mt-8 text-lg">
                <div className="flex items-center gap-2">
                  <GraduationCap /> {ArcModule?.lessons} Lessons
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={22} /> {ArcModule?.time}
                </div>
                <div className="flex items-center gap-2">
                  <FolderCode /> {ArcModule?.projects}
                </div>
              </div>
              <div className="flex items-center mt-8">
                <button className="px-6 py-3 font-semibold rounded-lg bg-brand-blue text-white">
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          id="moduleOverview"
          className="w-full border rounded-2xl  p-8 shadow-md bg-white"
        >
          <h4 className="text-brand-blue font-semibold">Module Overview</h4>
          <h1 className="text-2xl font-bold mt-2">About The Course</h1>
          <hr className="my-6 border" />
          <h5 className="font-semibold mb-3">What you'll learn</h5>
          <ul className="list-none">
            {ArcModule?.whatYouWillLearn.map((item, index) => (
              <li className="flex items-center gap-2 mb-3" key={index}>
                <CircleCheck className="text-brand-blue" size={20} />
                {item}
              </li>
            ))}
          </ul>
          <hr className="my-6 border" />
          <h5 className="font-semibold mb-3">Module Description</h5>
          <Module1Description />
          <hr className="my-6 border" />
          <h5 className="font-semibold mb-3">Arc Designer</h5>
          <div className="flex flex-col w-[400px] gap-4">
            <div className="flex items-center gap-4">
              <Image
                alt="module image"
                width={100}
                height={100}
                src={`${ArcModule?.arcDesigner.image}`}
                className="rounded-lg border"
              />
              <div className="flex flex-col ">
                <p className="text-lg font-semibold">
                  {ArcModule?.arcDesigner.name}
                </p>
                <p className="text-gray-500">
                  {ArcModule?.arcDesigner.designation}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <Link
                    className="p-2 border rounded-lg hover:bg-gray-50"
                    href={ArcModule?.arcDesigner.twitter || "#"}
                  >
                    <Twitter />
                  </Link>
                  <Link
                    className="p-2 border rounded-lg"
                    href={ArcModule?.arcDesigner.linkedin || "#"}
                  >
                    <Linkedin />
                  </Link>
                </div>
              </div>
            </div>
            <p>{ArcModule?.arcDesigner.description}</p>
          </div>
        </div>
      </section>
      <section
        id="contentNavigation"
        className="w-[25%] bg-white rounded-2xl border min-h-[80vh] p-6"
      >
        <div className="flex items-center gap-2">
          <Book />
          <div className="flex flex-col">
            <span className="text-sm">{ArcModule?.category}</span>
            <h2 className="font-semibold text-xl">{ArcModule?.title}</h2>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArcModulePage;

const Module1Description = () => {
  return (
    <div>
      Master HTML5 Basics and Build Your Web Development Foundation!
      <br />
      <br />
      Campus Arc's HTML5 Basics course is your gateway to the world of web
      development. Whether you're a complete beginner or someone with a bit of
      coding experience, this course is designed to equip you with the essential
      skills needed to create modern, responsive websites using HTML5.
      <br />
      <br />
      30 days, 1 hour per day, learn to build with projects, get hands-on
      experience, and become a proficient web developer.
      <br />
      <br />
      Our HTML5 Basics course is the most comprehensive, easy-to-follow
      introduction to HTML5 ever created. With a focus on practical learning,
      you'll quickly move from understanding basic HTML concepts to building
      fully functional web pages. Over 150,000 students have kickstarted their
      web development careers with this course.
      <br />
      <br />
      Whether you have never coded before, know a little about HTML, or want to
      solidify your web development skills, this course is perfect for you!
      <br />
      <br />
      This extensive online course contains over 30 lectures, 3 hours of video
      content, and interactive projects designed to teach you the fundamentals
      of HTML5. It’s the perfect stepping stone to more advanced web development
      topics such as CSS, JavaScript, and beyond.
      <br />
      <br />
      This course will take you from complete beginner to confident web
      developer, even with zero prior experience. Here's why:
      <br />
      <br />
      <ul>
        <li>
          Taught by experienced web developers who understand what beginners
          need to succeed.
        </li>
        <li>
          Regularly updated to include the latest HTML5 standards, practices,
          and development tools.
        </li>
        <li>
          Learn practical skills that are directly applicable to real-world
          projects and web development jobs.
        </li>
        <li>
          The curriculum is crafted with input from both industry experts and
          students to ensure clarity and effectiveness.
        </li>
        <li>
          Over 150,000 students have launched their web development journey with
          this course, many of whom have gone on to create their own websites or
          start web development careers.
        </li>
        <li>
          The course is completely free, giving you full access to a top-notch
          HTML5 education without any cost.
        </li>
        <li>
          We'll guide you step-by-step through the process of understanding
          HTML5, from basic tags to building complex web page structures.
          Engaging video tutorials and interactive coding exercises will make
          sure you grasp the material fully.
        </li>
      </ul>
      The HTML5 Basics course is project-based, designed to help you create a
      portfolio of web pages as you learn. It includes quizzes, assignments, and
      hands-on projects to ensure you can apply what you learn effectively.
      <br />
      <br />
      You'll cover topics such as:
      <ul>
        <li>Introduction to HTML5 and its importance in web development</li>
        <li>Creating and structuring web pages with semantic HTML5 elements</li>
        <li>Embedding multimedia, such as images, audio, and video</li>
        <li>Building responsive forms for user input</li>
        <li>
          Best practices for writing clean, accessible, and SEO-friendly HTML5
          code
        </li>
      </ul>
      By the end of this course, you’ll be ready to create beautiful, functional
      websites and take your first steps towards becoming a professional web
      developer!
      <br />
      <br />
      You will get lifetime access to over 30 lectures, all corresponding
      resources, and a supportive learning community!
      <br />
      <br />
      So, what are you waiting for? Start learning HTML5 today and build the
      foundation of your web development career!
    </div>
  );
};
