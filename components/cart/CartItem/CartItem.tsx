import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import s from "./CartItem.module.css";
import { Trash, Plus, Minus } from "@components/icons";
import { LineItem } from "@common/types/cart";
import { Swatch } from "@components/product";
import useRemoveItem from "@framework/cart/use-remove-item";
import { ChangeEvent, useState } from "react";
import useUpdateItem from "@framework/cart/use-update-item";

const CartItem = ({
  item,
  currencyCode,
}: {
  item: LineItem;
  currencyCode: string;
}) => {
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem();

  const [quantity, setQuantity] = useState(item.quantity);
  const price = item.variant.price! * item.quantity || 0;
  const { options } = item;

  const handleQuantityChange = (val: number) => {
    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val);
      updateItem({
        id: item.id,
        variantId: item.variantId,
        quantity: val,
      });
    }
  };

  const handleQuantity = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    handleQuantityChange(val);
  };

  const incrementQuantity = async (n = 1) => {
    const val = Number(quantity) + n;
    handleQuantityChange(val);
  };

  return (
    <li className="py-4">
      <div
        className={cn("flex flex-row space-x-4 pt-1 pb-3", {
          "opacity-75 pointer-events-none": false,
        })}
      >
        <div className="relative w-16 h-16 overflow-hidden cursor-pointer bg-[#0899A7] bg-opacity-10">
          <Image
            onClick={() => {}}
            className={s.productImage}
            width={150}
            height={150}
            src={item.variant.image!.url}
            unoptimized
          />
        </div>
        <div className="flex flex-row flex-1 text-base">
          <div className="flex-col w-full">
            <div className="flex flex-row justify-between">
              <Link href={`/`}>
                <a
                  className="text-lg font-semibold leading-6 text-gray-800 cursor-pointer"
                  onClick={() => {}}
                >
                  {item.name}
                </a>
              </Link>
              <div className="flex text-white bg-[#0899A7] px-2 py-1">{`$ ${price}`}</div>
            </div>
            <div className="flex p-1">
              {options &&
                options.length > 0 &&
                options.map((option) => {
                  const value = option.values[0];
                  return (
                    <Swatch
                      key={`${item.id}-${option.displayName}`}
                      size="sm"
                      onClick={() => {}}
                      label={value.label}
                      color={value.hexColor}
                      variant={option.displayName}
                    ></Swatch>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-9">
        <button
          className={s.actions}
          onClick={() => {
            removeItem({ id: item.id });
          }}
        >
          <Trash width={20} height={20} />
        </button>
        <label className="w-full ml-2 text-gray-600 border border-gray-300">
          <input
            className={s.input}
            readOnly
            max={4}
            min={0}
            value={quantity}
            onChange={handleQuantity}
          />
        </label>
        <button
          type="button"
          onClick={() => incrementQuantity(-1)}
          className={s.actions}
          style={{ marginLeft: "-1px" }}
          disabled={quantity <= 1}
        >
          <Minus width={18} height={18} />
        </button>
        <button
          type="button"
          onClick={() => incrementQuantity(+1)}
          className={cn(s.actions)}
          style={{ marginLeft: "-1px" }}
          disabled={quantity < 1 || quantity >= 4}
        >
          <Plus width={18} height={18} />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
