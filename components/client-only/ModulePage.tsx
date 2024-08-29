"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { cn } from "@/lib/utils";
import {
  AlarmClock,
  Book,
  BookKey,
  Check,
  CircleCheck,
  CircleHelp,
  Clock,
  FolderCode,
  GraduationCap,
  HandCoins,
  Linkedin,
  Loader,
  TicketCheck,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "../ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useWriteContract } from "wagmi";
import { stakeAbi, tokenAbi } from "@/constants";
import { config } from "@/config";
const ArcModuleInfoPage = () => {
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [arcModuleInfo, setArcModuleInfo] = useState<ArcModule>();
  const [arcDesignersInfo, setArcDesignersInfo] = useState<ArcDesigner[]>([]);
  const [studentsArcModules, setStudentsArcModules] = useState<
    UsersArcModules[]
  >([]);
  const [stakeAmount, setStakeAmount] = useState<number>(1);
  const [stakeStatus, setStakeStatus] = useState<string>("pending");
  const { open: openWalletConnectionModal, close } = useWeb3Modal();
  const { address: userAccountAddress, isConnected } = useAccount();
  const {
    data: approveData,
    writeContractAsync: approveWriteContractAsync,
    isPending: isApprovingLoading,
    isSuccess: isApprovingSuccess,
  } = useWriteContract();

  const {
    data: stakeData,
    writeContractAsync: stakeWriteContractAsync,
    isPending: isStakingLoading,
    isSuccess: isStakingSuccess,
    error: stakeError,
    isError: isStakingError,
    failureReason: stakeFailureReason,
  } = useWriteContract();

  const {
    data: allowanceData,
    writeContractAsync: allowanceWriteContractAsync,
    isPending: isAllowanceLoading,
    isSuccess: isAllowanceSuccess,
  } = useWriteContract();

  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const selectedArcModuleId = sessionStorage.getItem("selectedArcModuleId");
  const studentId = sessionStorage.getItem("studentId");
  const [currentModule, setCurrentModule] = useState<UsersArcModules>();

  console.log("isStakingLoading", isStakingLoading);
  console.log("isStakingSuccess", isStakingSuccess);
  console.log("stakeError", stakeError);
  console.log("stakeFailureReason", stakeFailureReason);

  const stakeThis = ethers.parseUnits("0.01", 18);

  const contractAddress = process.env
    .NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as `0x${string}`;
  const eduTokenAddress = process.env
    .NEXT_PUBLIC_EDU_TOKEN_ADDRESS as `0x${string}`;

  const handleApprove = async () => {
    if (!isConnected) {
      openWalletConnectionModal();
      return;
    }
    try {
      await allowanceWriteContractAsync({
        abi: tokenAbi,
        address: eduTokenAddress,
        functionName: "allowance",
        args: [userAccountAddress, contractAddress],
      });

      await approveWriteContractAsync({
        abi: tokenAbi,
        address: eduTokenAddress,
        functionName: "approve",
        args: [contractAddress, stakeThis],
      });
    } catch (error) {
      console.error("Approval failed:", error);
      console.log("stakeError", stakeError);
    }
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
      setStudentsArcModules(data.studentsArcModules); // completedLessons olayı burada.
      setIsDataLoading(false);
    };

    const fetchModuleInfo = async () => {
      const res = await fetch(`/api/arc-modules/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
          arcModuleId: Number(selectedArcModuleId),
        }),
      });
      const data = await res.json();
      setArcModuleInfo(data.foundArcModuleInfo);
      setIsDataLoading(false);
    };

    const fetchArcDesignersInfo = async () => {
      const res = await fetch(`/api/arc-designers/find-by-module-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
          arcModuleId: Number(selectedArcModuleId),
        }),
      });
      const data = await res.json();
      setArcDesignersInfo(data.arcDesignersOfTheArcModule);
      setIsDataLoading(false);
    };

    const handleStake = async () => {
      if (!isApprovingSuccess) {
        console.error("Approval is required before staking.");
        return;
      }
      console.log("handleStake'e geldim");
      try {
        await stakeWriteContractAsync({
          abi: stakeAbi,
          address: contractAddress,
          functionName: "stake",
          args: [stakeThis],
        });
      } catch (error) {
        console.error("Staking failed:", error);
      }
    };

    if (isApprovingSuccess && !isStakingSuccess) {
      handleStake();
    }

    const register = async () => {
      const res = await fetch(`/api/student/register-arc-module`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
          studentId: Number(studentId),
          arcModuleId: Number(selectedArcModuleId),
          stakeHash: stakeData,
          stakeAmount: stakeAmount,
          stakeStatus: "Staked",
        }),
      });
      const data = await res.json();
      if (data.isRegistered) {
        alert("You have successfully registered for the course.");
        window.location.reload();
      }
    };

    if (isApprovingSuccess && isStakingSuccess) {
      register();
    }

    if (currentModule === undefined) {
      if (studentsArcModules.length > 0) {
        const mdll = studentsArcModules.find(
          (item) => item.arcModuleId == Number(selectedArcModuleId)
        );
        setCurrentModule(mdll as UsersArcModules);
        if (currentModule !== undefined) {
          setIsAlreadyRegistered(true);
        }
      } else {
        setIsAlreadyRegistered(false);
      }
    }
    fetchModuleInfo();
    fetchArcDesignersInfo();
    fetchStudentsModules();
  }, [
    selectedArcModuleId,
    studentId,
    isApprovingSuccess,
    isStakingSuccess,
    currentModule,
  ]);

  return (
    <main className="text-gray-950 max-w-[95%] mx-auto py-12 flex justify-center  gap-12 raleway-text">
      <section
        id="content"
        className="w-[75%] flex flex-col gap-8 min-h-[80vh]  "
      >
        <div
          id="header"
          className="w-full border rounded-2xl flex flex-col p-8 gap-8 shadow-md bg-white min-h-[350px]"
        >
          {isDataLoading ? (
            <div className="flex items-center justify-center gap-2 w-full">
              <Loader size={34} className="animate-spin text-brand-blue" />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h1 className="text-5xl righteous-text">
                  {arcModuleInfo?.title}
                </h1>
                <p
                  className={cn(
                    "text-md font-normal px-2 py-1 border rounded-full",
                    arcModuleInfo?.level === "Beginner"
                      ? "border-green-500 bg-green-50 text-green-800"
                      : arcModuleInfo?.level === "Intermediate"
                      ? " border-blue-500 bg-blue-100 text-blue-500"
                      : "border-orange-500 bg-orange-100 text-orange-500"
                  )}
                >
                  {arcModuleInfo?.level}
                </p>
              </div>
              <div className="flex justify-between items-center gap-8">
                <Image
                  alt="module image"
                  width={500}
                  height={200}
                  src={`/arc-modules/${arcModuleInfo?.imageSrc}`}
                  className="rounded-lg border w-1/2"
                />
                <div className=" w-1/2 min-h-[300px]">
                  <p className="text-gray-700 mb-4 text-lg">
                    {arcModuleInfo?.description}
                  </p>
                  <hr className="border" />
                  <div className="flex items-center gap-6 mt-4 text-lg flex-wrap">
                    <div className="flex items-center gap-2">
                      <GraduationCap /> {arcModuleInfo?.lessonNumber} Lessons
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={22} /> {arcModuleInfo?.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <FolderCode /> {arcModuleInfo?.projects}
                    </div>
                    <div className="flex items-center gap-2">
                      <AlarmClock /> {arcModuleInfo?.deadline}
                    </div>
                  </div>
                  {currentModule === undefined || !isAlreadyRegistered ? (
                    <>
                      <Dialog>
                        <DialogTrigger className="px-6 py-3 font-semibold w-[250px] rounded-lg bg-brand-blue text-white mt-6">
                          Register Now
                        </DialogTrigger>
                        <DialogContent className="bg-gray-100 max-h-[650px] overflow-y-scroll w-[600px]">
                          <DialogHeader className="w-full">
                            <DialogTitle className="text-3xl w-full">
                              Registering Arc Module:
                              <h2 className="text-2xl">
                                {arcModuleInfo?.title}
                              </h2>
                            </DialogTitle>
                            <div className="flex items-center gap-6 py-4 text-lg flex-wrap">
                              <div className="flex items-center gap-2">
                                <GraduationCap /> {arcModuleInfo?.lessonNumber}{" "}
                                Lessons
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock size={22} /> {arcModuleInfo?.time}
                              </div>
                              <div className="flex items-center gap-2">
                                <FolderCode /> {arcModuleInfo?.projects}
                              </div>
                              <div className="flex items-center gap-2">
                                <AlarmClock /> {arcModuleInfo?.deadline}
                              </div>

                              <p
                                className={cn(
                                  "text-md font-normal px-2 py-1 border rounded-full",
                                  arcModuleInfo?.level === "Beginner"
                                    ? "border-green-500 bg-green-50 text-green-800"
                                    : arcModuleInfo?.level === "Intermediate"
                                    ? " border-blue-500 bg-blue-100 text-blue-500"
                                    : "border-orange-500 bg-orange-100 text-orange-500"
                                )}
                              >
                                Level: {arcModuleInfo?.level}
                              </p>
                            </div>

                            <div className="pt-4">
                              <h3 className="font-bold  text-xl text-brand-blue">
                                How It Works?
                              </h3>
                              <p className="text-base mb-4">
                                In order to register for the course,{" "}
                                <strong>
                                  you have to stake a certain amount of
                                  EDUTokens
                                </strong>{" "}
                                . This amount will be used to verify your{" "}
                                <strong>commitment</strong> to the module and to
                                calculate.
                              </p>
                              <h3 className="font-bold text-xl text-brand-blue mt-8">
                                After Registration
                              </h3>
                              <p className="text-base mb-8">
                                Once you have successfully staked the required
                                amount, you will start to:
                                <ul className="flex flex-col gap-4 mt-4 px-8">
                                  <li>
                                    📚 <strong>Learn:</strong> You will get
                                    access to the Module content and start
                                    learning.
                                  </li>
                                  <li>
                                    💰 <strong>Earn:</strong> You will regularly
                                    earn some certain amount* of EDUTokens until
                                    the module deadline.
                                  </li>
                                </ul>
                              </p>
                              <h3 className="font-bold  text-xl">Conditions</h3>
                              You need to confirm that you understand the
                              following conditions:
                              <p className="text-base mb-4">
                                <ul className="flex flex-col gap-4 px-8 mt-4">
                                  <li>
                                    🔵 You need to stake{" "}
                                    <strong>at least 10 EDUTokens</strong>
                                    to register for the course.
                                  </li>
                                  <li>
                                    🔴 You will not be able to withdraw your
                                    staked tokens{" "}
                                    <strong>until the module deadline</strong>.
                                  </li>
                                  <li>
                                    🔴 You will not be able to withdraw your
                                    staked tokens,{" "}
                                    <strong>
                                      if you cannot complete the module by the
                                      deadline
                                    </strong>
                                    .
                                  </li>
                                  <li>
                                    🟢 You will be able to withdraw your staked
                                    tokens with its rewards,{" "}
                                    <strong>
                                      if you complete the module by the deadline
                                    </strong>
                                    .
                                  </li>
                                </ul>
                              </p>
                              <div className="border rounded-lg border-brand-yellow bg-yellow-50 text-gray-950 px-6 py-4">
                                * 💰 <strong>The returning amount</strong> in
                                the case you successfully completing the module
                                is determined by the following calculation:{" "}
                                <br />
                                <strong>
                                  staking time (i.e., the time limit or the
                                  deadline of the Module) &times; EDUToken
                                  amount you staked &times; Reward Rate**.
                                </strong>
                              </div>
                              <div className="mt-6 border rounded-lg border-brand-yellow bg-yellow-50 text-gray-950 px-6 py-4">
                                * 🎁{" "}
                                <strong>
                                  Reward Rate (For staking 100 EDUToken):
                                </strong>{" "}
                                2592 EDUToken per 30 days / 86,4 EDUTokens per
                                day
                              </div>
                            </div>
                          </DialogHeader>

                          <div
                            className="cursor-pointer px-6 py-3 flex items-center gap-2 justify-center font-semibold w-[80%] mx-auto rounded-lg bg-brand-blue text-white "
                            onClick={handleApprove}
                          >
                            {isAllowanceLoading ? (
                              <div className="flex items-center text-white justify-center gap-2 w-full">
                                <Loader size={26} className="animate-spin " />
                                <p className="animate-pulse ">
                                  Waiting for allowance...
                                </p>
                              </div>
                            ) : isApprovingLoading ? (
                              <div className="flex items-center text-white justify-center gap-2 w-full">
                                <Loader size={26} className="animate-spin " />
                                <p className="animate-pulse ">
                                  Waiting for approval...
                                </p>
                              </div>
                            ) : isStakingLoading ? (
                              <div className="flex items-center text-white justify-center gap-2 w-full">
                                <Loader size={26} className="animate-spin " />
                                <p className="animate-pulse ">Staking...</p>
                              </div>
                            ) : isApprovingSuccess && isStakingSuccess ? (
                              <div className="flex items-center animate-pulse text-white justify-center gap-2 w-full">
                                <TicketCheck size={26} />
                                <p>Staked Successfully.</p>
                              </div>
                            ) : (
                              <>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <CircleHelp
                                        size={20}
                                        className="text-white"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="w-[200px] z-50 text-sm bg-white text-gray-950 border border-brand-blue">
                                      For the EDU Chain Hackathon purposes,
                                      students are limited to stake a maximum of
                                      0.1 EDUTokens.
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                Stake 0.1 EDUTokens and Register Now
                              </>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : (
                    <div className=" flex-col flex gap-6 items-end w-full">
                      <div key={currentModule.id} className="w-full">
                        Progress (
                        {(
                          (Number(currentModule.completedLessonsIds.length) /
                            (arcModuleInfo?.lessonNumber ?? 0)) *
                          100
                        ).toFixed(0)}
                        %) ({Number(currentModule.completedLessonsIds.length)}{" "}
                        Lessons Completed)
                        <Progress
                          value={
                            (Number(currentModule.completedLessonsIds.length) /
                              (arcModuleInfo?.lessonNumber ?? 0)) *
                            100
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="cursor-pointer px-6 py-3 w-[50%] flex items-center gap-2 justify-center font-semibold rounded-lg bg-brand-blue text-white">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <CircleHelp size={20} className="text-white" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-white text-gray-950 border border-brand-blue">
                              <p>
                                This feature is not available in the beta
                                version.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        Continue Learning
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div
          id="moduleOverview"
          className="w-full border rounded-2xl  p-8 shadow-md bg-white"
        >
          {isDataLoading ? (
            <div className="flex items-center justify-center gap-2 w-full">
              <Loader size={34} className="animate-spin text-brand-blue" />
            </div>
          ) : (
            <div>
              <h4 className="text-brand-blue font-semibold">Module Overview</h4>
              <h1 className="text-2xl font-bold mt-2">About The Course</h1>
              <hr className="my-6 border" />
              <h5 className="font-semibold mb-3">What you&lsquo;ll learn</h5>
              <ul className="list-none">
                {arcModuleInfo?.whatYouWillLearn.map((item, index) => (
                  <li className="flex items-center gap-2 mb-3" key={index}>
                    <CircleCheck className="text-brand-blue" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <hr className="my-6 border" />
              <h5 className="font-semibold mb-3">Module Description</h5>
              {selectedArcModuleId === "1" ? (
                <Module1Description />
              ) : selectedArcModuleId === "2" ? (
                <Module2Description />
              ) : selectedArcModuleId === "3" ? (
                <Module3Description />
              ) : null}
              <hr className="my-6 border" />
              <h5 className="font-semibold mb-3">Arc Designers</h5>
              {arcDesignersInfo.map((designer, index) => (
                <div key={index} className="flex flex-col w-[400px] gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="module image"
                      width={100}
                      height={100}
                      src={`${designer.imageSrc}`}
                      className="rounded-lg border"
                    />
                    <div className="flex flex-col ">
                      <p className="text-lg font-semibold">
                        {designer.fullName}
                      </p>
                      <p className="text-gray-500">{designer.designation}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Link
                          className="p-2 border rounded-lg hover:bg-gray-50"
                          href={designer.twitter || "#"}
                        >
                          <Twitter />
                        </Link>
                        <Link
                          className="p-2 border rounded-lg"
                          href={designer.linkedin || "#"}
                        >
                          <Linkedin />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <p>{designer.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section
        id="contentNavigation"
        className="w-[25%] bg-white rounded-2xl border h-[140px] p-6 flex flex-col items-center"
      >
        {isDataLoading ? (
          <div className="flex items-center justify-center gap-2 w-full">
            <Loader size={34} className="animate-spin text-brand-blue" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp size={28} className="text-brand-blue" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white text-gray-950 border border-brand-blue">
                    <p>
                      Module content tracking feature is not available in the
                      beta version.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex flex-col">
                <span className="text-sm">{arcModuleInfo?.category}</span>
                <h2 className="font-semibold text-xl">
                  {arcModuleInfo?.title}
                </h2>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default ArcModuleInfoPage;

const Module1Description = () => {
  return (
    <div>
      <h3 className="font-bold text-xl">
        Master HTML5 Basics and Build Your Web Development Foundation!
      </h3>
      <br />
      <br />
      Campus Arc&lsquo;s HTML5 Basics course is your gateway to the world of web
      development. Whether you&lsquo;re a complete beginner or someone with a
      bit of coding experience, this course is designed to equip you with the
      essential skills needed to create modern, responsive websites using HTML5.
      <br />
      <br />
      30 days, 1 hour per day, learn to build with projects, get hands-on
      experience, and become a proficient web developer.
      <br />
      <br />
      Our HTML5 Basics course is the most comprehensive, easy-to-follow
      introduction to HTML5 ever created. With a focus on practical learning,
      you&lsquo;ll quickly move from understanding basic HTML concepts to
      building fully functional web pages. Over 150,000 students have
      kickstarted their web development careers with this course.
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
      developer, even with zero prior experience. Here&lsquo;s why:
      <br />
      <br />
      <ul className="flex flex-col gap-4 px-6">
        <li>
          - Taught by experienced web developers who understand what beginners
          need to succeed.
        </li>
        <li>
          - Regularly updated to include the latest HTML5 standards, practices,
          and development tools.
        </li>
        <li>
          - Learn practical skills that are directly applicable to real-world
          projects and web development jobs.
        </li>
        <li>
          The curriculum is crafted with input from both industry experts and
          students to ensure clarity and effectiveness.
        </li>
        <li>
          - Over 150,000 students have launched their web development journey
          with this course, many of whom have gone on to create their own
          websites or start web development careers.
        </li>
        <li>
          - The course is completely free, giving you full access to a top-notch
          HTML5 education without any cost.
        </li>
        <li>
          - We&lsquo;ll guide you step-by-step through the process of
          understanding HTML5, from basic tags to building complex web page
          structures. Engaging video tutorials and interactive coding exercises
          will make sure you grasp the material fully.
        </li>
      </ul>
      The HTML5 Basics course is project-based, designed to help you create a
      portfolio of web pages as you learn. It includes quizzes, assignments, and
      hands-on projects to ensure you can apply what you learn effectively.
      <br />
      <br />
      You&lsquo;ll cover topics such as:
      <ul className="flex flex-col gap-4 px-6">
        <li>- Introduction to HTML5 and its importance in web development</li>
        <li>
          - Creating and structuring web pages with semantic HTML5 elements
        </li>
        <li>- Embedding multimedia, such as images, audio, and video</li>
        <li>- Building responsive forms for user input</li>
        <li>
          - Best practices for writing clean, accessible, and SEO-friendly HTML5
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

const Module2Description = () => {
  return (
    <div>
      <h3 className="font-bold text-xl">
        Elevate Your Web Design Skills with CSS3 Fundamentals!
      </h3>
      <p>
        Master advanced styling techniques, create responsive layouts, and bring
        your designs to life with captivating animations. Our CSS3 Fundamentals
        course is designed to equip you with the essential skills needed to
        craft stunning and modern web interfaces.
      </p>
      <div>
        <h3 className="font-bold text-xl mt-6">Key Topics:</h3>
        <ul className="flex flex-col gap-4 px-6">
          <li>
            - CSS3 Selectors: Target specific elements and styles with
            precision.
          </li>
          <li>
            - CSS3 Properties: Control layout, appearance, and behavior of your
            web pages.
          </li>
          <li>
            - CSS3 Layout Techniques: Explore flexbox and grid for responsive
            and dynamic designs.
          </li>
          <li>
            - CSS3 Animations and Transitions: Add movement and interactivity to
            your web pages.
          </li>
          <li>
            - CSS3 Typography: Customize fonts, text styles, and layout for
            enhanced readability and visual appeal.
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-xl mt-6">
          {" "}
          Why Choose Our CSS3 Fundamentals Arc Module?
        </h3>
        <ul className="flex flex-col gap-4 px-6">
          <li>
            - Learn from experienced web designers who understand the nuances of
            CSS3.
          </li>
          <li>
            - Gain practical skills that are directly applicable to real-world
            projects.
          </li>
          <li>
            - Benefit from a comprehensive curriculum that covers all the
            essential aspects of CSS3.
          </li>
          <li>
            - Join a supportive learning community where you can ask questions
            and get help.
          </li>
        </ul>
      </div>
    </div>
  );
};

const Module3Description = () => {
  return (
    <div>
      **Master Full-Stack Development with Next.js**
      <p>
        Build powerful and scalable web applications with our comprehensive
        Next.js course. Learn to leverage the power of React, server-side
        rendering, and Next.js&lsquo;s advanced features to create top-notch
        full-stack applications.
      </p>
      <div>
        **Key Topics:**
        <ul>
          <li>
            Next.js Fundamentals: Understand the core concepts and features of
            Next.js.
          </li>
          <li>
            React Components and State Management: Master React&lsquo;s
            component-based architecture and state management.
          </li>
          <li>
            API Routing and Data Fetching: Build efficient APIs and fetch data
            using Next.js&lsquo;s built-in features.
          </li>
          <li>
            Server-Side Rendering (SSR): Learn the benefits of SSR and implement
            it in your Next.js applications.
          </li>
          <li>
            Deployment and Optimization: Deploy your applications to production
            and optimize for performance.
          </li>
          <li>
            Advanced Topics: Explore SSG, ISR, and custom server configurations.
          </li>
        </ul>
      </div>
      <div>
        **Why Choose Our Next.js Course?**
        <ul>
          <li>
            Learn from experienced full-stack developers who specialize in
            Next.js.
          </li>
          <li>
            Gain practical skills that are in high demand in the job market.
          </li>
          <li>
            Benefit from a comprehensive curriculum that covers all the
            essential aspects of Next.js.
          </li>
          <li>
            Join a supportive learning community where you can ask questions and
            get help.
          </li>
        </ul>
      </div>
      <p>
        **Enroll today and start building your full-stack development skills!**
      </p>
    </div>
  );
};
