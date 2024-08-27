"use client";
import dynamic from "next/dynamic";
import React from "react";

const ClientOnlyArcModulePage = dynamic(
  () =>
    import("@/components/client-only/ModulePage").then(
      (mod) => mod as { default: React.ComponentType }
    ),
  {
    ssr: false,
  }
);
const MyCertificatesPage = () => {
  return <ClientOnlyArcModulePage />;
};

export default MyCertificatesPage;
