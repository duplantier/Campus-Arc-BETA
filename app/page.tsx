import NavbarAndTabs from "@/components/NavbarAndTabs";

export default function Home() {
  return (
    <main className="transition-all duration-300 rounded-xl w-full h-[120vh] bg-dot-black/[0.4] ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
      <NavbarAndTabs />
    </main>
  );
}
