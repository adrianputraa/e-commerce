import { dummyProductList } from "@/components/ecommerce/product/constant/dummy";
import { ProductListHorizontal } from "@/components/ecommerce/product/group";
import DefaultLayout from "@/components/layout/default";

export default function Home() {
  const data = dummyProductList

  return (
    <DefaultLayout>
      <section id="product_list">
        <div className="container mx-auto">
          <ProductListHorizontal data={data} />
        </div>
      </section>
    </DefaultLayout>
  );
}
