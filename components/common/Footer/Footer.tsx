import SocialIcons from "../../icons/SocialIcons";
import { useRouter } from "next/router";
import cn from "classnames";

export const Footer = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <footer
      className={cn({
        "lg:max-w-7xl mx-auto lg:mt-12": isHome,
        "mx-2 lg:px-10 lg:max-w-8xl lg:mt-8": !isHome,
      })}
    >
      <div className="pt-10 pb-10 md:flex md:items-center md:justify-between">
        <SocialIcons />
        <div className="mt-4 md:mt-0 md:order-1">
          <p className="text-base text-center text-gray-800">
            <span className="text-gray-600">{new Date().getFullYear()} ‣ </span>
            Soully Shop ✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
