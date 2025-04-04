import { dummyProductList } from "@/components/ecommerce/product/constant/dummy";
import DefaultLayout from "@/components/layout/default";
import HomepagePage from "@/features/homepage";

export default function Home() {
  const data = dummyProductList

  return (
    <DefaultLayout>
      <HomepagePage data={data} />
    </DefaultLayout>
  );
}
