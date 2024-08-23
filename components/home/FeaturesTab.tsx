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
const FeaturesTab = () => {
  /* 
  Features:
    1. Real-time collaboration with peers 
    2. Interactive learning experience 
    3. OC-ID Verification 
    4. Open Campus Wallet
  
  */
  return (
    <section className="w-full  flex-col items-center px-20  overflow-auto flex gap-10 h-[80vh] mb-16 rounded-2xl text-xl md:text-4xl border  bg-white ">
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
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

const items = [
  {
    title: " Real-time collaboration with peers",
    description: "Work together with your peers in real-time.",
    header: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2 ",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-300" />,
  },
  {
    title: "Interactive learning experience",
    description: "Dive into the transformative power of technology.",
    header: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1 ",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "OC-ID Verification",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];

export default FeaturesTab;
