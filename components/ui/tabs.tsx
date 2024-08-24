"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import LoginWithOCID from "../LoginWithOCID";
import { ChevronDown, CircleUser } from "lucide-react";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HomeTab from "../home/HomeTab";
import FeaturesTab from "../home/FeaturesTab";
import AboutTab from "../home/AboutTab";
import HowItWorksTab from "../home/HowItWorksTab";
import CoursesTab from "../home/CoursesTab";
import { useRouter } from "next/navigation";

export const Tabs = ({
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const staticTabs = [
    {
      title: "Home",
      value: "home",
      content: <HomeTab />,
    },
    {
      title: "Features",
      value: "features",
      content: <FeaturesTab />,
    },

    {
      title: "About",
      value: "about",
      content: <AboutTab />,
    },

    {
      title: "How It Works",
      value: "howitworks",
      content: <HowItWorksTab />,
    },
    {
      title: "Courses",
      value: "coures",
      content: <CoursesTab />,
    },
  ];
  const [active, setActive] = useState<Tab>(staticTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(staticTabs);
  const router = useRouter();

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...staticTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);
  const { authState, ocAuth } = useOCAuth();

  /* sessionStorage.setItem(
    "username",
    JSON.stringify(ocAuth.getAuthInfo().edu_username)
  ); */

  //console.log(JSON.stringify(ocAuth.getAuthInfo(), null, 2));

  let isLogOut = sessionStorage.getItem("isLogOut");

  /*  useEffect(() => {
    if (ocAuth !== undefined) {
      const edu_username = ocAuth.authInfoManager._idInfo.edu_username;
      const eth_address = ocAuth.authInfoManager._idInfo.eth_address;
      console.log("edu_username: ", edu_username);
      console.log("eth_address: ", eth_address);
    }
  }, [ocAuth]); */

  if (authState.isLoading) {
    console.log("Loading...");
  }
  if (authState.error) {
    console.log("Error:", authState.error.message);
  }

  /* Wallet addresiyle giriş yapan birinden dönen bilgiler */
  /* 
  AUTHSTATE OBJECT
  {
    "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImFybjphd3M6a21zOmFwLW5vcnRoZWFzdC0yOjQ5NTEzMDE4NjU2OTprZXkvNDk4OWM3MTItZTdhYi00ZjJkLWFlMjEtZDE3MGJiNmE0MTMyIn0.eyJ1c2VyX2lkIjo3NDUwLCJldGhfYWRkcmVzcyI6IjB4ZTc4OTIzNzRjYjViNzVjZjFjZDNlZWViNjc1YzNkY2I2Nzc2MmY1YSIsImVkdV91c2VybmFtZSI6ImR1cGxhbnRpZXIuZWR1Iiwibm9uY2UiOiJkODgzZDQ1NTNkYmRmNDlhNGJlOTQxMjQ3OTY2NjQ0YTYwYmM5OTZiN2ZmZGViNGY1YzUzYmMyMWViYjY5YWFmIiwiaXNzIjoiT3BlbkNhbXB1cyIsImlhdCI6MTcyNDQyOTQ2OSwiZXhwIjoxNzI0NTE1ODY5LCJhdWQiOiJsb2NhbGhvc3QifQ.NqADxce1xe73FxXJ_jhZG2WkuuTkDS4Pubha0LAO5EesHFsYbaA2tTwitt55gDdz_LS2XCZi46yhAgRHEcxm6g",
    "idToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImFybjphd3M6a21zOmFwLW5vcnRoZWFzdC0yOjQ5NTEzMDE4NjU2OTprZXkvNDk4OWM3MTItZTdhYi00ZjJkLWFlMjEtZDE3MGJiNmE0MTMyIn0.eyJ1c2VyX2lkIjo3NDUwLCJldGhfYWRkcmVzcyI6IjB4ZTc4OTIzNzRjYjViNzVjZjFjZDNlZWViNjc1YzNkY2I2Nzc2MmY1YSIsImVkdV91c2VybmFtZSI6ImR1cGxhbnRpZXIuZWR1IiwiaXNzIjoiT3BlbkNhbXB1cyIsImlhdCI6MTcyNDQyOTQ2OSwiZXhwIjoxNzI0NTE1ODY5LCJhdWQiOiJsb2NhbGhvc3QifQ.HQLtvzOxG0A9eNswrwh9I9aXZYSSdpLZ4S66t3qrqEXyzlxLDoUcq06_5w4tj_9vgiiP_BFMqo0Z609cIN9gXg",
    "isAuthenticated": true
}
  */

  /* 
OCAUTH OBJECT:
{
    "tokenManager": {
        "storageManager": {
            "storageProvider": {
                "-CBWSDK:VERSION": "4.0.4",
                "ally-supports-cache": "{\"userAgent\":\"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36\",\"version\":\"1.4.1\",\"focusAreaImgTabindex\":false,\"focusAreaTabindex\":false,\"focusAreaWithoutHref\":false,\"focusAudioWithoutControls\":false,\"focusBrokenImageMap\":true,\"focusChildrenOfFocusableFlexbox\":false,\"focusFieldsetDisabled\":true,\"focusFieldset\":false,\"focusFlexboxContainer\":false,\"focusFormDisabled\":true,\"focusImgIsmap\":false,\"focusImgUsemapTabindex\":true,\"focusInHiddenIframe\":true,\"focusInvalidTabindex\":false,\"focusLabelTabindex\":true,\"focusObjectSvg\":true,\"focusObjectSvgHidden\":false,\"focusRedirectImgUsemap\":false,\"focusRedirectLegend\":\"\",\"focusScrollBody\":false,\"focusScrollContainerWithoutOverflow\":false,\"focusScrollContainer\":false,\"focusSummary\":true,\"focusSvgFocusableAttribute\":false,\"focusSvgTabindexAttribute\":true,\"focusSvgNegativeTabindexAttribute\":true,\"focusSvgUseTabindex\":true,\"focusSvgForeignobjectTabindex\":true,\"focusSvg\":false,\"focusTabindexTrailingCharacters\":true,\"focusTable\":false,\"focusVideoWithoutControls\":false,\"cssShadowPiercingDeepCombinator\":\"\",\"focusInZeroDimensionObject\":true,\"focusObjectSwf\":true,\"focusSvgInIframe\":false,\"tabsequenceAreaAtImgPosition\":false,\"time\":\"2024-08-23T16:50:44.655Z\"}",
                "theme": "light",
                "oc-token-storage": "{\"access_token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImFybjphd3M6a21zOmFwLW5vcnRoZWFzdC0yOjQ5NTEzMDE4NjU2OTprZXkvNDk4OWM3MTItZTdhYi00ZjJkLWFlMjEtZDE3MGJiNmE0MTMyIn0.eyJ1c2VyX2lkIjo3NDUwLCJldGhfYWRkcmVzcyI6IjB4ZTc4OTIzNzRjYjViNzVjZjFjZDNlZWViNjc1YzNkY2I2Nzc2MmY1YSIsImVkdV91c2VybmFtZSI6ImR1cGxhbnRpZXIuZWR1Iiwibm9uY2UiOiJkODgzZDQ1NTNkYmRmNDlhNGJlOTQxMjQ3OTY2NjQ0YTYwYmM5OTZiN2ZmZGViNGY1YzUzYmMyMWViYjY5YWFmIiwiaXNzIjoiT3BlbkNhbXB1cyIsImlhdCI6MTcyNDQyOTQ2OSwiZXhwIjoxNzI0NTE1ODY5LCJhdWQiOiJsb2NhbGhvc3QifQ.NqADxce1xe73FxXJ_jhZG2WkuuTkDS4Pubha0LAO5EesHFsYbaA2tTwitt55gDdz_LS2XCZi46yhAgRHEcxm6g\",\"id_token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImFybjphd3M6a21zOmFwLW5vcnRoZWFzdC0yOjQ5NTEzMDE4NjU2OTprZXkvNDk4OWM3MTItZTdhYi00ZjJkLWFlMjEtZDE3MGJiNmE0MTMyIn0.eyJ1c2VyX2lkIjo3NDUwLCJldGhfYWRkcmVzcyI6IjB4ZTc4OTIzNzRjYjViNzVjZjFjZDNlZWViNjc1YzNkY2I2Nzc2MmY1YSIsImVkdV91c2VybmFtZSI6ImR1cGxhbnRpZXIuZWR1IiwiaXNzIjoiT3BlbkNhbXB1cyIsImlhdCI6MTcyNDQyOTQ2OSwiZXhwIjoxNzI0NTE1ODY5LCJhdWQiOiJsb2NhbGhvc3QifQ.HQLtvzOxG0A9eNswrwh9I9aXZYSSdpLZ4S66t3qrqEXyzlxLDoUcq06_5w4tj_9vgiiP_BFMqo0Z609cIN9gXg\",\"expired\":1724515869}"
            },
            "storageName": "oc-token-storage"
        },
        "tokenEndPoint": "https://api.login.sandbox.opencampus.xyz/auth/token",
        "publicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE/EymMLXd/MVYPK5r2xXQj91ZVvX3OQ+QagvR2N6lCvRVjnzmOtPRTf+u5g1RliWnmuxbV3gTm0/0VuV/40Salg=="
    },
    "authInfoManager": {
        "_idInfo": {
            "edu_username": "duplantier.edu",
            "eth_address": "0xe7892374cb5b75cf1cd3eeeb675c3dcb67762f5a"
        },
        "_authState": null
    },
    "transactionManager": {
        "storageManager": {
            "storageProvider": {
                "-CBWSDK:VERSION": "4.0.4",
                "ally-supports-cache": "{\"userAgent\":\"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36\",\"version\":\"1.4.1\",\"focusAreaImgTabindex\":false,\"focusAreaTabindex\":false,\"focusAreaWithoutHref\":false,\"focusAudioWithoutControls\":false,\"focusBrokenImageMap\":true,\"focusChildrenOfFocusableFlexbox\":false,\"focusFieldsetDisabled\":true,\"focusFieldset\":false,\"focusFlexboxContainer\":false,\"focusFormDisabled\":true,\"focusImgIsmap\":false,\"focusImgUsemapTabindex\":true,\"focusInHiddenIframe\":true,\"focusInvalidTabindex\":false,\"focusLabelTabindex\":true,\"focusObjectSvg\":true,\"focusObjectSvgHidden\":false,\"focusRedirectImgUsemap\":false,\"focusRedirectLegend\":\"\",\"focusScrollBody\":false,\"focusScrollContainerWithoutOverflow\":false,\"focusScrollContainer\":false,\"focusSummary\":true,\"focusSvgFocusableAttribute\":false,\"focusSvgTabindexAttribute\":true,\"focusSvgNegativeTabindexAttribute\":true,\"focusSvgUseTabindex\":true,\"focusSvgForeignobjectTabindex\":true,\"focusSvg\":false,\"focusTabindexTrailingCharacters\":true,\"focusTable\":false,\"focusVideoWithoutControls\":false,\"cssShadowPiercingDeepCombinator\":\"\",\"focusInZeroDimensionObject\":true,\"focusObjectSwf\":true,\"focusSvgInIframe\":false,\"tabsequenceAreaAtImgPosition\":false,\"time\":\"2024-08-23T16:50:44.655Z\"}",
                "theme": "light",
                "oc-token-storage": "{\"access_token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImFybjphd3M6a21zOmFwLW5vcnRoZWFzdC0yOjQ5NTEzMDE4NjU2OTprZXkvNDk4OWM3MTItZTdhYi00ZjJkLWFlMjEtZDE3MGJiNmE0MTMyIn0.eyJ1c2VyX2lkIjo3NDUwLCJldGhfYWRkcmVzcyI6IjB4ZTc4OTIzNzRjYjViNzVjZjFjZDNlZWViNjc1YzNkY2I2Nzc2MmY1YSIsImVkdV91c2VybmFtZSI6ImR1cGxhbnRpZXIuZWR1Iiwibm9uY2UiOiJkODgzZDQ1NTNkYmRmNDlhNGJlOTQxMjQ3OTY2NjQ0YTYwYmM5OTZiN2ZmZGViNGY1YzUzYmMyMWViYjY5YWFmIiwiaXNzIjoiT3BlbkNhbXB1cyIsImlhdCI6MTcyNDQyOTQ2OSwiZXhwIjoxNzI0NTE1ODY5LCJhdWQiOiJsb2NhbGhvc3QifQ.NqADxce1xe73FxXJ_jhZG2WkuuTkDS4Pubha0LAO5EesHFsYbaA2tTwitt55gDdz_LS2XCZi46yhAgRHEcxm6g\",\"id_token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImFybjphd3M6a21zOmFwLW5vcnRoZWFzdC0yOjQ5NTEzMDE4NjU2OTprZXkvNDk4OWM3MTItZTdhYi00ZjJkLWFlMjEtZDE3MGJiNmE0MTMyIn0.eyJ1c2VyX2lkIjo3NDUwLCJldGhfYWRkcmVzcyI6IjB4ZTc4OTIzNzRjYjViNzVjZjFjZDNlZWViNjc1YzNkY2I2Nzc2MmY1YSIsImVkdV91c2VybmFtZSI6ImR1cGxhbnRpZXIuZWR1IiwiaXNzIjoiT3BlbkNhbXB1cyIsImlhdCI6MTcyNDQyOTQ2OSwiZXhwIjoxNzI0NTE1ODY5LCJhdWQiOiJsb2NhbGhvc3QifQ.HQLtvzOxG0A9eNswrwh9I9aXZYSSdpLZ4S66t3qrqEXyzlxLDoUcq06_5w4tj_9vgiiP_BFMqo0Z609cIN9gXg\",\"expired\":1724515869}"
            },
            "storageName": "oc-transaction-storage"
        }
    },
    "redirectUri": "http://localhost:3003/redirect",
    "loginEndPoint": "https://api.login.sandbox.opencampus.xyz/auth/login"
}
*/

  /* 

{JSON.stringify(ocAuth.getAuthInfo(), null, 2)}:
{
  "edu_username": "duplantier.edu",
  "eth_address": "0xe7892374cb5b75cf1cd3eeeb675c3dcb67762f5a"
}

*/

  const logOut = () => {
    authState.isAuthenticated = false;
    console.log("authState.isAuthenticated, ", authState.isAuthenticated);

    sessionStorage.setItem("isLogOut", "true");
    window.location.reload();
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row py-5 items-center justify-between [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-[90%] mx-auto ",
          containerClassName
        )}
      >
        <Image
          src="/logo.svg"
          alt="Campus Arc BETA Logo"
          width={200}
          height={100}
          className="w-48 h-auto"
        />
        <div className="flex items-center">
          {staticTabs.map((tab, idx) => (
            <button
              key={tab.title}
              onClick={() => {
                moveSelectedTabToTop(idx);
              }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn("relative px-4 py-2 rounded-full", tabClassName)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {active.value === tab.value && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 bg-brand-yellow font-bold dark:bg-zinc-800 rounded-full ",
                    activeTabClassName
                  )}
                />
              )}

              <span className="relative block font-medium text-black dark:text-white">
                {tab.title}
              </span>
            </button>
          ))}

          {authState.isAuthenticated && isLogOut && isLogOut != "true" ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full px-6 py-3 bg-brand-blue text-gray-50 inline-block">
                <div className="justify-center items-center flex gap-2">
                  <span className="font-bold">
                    {ocAuth.getAuthInfo().edu_username}
                    {/*  {ocAuth.getAuthInfo().eth_address} */}
                  </span>
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-black w-[300px] rounded-xl border-brand-blue border-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup className="border-t pt-3 mt-2">
                  <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                  Support
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => logOut()}
                  className="border-t pt-2 mt-2 hover:bg-gray-100 cursor-pointer"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <LoginWithOCID />
          )}
        </div>
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-8", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-[90%] mx-auto h-full ">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
