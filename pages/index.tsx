import type { InferGetStaticPropsType } from "next";
import { getAllProducts } from "@framework/product";
import { getConfig } from "@framework/api/config";
import { Layout, Navbar } from "@components/common";
import { ProductCard } from "@components/product";
import { Grid, Hero, SectionTitle } from "@components/ui";

export async function getStaticProps() {
  const config = getConfig();
  const products = await getAllProducts(config);

  return {
    props: {
      products,
    },
    revalidate: 4 * 60 * 60,
  };
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="space-y-8">
        <Hero
          headline="The nut butter experience you've been looking for."
          description="Marshmallow tart jelly icing cotton candy tootsie roll cotton candy candy canes."
        />
        <SectionTitle
          headline="Simple Nut Butter"
          title="Only peanuts, cashews and almonds."
        />
        <div className="pb-8 mx-auto lg:pt-4 sm:pb-20">
          <Grid layout="B">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

Home.Layout = Layout;
