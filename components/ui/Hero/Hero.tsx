import { FC } from "react";
import s from "./Hero.module.css";
import Link from "next/link";
import { Container } from "@components/ui";
import logo from "../../../public/soully-logo.svg";
import smallBatches from "../../../public/images/small-batches.svg";
import organicIngredients from "../../../public/images/organic-ingredients.svg";
import zeroWaste from "../../../public/images/zero-waste.svg";
import Image from "next/image";
import { motion } from "framer-motion";

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
      <div className="px-4 pt-20 mx-auto max-w-7xl">
        <div className={s.root}>
          <div className="mx-auto space-y-4 text-center lg:pt-32">
            <div className="relative h-[130px] cursor-pointer w-[280px] mx-auto">
              <Image alt="Soully" src={logo} layout="fill" />
            </div>
            <h2 className={s.headline}>{headline}</h2>
          </div>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-6 pt-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:pb-24 lg:pt-20 max-w-7xl">
        {perks.map((perk, i) => (
          <motion.li
            key={perk.name}
            className="col-span-1"
            initial={{
              opacity: 0,
              translateX: -15,
            }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className="flex w-full">
              <div className="flex-shrink-0">
                <div className="relative h-24 w-28">
                  <Image src={perk.imageSrc} alt="" layout="fill" />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <h3 className="text-sm font-medium text-gray-600">
                  {perk.name}
                </h3>
                <p className="pr-6 mt-2 text-sm text-gray-500 md:pr-0">
                  {perk.description}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
};

export default Hero;
