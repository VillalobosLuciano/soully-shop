import { FC } from "react";
import { Container } from "@components/ui";
import Link from "next/link";
import s from "./Navbar.module.css";
import { Usernav } from "@components/common";
import logo from "../../../public/soully-logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar: FC = () => {
  const router = useRouter();
  return (
    <div className={s.root}>
      <div className="flex items-center">
        <div
          onClick={() => router.push("/")}
          className="relative h-16 mt-1 cursor-pointer w-28"
        >
          <Image alt="lucianov logo" src={logo} layout="fill" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
