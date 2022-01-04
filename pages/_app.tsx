import "@assets/main.css";
import "keen-slider/keen-slider.min.css";
import type { AppProps } from "next/app";
import { FC } from "react";
import { UIProvider } from "@components/ui/context";
import { motion } from "framer-motion";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps,
  router,
}: AppProps & { Component: { Layout: FC } }) {
  const Layout = Component.Layout ?? Noop;
  return (
    <>
      <UIProvider>
        <Layout>
          <motion.div
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: {
                opacity: 0,
              },
              pageAnimate: {
                opacity: 1,
              },
            }}
          >
            <Component {...pageProps} />
          </motion.div>
        </Layout>
      </UIProvider>
    </>
  );
}

export default MyApp;
