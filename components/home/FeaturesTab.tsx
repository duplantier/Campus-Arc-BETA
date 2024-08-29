import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";
const FeaturesTab = () => {
  return (
    <section className="w-full  flex-col items-center px-20  overflow-auto flex gap-10 h-[80vh] mb-16 rounded-2xl text-xl md:text-4xl border  bg-gray-50 ">
      <h1 className="text-center w-full text-gray-950 mt-10 text-5xl righteous-text">
        Features
      </h1>
      <p className="text-lg text-center w-full -mt-8 text-gray-500">
        Explore the capabilities of Campus Arc (Visit the GitHub Repo for
        detailed information)
      </p>
      <BentoGrid className="w-full mx-auto mb-16">
        {items?.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={`${item.className} border border-gray-200`}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

const items = [
  {
    title: "Open Campus ID Verification",
    description:
      "Both students and teachers are required to verify their OC-ID, ensuring a secure identity verification and safe learning environment.",

    header: "/open-campus.png",
    className: "md:col-span-2 ",
  },
  {
    title: "Blockchain Certificates",
    description:
      "Students can earn digital certificates on blockchain, using Blockcerts.",
    header: "/blockchain-certificate.svg",
    className: "md:col-span-1 ",
  },
  {
    title: "Real-Time Collaboration",
    description:
      "Students can collaborate in real-time on projects, thanks to WebSockets.",
    header: "/realtime-collab.svg",
    className: "md:col-span-1",
  },
  {
    title: "AI-Assisted Learning Experience",
    description:
      "Students can get help / feedback from ChatGPT while completing the Arc Module's tasks.",
    header: "/chatgpt.png",
    className: "md:col-span-2",
  },
  {
    title: "Campus-based Community",
    description: "Students can connect and build with their campus fellows.",
    header: "/community.svg",
    className: "md:col-span-1",
  },
  {
    title: "Arc Modules",
    description:
      "Introducing the most innovative and engaging instruction modules ever designed.",
    header: "/arc-module.svg",
    className: "md:col-span-1",
  },
  {
    title: "Arc Designers",
    description:
      "Campus Arc aims to teach its own Arc Module Designers: Arc Designers.",
    header: "/arc-designer.svg",
    className: "md:col-span-1",
  },
];

export default FeaturesTab;
