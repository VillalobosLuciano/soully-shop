import { FC } from "react";
import s from "./Hero.module.css";
import Link from "next/link";
import { Container } from "@components/ui";
import logo from "../../../public/soully-logo.svg";
import smallBatches from "../../../public/images/small-batches.svg";
import organicIngredients from "../../../public/images/organic-ingredients.svg";
import zeroWaste from "../../../public/images/zero-waste.svg";
import Image from "next/image";

const perks = [
  {
    name: "Small Batches",
    imageSrc: smallBatches,
    description:
      "We'll make sure you get the freshest, most delicious and healthiest homemade nut butter in town.",
  },
  {
    name: "Organic Ingredients",
    imageSrc: organicIngredients,
    description:
      "All our ingredients are organic, plant-based, non-GMO, minimally processed and sourced from local farms.",
  },
  {
    name: "Zero Waste Policy",
    imageSrc: zeroWaste,
    description:
      "We are committed to the goal of zero waste. Every step of the production process is based on this policy.",
  },
  // {
  //   name: "Australian Made",
  //   imageSrc:
  //     "https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg",
  //   description:
  //     "We work closely with local farmers and producers to ensure product quality and traceability.",
  // },
];

interface Props {
  headline: string;
  description: string;
}

const Hero: FC<Props> = ({ headline, description }) => {
  return (
    <>
      <div className="px-4 mx-auto max-w-7xl">
        <div className={s.root}>
          <div className="space-y-4 text-center lg:pt-32">
            <div className="relative h-[130px] cursor-pointer w-[280px] mx-auto">
              <Image alt="Soully" src={logo} layout="fill" />
            </div>
            <h2 className={s.headline}>{headline}</h2>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="sr-only">Our perks</h2>
        <div className="pb-8 mx-auto lg:pb-24 lg:pt-20 max-w-7xl">
          <div className="flex space-x-10">
            {perks.map((perk) => (
              <div key={perk.name} className="sm:flex">
                <div className="sm:flex-shrink-0">
                  <div className="relative h-24 w-28">
                    <Image src={perk.imageSrc} alt="" layout="fill" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <h3 className="text-sm font-medium text-gray-600">
                    {perk.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
