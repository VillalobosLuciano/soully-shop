import { Layout } from "@components/common";
import { getConfig } from "@framework/api/config";
import { getAllProductsPaths, getProduct } from "@framework/product";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { ProductView } from "@components/product";
import getAllProducts from "../../framework/shopify/product/get-all-products";

// fetch all of the products slugs
export const getStaticPaths: GetStaticPaths = async () => {
  const config = getConfig();
  const { products } = await getAllProductsPaths(config);

  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

// provide product data to the page
export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const config = getConfig();

  const { product } = await getProduct({
    config,
    variables: { slug: params?.slug },
  });

  const products = await getAllProducts(config);

  return {
    props: {
      product,
      products,
    },
  };
};

export default function ProductSlug({
  product,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>{product && <ProductView product={product} products={products} />}</>
  );
}

ProductSlug.Layout = Layout;
