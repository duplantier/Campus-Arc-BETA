"use client";
import dynamic from "next/dynamic";
import React from "react";

const ClientOnlyMyCertificates = dynamic(
  () =>
    import("@/components/client-only/MyCertificatesPage").then(
      (mod) => mod as { default: React.ComponentType }
    ),
  {
    ssr: false,
  }
);
const MyCertificatesPage = () => {
  return <ClientOnlyMyCertificates />;
};

export default MyCertificatesPage;
