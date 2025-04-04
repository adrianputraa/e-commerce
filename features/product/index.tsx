import { dummyProductList } from "@/components/ecommerce/product/constant/dummy";
import { ProductDetail } from "@/components/ecommerce/product/detail";

interface Props {
    data: typeof dummyProductList[0]
}

export default function ProductDetailPage({ data }: Props) {
    return (
        <section id="product_detail">
            <div className="container mx-auto">
                <ProductDetail data={data} />
            </div>
        </section>
    )
}