"use client";
import React from "react";
import dynamic from "next/dynamic";
const ClientOnlyDashboard = dynamic(
  () =>
    import("@/components/client-only/DashboardPage").then(
      (mod) => mod as { default: React.ComponentType }
    ),
  {
    ssr: false,
  }
);
const Dashboard = () => {
  return <ClientOnlyDashboard />;
};

export default Dashboard;
