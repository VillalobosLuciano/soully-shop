import { FC, useEffect } from "react";
import s from "./Usernav.module.css";
import Link from "next/link";
import { Bag as Cart, Heart } from "@components/icons";
import { useUI } from "@components/ui/context";
import useCart from "@framework/cart/use-cart";
import { LineItem } from "@common/types/cart";
import { useApiProvider } from "@common";
import Cookies from "js-cookie";

const Usernav: FC = () => {
  const { openSidebar } = useUI();
  const { data } = useCart();
  // const { checkoutCookie } = useApiProvider();

  // useEffect(() => {
  //   const completedCheckout = data?.completedAt !== null;
  //   console.log("tamo?", completedCheckout);

  //   if (completedCheckout) {
  //     Cookies.remove(checkoutCookie);
  //   }
  // }, [data?.completedAt]);

  const itemsCount =
    data?.lineItems.reduce((count: number, item: LineItem) => {
      return count + item.quantity;
    }, 0) ?? 0;

  return (
    <nav className="flex">
      <ul className={s.list}>
        <li className={s.item} onClick={openSidebar}>
          <Cart />
          {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
        </li>
        <li className={s.item}>
          <Link href="/wishlist">
            <a>
              <Heart />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Usernav;
