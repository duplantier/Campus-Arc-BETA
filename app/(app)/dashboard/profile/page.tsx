"use client";
import React from "react";
import dynamic from "next/dynamic";

const ClientOnlyProfilePage = dynamic(
  () =>
    import("@/components/client-only/ProfilePage").then(
      (mod) => mod as { default: React.ComponentType }
    ),
  {
    ssr: false,
  }
);
const ProfilePage = () => {
  return <ClientOnlyProfilePage />;
};

export default ProfilePage;
