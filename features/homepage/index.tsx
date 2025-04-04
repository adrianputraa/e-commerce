import HomepageCarousel from "@/components/ecommerce/carousel";
import { dummyProductList } from "@/components/ecommerce/product/constant/dummy";
import { ProductListHorizontal } from "@/components/ecommerce/product/group";

interface Props {
    data: typeof dummyProductList
}

export default function HomepagePage({ data }: Props) {
    return (
        <section id="product_list">
            <div className="container mx-auto">
                <HomepageCarousel />
                <ProductListHorizontal data={data} />
            </div>
        </section>
    )
}