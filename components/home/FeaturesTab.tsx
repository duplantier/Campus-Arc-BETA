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
        Explore the capabilities of Campus Arc.
      </p>
      <BentoGrid className="w-full mx-auto mb-16">
        {items.map((item, i) => (
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
    title: "Interactive learning experience",
    description: "Dive into the transformative power of technology.",
    header: "/collaboration.svg",
    className: "md:col-span-1 ",
  },
  {
    title: " Real-time collaboration with peers",
    description: "Work together with your peers in real-time.",
    header: "/collaboration.svg",
    className: "md:col-span-1",
  },
  {
    title: "Title ",
    description: "Desc ",
    header: "/collaboration.svg",
    className: "md:col-span-2",
  },
  {
    title: "Title 1",
    description: "description 1",
    header: "/collaboration.svg",
    className: "md:col-span-1",
  },
  {
    title: "Title 2",
    description: "Description 2",
    header: "/collaboration.svg",
    className: "md:col-span-1",
  },
  {
    title: "Title 3",
    description: "Description 3",
    header: "/collaboration.svg",
    className: "md:col-span-1",
  },
];

export default FeaturesTab;
