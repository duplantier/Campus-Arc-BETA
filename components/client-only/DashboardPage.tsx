"use client";
import React, { useEffect, useState } from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import NotAuthenticated from "@/components/app/NotAuthenticated";
import SideNavigation from "@/components/app/SideNavigation";
import {
  AlarmClock,
  Clock,
  FolderCode,
  GraduationCap,
  LibraryBig,
  Loader,
} from "lucide-react";
import { exampleStudentData } from "@/constants";
import Image from "next/image";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Progress } from "../ui/progress";
import Link from "next/link";

const Dashboard = () => {
  const { authState } = useOCAuth();
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [registeredArcModulesInfo, setRegisteredArcModulesInfo] = useState<
    ArcModule[]
  >([]);

  const [studentsArcModules, setStudentsArcModules] = useState<
    UsersArcModules[]
  >([]);
  let isLogOut = sessionStorage.getItem("isLogOut");
  let studentId = sessionStorage.getItem("studentId");

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
    fetchStudentsModules();
  }, []);

  return authState.isAuthenticated && isLogOut && isLogOut != "true" ? (
    <main className="text-gray-950 max-w-[90%] mx-auto py-12 flex justify-center raleway-text gap-8">
      <SideNavigation />
      <section className="w-[75%] bg-white rounded-3xl border min-h-[80vh] p-6">
        <h1 className="text-5xl  font-semibold flex justify-center items-center gap-2 ">
          <LibraryBig size={40} />
          My Learning
        </h1>
        <p className="text-gray-500 mb-12 text-center mt-2">
          Here you are all the Arc Modules you are currently registered for.
        </p>
        {isDataLoading && (
          <div className="flex items-center justify-center gap-2 w-full">
            <Loader size={34} className="animate-spin text-brand-blue" />
          </div>
        )}
        {registeredArcModulesInfo.map((module, index) => (
          <div
            key={index}
            className="w-full flex items-center gap-4 bg-gray-50 rounded-2xl border py-2 px-4 min-h-[280px]"
          >
            <div className="flex flex-col justify-center items-center gap-4 w-[40%]">
              <Image
                alt="module image"
                width={300}
                height={200}
                src={`/arc-modules/${module.imageSrc}`}
                className="rounded-lg border"
              />
              <p className="text-xl font-bold">{module.title}</p>
            </div>
            <div className="flex flex-col items-start justify-center gap-6 w-[60%] min-h-[300px]">
              <p>{module.description}</p>
              <div className="flex justify-between items-center gap-4">
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
              </div>
              {studentsArcModules.map((item, index) => (
                <>
                  <div key={index} className="w-full">
                    Progress (
                    {(
                      (Number(item.completedLessonsIds.length) /
                        module.lessonNumber) *
                      100
                    ).toFixed(0)}
                    %) ({Number(item.completedLessonsIds.length)} Lessons
                    Completed)
                    <Progress
                      value={
                        (Number(item.completedLessonsIds.length) /
                          module.lessonNumber) *
                        100
                      }
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between items-center gap-6 w-full">
                    {/*  {exampleStudentData.registrationStakes.map(
                      (item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-gray-500">Collab:</span>{" "}
                          <div className="flex flex-row items-center justify-center w-full">
                            <AnimatedTooltip items={item.collabs} />
                          </div>
                        </div>
                      )
                    )} */}
                    <Link
                      href={"/module"}
                      onClick={() => {
                        sessionStorage.setItem(
                          "selectedArcModuleId",
                          item.arcModuleId.toString()
                        );
                      }}
                      className="rounded-xl border py-2 px-10 border-brand-blue hover:bg-brand-blue hover:text-white"
                    >
                      Continue
                    </Link>
                  </div>
                </>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  ) : (
    <NotAuthenticated />
  );
};

export default Dashboard;
