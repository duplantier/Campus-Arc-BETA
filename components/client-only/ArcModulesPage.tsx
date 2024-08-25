"use client";
import React, { useEffect } from "react";
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
import Image from "next/image";
import { Clock, Component, FolderCode, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { exampleArcModules } from "@/constants";

const ArcModulesPage = () => {
  const [allArcModules, setAllArcModules] = React.useState([]);
  const { authState } = useOCAuth();
  let isLogOut = sessionStorage.getItem("isLogOut");
  const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY;

  useEffect(() => {
    const fetchArcModules = async () => {
      const fetchAllResponse = await fetch("/api/arc-module", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reqType: "fetchAll",
          adminKey: adminKey,
        }),
      });
      const data = await fetchAllResponse.json();
      setAllArcModules(data.allArcModules);
      console.log("data", data);
    };
    fetchArcModules();
  }, []);

  return authState.isAuthenticated && isLogOut && isLogOut != "true" ? (
    <main className="text-gray-950 max-w-[90%] mx-auto py-12 flex justify-center  gap-8">
      <SideNavigation />
      <section className="w-[75%] bg-white rounded-3xl border border-gray-300 min-h-[80vh] p-6">
        <h1 className="text-5xl  font-semibold flex justify-center items-center gap-2 ">
          <Component size={40} />
          All Arc Modules
        </h1>
        <p className="text-gray-500 mb-8 text-center mt-2">
          All the Arc Modules available for you to learn.
        </p>
        <div className="flex  items-center gap-2 mt-6 flex-wrap">
          {exampleArcModules.map((module, index) => (
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
                  <h1 className="text-xl">{module.title}</h1>
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
                  <GraduationCap /> {module.lessons}
                </div>
                <div className="flex items-center gap-2">
                  <Clock /> {module.time}
                </div>
                <div className="flex items-center gap-2">
                  <FolderCode /> {module.projects}
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
      </section>
    </main>
  ) : (
    <NotAuthenticated />
  );
};

export default ArcModulesPage;
