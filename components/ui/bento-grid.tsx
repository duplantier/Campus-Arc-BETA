import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
}: {
  className?: string;
  title: string;
  description?: string | React.ReactNode;
  header: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-2",
        className
      )}
    >
      <div className="flex flex-col items-center w-full h-[150px]">
        <Image
          src={header}
          alt={title}
          width={1920}
          height={1080}
          className={`inline-block h-full w-full select-none rounded-2xl ${
            header == "/open-campus.png" || header == "/chatgpt.png" || header == "/collaboration.svg"
              ? "object-cover"
              : "object-contain"
          } `}
        />
      </div>

      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-sans text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-base text-neutral-600 mb-4 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
