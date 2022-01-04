import cn from "classnames";
import { FC, useState, useEffect } from "react";
import s from "./ProductView.module.css";
import { Container, Button } from "@components/ui";
import Image from "next/image";
import { Product } from "@common/types/product";
import { ProductSlider, Swatch } from "@components/product";
import { Choices, getVariant } from "../helpers";
import { useUI } from "@components/ui/context";
import useAddItem from "@framework/cart/use-add-item";
import { Navbar } from "@components/common";
import Link from "next/link";

interface Props {
  product: Product;
  products: Product[];
}

const ProductView: FC<Props> = ({ product, products }) => {
  const [choices, setChoices] = useState<Choices>({});
  const [isLoading, setIsLoading] = useState(false);

  const { openSidebar } = useUI();
  const addItem = useAddItem();

  const variant = getVariant(product, choices);

  const handleProductId = () => {
    console.log(products);
    products.map((p) => {
      console.log("all IDs", p.id);
    });
    console.log("product ID", product.id);
    // if () {

    // }
  };

  const addToCart = async () => {
    try {
      const item = {
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
        quantity: 1,
      };

      setIsLoading(true);
      await addItem(item);
      setIsLoading(false);
      openSidebar();
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container>
        <div className="mx-auto max-w-8xl xl:px-12 lg:flex lg:h-[820px]">
          <div className="flex-1 min-w-0 lg:space-x-8 lg:flex">
            <div className="bg-[#0899A7] bg-opacity-5 lg:min-w-0 lg:flex-1 lg:max-w-4xl">
              <div className="h-full">
                <div
                  className="relative h-64 lg:h-full"
                  style={{ minHeight: "36rem" }}
                >
                  <div className={s.imageNameBox}>
                    <h1 className={s.name}>{product.name}</h1>
                    <div className={s.price}>
                      {variant
                        ? `$ ${variant?.price}`
                        : `$ ${product.price.value}`}
                    </div>
                  </div>
                  <ProductSlider>
                    {product.images.map((image) => (
                      <div key={image.url} className={s.imageContainer}>
                        <Image
                          className={s.img}
                          src={image.url}
                          alt={image.alt}
                          width={1050}
                          height={1050}
                          quality="85"
                        />
                      </div>
                    ))}
                  </ProductSlider>
                </div>
              </div>
            </div>
            <div className="max-w-2xl px-5 lg:flex-shrink-0">
              <div
                className="flex flex-col h-full lg:justify-around"
                style={{ minHeight: "16rem" }}
              >
                <section>
                  <div className={s.nameBox}>
                    <h1 className={s.name}>{product.name}</h1>
                    <div className={s.price}>
                      {variant
                        ? `$ ${variant?.price}`
                        : `$ ${product.price.value}`}
                    </div>
                  </div>
                  <div className="w-full max-w-xl py-8 text-lg text-gray-700 break-words">
                    {product.description}
                  </div>

                  <div className="mt-4 space-y-6">
                    {product.options.map((option) => (
                      <div key={option.id} className="">
                        <h2 className="pb-1 text-lg font-light text-gray-600 capitalize">
                          {option.displayName === "net"
                            ? "Net Weight"
                            : option.displayName}
                        </h2>
                        <div className="flex flex-row py-3 space-x-2">
                          {option.values.map((optValue) => {
                            const activeChoice =
                              choices[option.displayName.toLowerCase()];
                            return (
                              <Swatch
                                key={`${option.id}-${optValue.label}`}
                                label={optValue.label}
                                color={optValue.hexColor}
                                variant={option.displayName}
                                active={
                                  optValue.label.toLowerCase() === activeChoice
                                }
                                onClick={() => {
                                  setChoices({
                                    ...choices,
                                    [option.displayName.toLowerCase()]:
                                      optValue.label.toLowerCase(),
                                  });
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <Button
                  className={s.button}
                  onClick={addToCart}
                  isLoading={isLoading}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            {/* <div className="xl:flex-shrink-0 xl:w-64">
            <div className="h-full">
              <div
                className="flex flex-row h-full lg:flex-col"
                style={{ minHeight: "12rem" }}
              >
                <div>
                  {products.map((product) => (
                    <div key={product.id}>
                      <Link href={`/products/${product.slug}`}>
                        <a className="w-full h-full m-2 bg-white border">
                          <div>{product.slug}</div>
                          <div>{product.name}</div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductView;
