import { FC } from "react";
import { Bag, Cross } from "@components/icons";
import cn from "classnames";
import { useUI } from "@components/ui/context";
import useCart from "@framework/cart/use-cart";
import { LineItem } from "@common/types/cart";
import CartItem from "../CartItem";
import { Button } from "@components/ui";

const CartSidebar: FC = () => {
  const { closeSidebar } = useUI();
  const { data, isEmpty } = useCart();

  const rootClass = cn("h-full flex flex-col", {
    "bg-secondary text-secondary": isEmpty,
  });

  return (
    <div className={rootClass}>
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="flex items-center h-7">
            <button
              onClick={closeSidebar}
              className={cn({
                "flex text-white transition duration-150 ease-in-out hover:text-gray-200":
                  isEmpty,
                "flex text-gray-800 transition duration-150 ease-in-out hover:text-gray-500":
                  !isEmpty,
              })}
            >
              <Cross className="w-6 h-6 mr-2" />
              Close
            </button>
          </div>
        </div>
      </header>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <span className="flex items-center justify-center w-16 h-16 p-12 border border-dashed rounded-full border-primary bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="px-10 pt-2 text-center text-gray-200">
            You have no items in your cart.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 px-4 sm:px-6">
            <h2 className="inline-block pt-1 pb-4 text-base text-xl font-bold leading-7 tracking-wide text-gray-800">
              My Cart
            </h2>
            <ul className="py-6 space-y-6 border-t border-gray-200 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
              {data?.lineItems.map((item: LineItem) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data.currency.code}
                />
              ))}
            </ul>
          </div>
          <div className="flex-shrink-0 px-4 py-5 sm:px-6">
            <div className="border-t border-gray-200">
              <ul className="py-3">
                <li className="flex justify-between py-1 text-gray-800">
                  <span>Subtotal</span>
                  <span>{`$ ${data?.lineItemsSubtotalPrice}`}</span>
                </li>
                <li className="flex justify-between py-1 text-gray-800">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </li>
                <li className="flex justify-between py-1 text-gray-800">
                  <span>Estimated Shipping</span>
                  <span className="font-bold tracking-wide">FREE</span>
                </li>
              </ul>
              <div className="flex justify-between py-3 mb-10 font-bold text-gray-800 border-t border-gray-200">
                <span>Total</span>
                <span>{`$ ${data?.totalPrice}`}</span>
              </div>
            </div>
            <Button Component="a" href="/api/checkout">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
