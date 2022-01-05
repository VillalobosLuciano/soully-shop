import { FC } from "react";
import { Container } from "@components/ui";
import Link from "next/link";
import s from "./Navbar.module.css";
import { Usernav } from "@components/common";
import logo from "../../../public/soully-logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import cn from "classnames";
import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";

const Navbar: FC = () => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const router = useRouter();
  const isHome = router.pathname === "/";
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-50 bg-white/80 backdrop-blur-md lg:px-0">
        {bannerVisible && (
          <div className="relative bg-indigo-600">
            <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="pr-16 sm:text-center sm:px-16">
                <p className="font-medium text-white">
                  <span className="md:hidden">
                    This is a test ecommerce site.
                  </span>
                  <span className="hidden md:inline">
                    This is a test ecommerce site. Only test orders are
                    accepted.
                  </span>
                  <span className="block sm:ml-2 sm:inline-block">
                    <a
                      href="https://lucianov-dev.vercel.app/projects/soully"
                      target="_blank"
                      className="font-bold text-white underline"
                    >
                      {" "}
                      Learn more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </p>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:pt-1 sm:pr-2 sm:items-start">
                <button
                  onClick={() => {
                    setBannerVisible(false);
                  }}
                  type="button"
                  className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
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
    </>
  );
};

export default Navbar;
