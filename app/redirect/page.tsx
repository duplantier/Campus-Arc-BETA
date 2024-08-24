"use client";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { LoginCallBack } from "@opencampus/ocid-connect-js";
import { Loader, ShieldX } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RedirectPage() {
  const router = useRouter();

  const loginSuccess = () => {
    sessionStorage.setItem("isLogOut", "false");
    router.push("/"); // Redirect after successful login
  };

  const loginError = (error: any) => {
    console.error("Login error:", error);
  };

  function CustomErrorComponent() {
    const { authState } = useOCAuth();
    return (
      <div className="w-full h-[100vh] flex justify-center items-center flex-col gap-6">
        <Image
          src="/logo.svg"
          alt="Campus Arc BETA Logo"
          width={350}
          height={100}
          className="w-64 h-auto"
       
        />
        <div className="font-bold">
          Error Logging in: {authState.error?.message}
        </div>
        <ShieldX size={34} className="animate-pulse text-red-500" />
      </div>
    );
  }

  function CustomLoadingComponent() {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center flex-col gap-6">
        <Image
          src="/logo.svg"
          alt="Campus Arc BETA Logo"
          width={350}
          height={100}
          className="w-64 h-auto animate-pulse"
        />
        <Loader size={34} className="animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <LoginCallBack
      errorCallback={loginError}
      successCallback={loginSuccess}
      customErrorComponent={<CustomErrorComponent />}
      customLoadingComponent={<CustomLoadingComponent />}
    />
  );
}
