import React from "react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import LoginWithOCID from "./LoginWithOCID";
import {
  BookCheck,
  ChevronDown,
  CircleHelp,
  CircleUser,
  Component,
  LayoutDashboard,
  LibraryBig,
  LifeBuoy,
  LogOut,
  Settings,
  User,
  UserPen,
} from "lucide-react";
const AccountButton = () => {
  const router = useRouter();

  const { authState, ocAuth } = useOCAuth();

  let isLogOut = sessionStorage.getItem("isLogOut");

  if (authState.isLoading) {
    console.log("Loading...");
  }
  if (authState.error) {
    console.log("Error:", authState.error.message);
  }

  sessionStorage.setItem("edu_username", ocAuth.getAuthInfo().edu_username);
  sessionStorage.setItem("eth_address", ocAuth.getAuthInfo().eth_address);

  const logOut = () => {
    authState.isAuthenticated = false;
    sessionStorage.setItem("isLogOut", "true");
    window.location.reload();
  };
  return authState.isAuthenticated && isLogOut && isLogOut != "true" ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full px-6 py-3 bg-brand-blue text-gray-50 inline-block">
        <div className="flex justify-center items-center gap-2">
          <div className="flex justify-center items-center gap-1">
            <CircleUser size={20} />
            <span className="font-bold">
              {ocAuth.getAuthInfo().edu_username}
              {/*  {ocAuth.getAuthInfo().eth_address} */}
            </span>
          </div>
          <ChevronDown size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-2 px-3 bg-white text-black w-[300px] rounded-xl  ">
        <DropdownMenuLabel>MY ACCOUNT</DropdownMenuLabel>
        <DropdownMenuGroup className="border-y pb-2 pt-3 mt-2">
          <DropdownMenuItem
            onClick={() => router.push("/dashboard")}
            className="hover:bg-gray-100 cursor-pointer flex items-center gap-1"
          >
            <LayoutDashboard size={20} /> Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/arc-modules")}
            className="hover:bg-gray-100 cursor-pointer flex items-center gap-1"
          >
            <Component size={20} />
            Arc Modules
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/my-certificates")}
            className="hover:bg-gray-100 cursor-pointer flex items-center gap-1"
          >
            <BookCheck size={20} />
            My Certificates
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/profile")}
            className="hover:bg-gray-100 cursor-pointer flex items-center gap-1"
          >
            <CircleUser size={20} /> Profile
          </DropdownMenuItem>
         {/*  <DropdownMenuItem className="hover:bg-[#fff6db] cursor-not-allowed flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp size={20} className="text-brand-yellow" />
                </TooltipTrigger>
                <TooltipContent className="bg-white text-gray-950 border border-brand-yellow">
                  <p>This feature is not available in the beta version.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            Arc Designer Panel
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
       {/*  <DropdownMenuGroup className="border-y py-3 mt-2">
          

          <DropdownMenuItem
            onClick={() => router.push("/dashboard/settings")}
            className="hover:bg-gray-100 cursor-pointer flex items-center gap-1"
          >
            <Settings size={20} /> Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/support")}
            className="hover:bg-gray-100 cursor-pointer flex items-center gap-1"
          >
            <LifeBuoy size={19} /> Support
          </DropdownMenuItem>
        </DropdownMenuGroup> */}

        <DropdownMenuItem
          onClick={() => logOut()}
          className="mt-2 hover:bg-red-100 cursor-pointer hover:text-red-500 flex items-center gap-1"
        >
          <LogOut size={20} /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <LoginWithOCID />
  );
};

export default AccountButton;
