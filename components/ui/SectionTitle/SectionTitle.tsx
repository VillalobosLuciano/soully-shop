import { FC } from "react";
import s from "./SectionTitle.module.css";

interface Props {
  headline: string;
  title: string;
}

const Hero: FC<Props> = ({ headline, title }) => {
  return (
    <div className="py-2 mx-auto max-w-7xl">
      <h2 className="lg:text-lg font-semibold tracking-tight text-[#0899a7]">
        {headline}
      </h2>
      <h3 className="mt-1 text-3xl font-semibold tracking-tight text-gray-600">
        {title}
      </h3>
    </div>
  );
};

export default Hero;
