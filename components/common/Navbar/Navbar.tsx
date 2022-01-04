import { FC } from "react";
import { Container } from "@components/ui";
import Link from "next/link";
import s from "./Navbar.module.css";
import { Usernav } from "@components/common";
import logo from "../../../public/soully-logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import cn from "classnames";

const Navbar: FC = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  return (
    <nav
      // className={cn("bg-white/80", {
      //   "shadow-sm shadow-[#0899A7]/20 fixed inset-x-0 z-50 backdrop-blur-md":
      //     isHome,
      //   "": !isHome,
      // })}
      className="fixed inset-x-0 z-50 px-1 border-b border-gray-50 bg-white/80 backdrop-blur-md lg:px-0"
    >
      <div
        className={cn(
          "flex items-center justify-between pl-2 pr-4 mx-auto lg:px-0",
          {
            "max-w-7xl lg:py-2": isHome,
            "max-w-8xl lg:mx-10 lg:py-4": !isHome,
          }
        )}
      >
        <div
          onClick={() => router.push("/")}
          className="relative w-24 h-16 cursor-pointer lg:w-28"
        >
          <Image alt="lucianov logo" src={logo} layout="fill" />
        </div>

        <Usernav />
      </div>
    </nav>
  );
};

export default Navbar;
