"use client";
import React, { useEffect, useState } from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import NotAuthenticated from "@/components/app/NotAuthenticated";
import SideNavigation from "@/components/app/SideNavigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlarmClock,
  CircleHelp,
  CircleUser,
  Clipboard,
  ClipboardCheck,
  Clock,
  FolderCode,
  GraduationCap,
  Loader,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const ProfilePage = () => {
  const [isCopied, setIsCopied] = React.useState(false);
  const { authState } = useOCAuth();
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [allArcModules, setAllArcModules] = React.useState<ArcModule[]>([]);
  const [registeredArcModulesInfo, setRegisteredArcModulesInfo] = useState<
    ArcModule[]
  >([]);
  const [studentsArcModules, setStudentsArcModules] = useState<
    UsersArcModules[]
  >([]);
  const [studentsRegistrationStakes, setStudentsRegistrationStakes] = useState<
    RegistrationStake[]
  >([]);
  const [collabStudents, setCollabStudents] = useState<Student[]>([]);
  let isLogOut = sessionStorage.getItem("isLogOut");
  let edu_username = sessionStorage.getItem("edu_username");
  let eth_address = sessionStorage.getItem("eth_address");
  let studentId = sessionStorage.getItem("studentId");

  const copyStakeHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setIsCopied(true);
  };

  useEffect(() => {
    const fetchStudentsModules = async () => {
      const fetchAllResponse = await fetch(
        "/api/student/fetch-registered-arc-modules",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
            studentId: Number(studentId),
          }),
        }
      );
      const data = await fetchAllResponse.json();
      setRegisteredArcModulesInfo(data.registeredArcModulesInfo);
      setStudentsArcModules(data.studentsArcModules); // completedLessons olayı burada.
      setIsDataLoading(false);
    };

    const fetchStudentsStakeRecords = async () => {
      const fetchAllResponse = await fetch("/api/stakes/fetch-by-student-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
          studentId: Number(studentId),
        }),
      });
      const data = await fetchAllResponse.json();
      setStudentsRegistrationStakes(data.studentsRegistrationStakes);
      setIsDataLoading(false);
    };

    const fetchAllArcModules = async () => {
      const fetchAllResponse = await fetch("/api/arc-modules/fetch-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
        }),
      });
      const data = await fetchAllResponse.json();
      setAllArcModules(data.allArcModules);
      setIsDataLoading(false);
    };

    const fetchCollabStudents = async () => {
      const fetchAllResponse = await fetch(
        "/api/student/fetch-collabs-by-id-array",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
            studentIds: studentsRegistrationStakes.map(
              (stake) => stake.collabStudentsId
            ),
          }),
        }
      );
      const data = await fetchAllResponse.json();
      setCollabStudents(data.collabStudents);
      setIsDataLoading(false);
    };

    fetchStudentsModules();
    fetchStudentsStakeRecords();
    fetchAllArcModules();
  }, []);

  return authState.isAuthenticated && isLogOut && isLogOut != "true" ? (
    <main className="text-gray-950 max-w-[90%] mx-auto py-12 flex justify-center   gap-8">
      <SideNavigation />
      <section className="w-[75%] bg-white rounded-3xl border max-h-[80vh] overflow-y-scroll p-6">
        <h1 className="text-5xl  font-semibold flex justify-center items-center gap-2 mb-12">
          {" "}
          <CircleUser size={40} /> Profile
        </h1>
        <div className="flex gap-10 mt-6">
          <div className="w-[50%]">
            <h2 className="text-3xl righteous-text">Personal Information</h2>
            <p className="text-lg text-gray-500">
              Update your personal information.
            </p>

            <div className="mt-4">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={""}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-gray-500 cursor-copy"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="ethAddress" className="text-sm">
                Ethereum Address
              </label>
              <input
                type="text"
                id="ethAddress"
                name="ethAddress"
                value={eth_address || ""}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-gray-500 cursor-copy"
              />
            </div>
            <button className="w-[40%] flex items-center justify-center gap-2 cursor-not-allowed mt-4 rounded-lg text-gray-700 border py-2 bg-blue-200 border-blue-400 hover:bg-blue-300">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp size={20} className="text-brand-blue" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-gray-950 border border-brand-blue">
                    <p>This feature is not available in the beta version.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{" "}
              Update
            </button>
          </div>
          <div className="w-[50%]">
            <h2 className="text-3xl righteous-text">Open Campus Information</h2>
            <p className="text-lg text-gray-500">
              Update your Open Campus information.
            </p>
            <div className="mt-4">
              <label htmlFor="eduUsername" className="text-sm">
                EDU Username
              </label>
              <input
                type="text"
                id="eduUsername"
                name="eduUsername"
                value={edu_username || ""}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg px-3 text-gray-500 cursor-copy"
              />
            </div>
            {/*  <div className="mt-4">
              <label htmlFor="OCaccessToken" className="text-sm">
                Access Token
              </label>
              <input
                type="text"
                id="OCaccessToken"
                name="OCaccessToken"
                value={oc}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg text-gray-500 cursor-copy"
              />
            </div> */}
            <button className="w-[40%] flex items-center justify-center gap-2 mt-4 cursor-not-allowed rounded-lg text-gray-700 border py-2 bg-blue-200 border-blue-400 hover:bg-blue-300">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp size={20} className="text-brand-blue" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-gray-950 border border-brand-blue">
                    <p>This feature is not available in the beta version.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{" "}
              Update
            </button>
          </div>
        </div>
        <div className="w-full mt-12">
          <h2 className="text-3xl righteous-text">Registered Arc Modules</h2>
          <p className="text-lg text-gray-500">
            Manage your registered Arc Modules.
          </p>

          <div className="mt-8">
            {isDataLoading && (
              <div className="flex items-center justify-center gap-2 w-full">
                <Loader size={34} className="animate-spin text-brand-blue" />
              </div>
            )}
            {registeredArcModulesInfo.map((module, index) => (
              <Card className="w-[32%] rounded-3xl min-h-[450px]" key={index}>
                <CardHeader>
                  <CardTitle className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-normal">{module.category}</p>
                      <p
                        className={cn(
                          "text-md font-normal px-2 py-1 border rounded-full",
                          module.level === "Beginner"
                            ? "border-green-500 bg-green-50 text-green-800"
                            : module.level === "Intermediate"
                            ? " border-blue-500 bg-blue-100 text-blue-500"
                            : "border-orange-500 bg-orange-100 text-orange-500"
                        )}
                      >
                        {module.level}
                      </p>
                    </div>
                    <h1>{module.title}</h1>
                    <Image
                      alt="module image"
                      width={300}
                      height={200}
                      src={`/arc-modules/${module.imageSrc}`}
                      className="rounded-lg border"
                    />
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <GraduationCap /> {module.lessonNumber} Lessons
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock /> {module.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <FolderCode /> {module.projects}
                  </div>
                  <div className="flex items-center gap-2">
                    <AlarmClock /> {module.deadline}
                  </div>
                </CardContent>
                <CardFooter>
                  <button className="w-full rounded-lg text-gray-700 border py-2 bg-white border-gray-400 hover:bg-gray-50">
                    Go to course
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className="w-full mt-12">
          <h2 className="text-3xl righteous-text">Registration Stakes</h2>
          <p className="text-lg text-gray-500">
            Review and manage your registration stakes.
          </p>

          <div className="mt-8">
            {isDataLoading && (
              <div className="flex items-center justify-center gap-2 w-full">
                <Loader size={34} className="animate-spin text-brand-blue" />
              </div>
            )}
            {studentsRegistrationStakes.map((item, index) => (
              <div key={index}>
                {allArcModules.map((module, index) => (
                  <div key={index}>
                    {item.registeredArcModuleId === module.id && (
                      <Card className="w-[32%] rounded-3xl min-h-[400px]">
                        <CardHeader>
                          <CardTitle className="flex flex-col gap-4">
                            <h1 className="text-xl">{module.title}</h1>
                            <Image
                              alt="module image"
                              width={300}
                              height={200}
                              src={`/arc-modules/${module.imageSrc}`}
                              className="rounded-lg border"
                            />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-6 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Stake Hash:</span>{" "}
                            {item.hash.split("").slice(0, 10).join("")}...
                            <button
                              className="border border-gray-300 rounded-lg p-2"
                              onClick={() => {
                                copyStakeHash(item.hash);
                              }}
                            >
                              {isCopied ? (
                                <ClipboardCheck
                                  size={18}
                                  className="text-green-500"
                                />
                              ) : (
                                <Clipboard size={18} />
                              )}
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Stake Amount:</span>{" "}
                            <div className="flex items-center gap-1">
                              <Image
                                alt="module image"
                                width={20}
                                height={200}
                                src={`/oc-logo.svg`}
                                className="w-6 h-auto rounded-lg border"
                              />
                              {item.amount} EDU
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Status:</span>{" "}
                            <div>
                              <span
                                className={cn(
                                  "px-2 py-1 rounded-full",
                                  item.status === "Staked"
                                    ? "bg-green-50 text-green-800 border-green-500 border"
                                    : "bg-red-50 text-red-800 border-red-500 border"
                                )}
                              >
                                {item.status}
                              </span>
                            </div>
                          </div>
                          {/* <div className="flex   items-center gap-2">
                            <span className="text-gray-500">Collab:</span>{" "}
                            <div className="flex flex-row items-center justify-center w-full">
                              <AnimatedTooltip items={collabStudents} />
                            </div>
                          </div> */}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  ) : (
    <NotAuthenticated />
  );
};

export default ProfilePage;
