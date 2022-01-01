import { FC } from "react";
import s from "./Layout.module.css";
import { Footer, Navbar } from "@components/common";
import { Sidebar } from "@components/ui";
import { CartSidebar } from "@components/cart";
import { useUI } from "@components/ui/context";
import { ApiProvider } from "@framework";
import Usernav from "../Usernav";

const Layout: FC = ({ children }) => {
  const { isSidebarOpen, closeSidebar } = useUI();

  return (
    <ApiProvider>
      <div className={s.root}>
        <Usernav />
        {/* <Navbar /> */}
        <Sidebar onClose={closeSidebar} isOpen={isSidebarOpen}>
          <CartSidebar />
        </Sidebar>
        <main className="fit">{children}</main>
        <Footer />
      </div>
    </ApiProvider>
  );
};

export default Layout;
