"use client";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { LoginCallBack } from "@opencampus/ocid-connect-js";
import { Loader, ShieldX } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RedirectPage() {
  const { authState, ocAuth } = useOCAuth();
  const router = useRouter();

  const loginSuccess = () => {
    sessionStorage.setItem("edu_username", ocAuth.getAuthInfo().edu_username);
    sessionStorage.setItem("eth_address", ocAuth.getAuthInfo().eth_address);
    sessionStorage.setItem("OCaccessToken", authState.accessToken);

    const userEduUsername = sessionStorage.getItem("edu_username");
    const userEthAddress = sessionStorage.getItem("eth_address");
    const userOCaccessToken = sessionStorage.getItem("OCaccessToken");

    const createStudent = async () => {
      const createStudentResponse = await fetch("/api/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reqType: "create",
          adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
          eduUsername: userEduUsername,
          ethAddress: userEthAddress,
          OCaccessToken: userOCaccessToken,
        }),
      });
      console.log(process.env.NEXT_PUBLIC_ADMIN_KEY)
      console.log(userEduUsername)
      console.log(userEthAddress)
      console.log(userOCaccessToken)

      const createStudentData = await createStudentResponse.json();
      const studentId = createStudentData.studentId;
      sessionStorage.setItem("studentId", studentId);
    };

    createStudent(); // create student in the database

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
