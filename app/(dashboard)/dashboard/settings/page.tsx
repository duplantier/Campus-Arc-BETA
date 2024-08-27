"use client";

import dynamic from "next/dynamic";

const ClientOnlySettingsPage = dynamic(
  () =>
    import("@/components/client-only/SettingsPage").then(
      (mod) => mod as { default: React.ComponentType }
    ),
  {
    ssr: false,
  }
);
const SettingsPage = () => {
  return <ClientOnlySettingsPage />;
};

export default SettingsPage;
