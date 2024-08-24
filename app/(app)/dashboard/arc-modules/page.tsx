"use client";

import dynamic from "next/dynamic";

const ClientOnlyArcModules = dynamic(
  () =>
    import("@/components/client-only/ArcModulesPage").then(
      (mod) => mod as { default: React.ComponentType }
    ),
  {
    ssr: false,
  }
);
const ArcModulesPage = () => {
  return <ClientOnlyArcModules />;
};

export default ArcModulesPage;
