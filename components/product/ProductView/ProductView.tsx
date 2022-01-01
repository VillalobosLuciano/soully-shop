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

interface Props {
  product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
  const [choices, setChoices] = useState<Choices>({});
  const [isLoading, setIsLoading] = useState(false);

  const { openSidebar } = useUI();
  const addItem = useAddItem();

  const variant = getVariant(product, choices);

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
      <Navbar />
      <Container>
        <div className={cn(s.root, "fit", "mb-5")}>
          <div className={cn(s.productDisplay, "fit")}>
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
          <div className={s.sidebar}>
            <section>
              <div className={s.nameBox}>
                <h1 className={s.name}>{product.name}</h1>
                <div className={s.price}>
                  {variant ? `$ ${variant?.price}` : `$ ${product.price.value}`}
                  {/* {product.price.value}
                  {` `}
                  {product.price.currencyCode} */}
                </div>
              </div>
              <div className="w-full max-w-xl pt-10 pb-8 text-lg text-gray-700 break-words">
                {product.description}
              </div>

              <div className="mt-2 space-y-8">
                {product.options.map((option) => (
                  <div key={option.id} className="">
                    <h2 className="text-lg font-semibold text-gray-600 capitalize">
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
            <div>
              <Button
                className={s.button}
                onClick={addToCart}
                isLoading={isLoading}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductView;
