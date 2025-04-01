import { dummyProductList } from "@/components/ecommerce/product/constant/dummy";
import { ProductDetailPage } from "@/components/ecommerce/product/detail";
import DefaultLayout from "@/components/layout/default";

interface Props {
    params: Promise<{ slug: string }>
}

export default async function ProductDetailRoute({ params }: Props) {
    const { slug } = await params
    const id = Number(slug)
    const data = dummyProductList.find((item) => item.id === id)

    if (!data) {
        return (
            <DefaultLayout>
                <section id="not_found">
                    <p>Not found</p>
                </section>
            </DefaultLayout>
        )
    }

    return (
        <DefaultLayout>
            <section id="product_detail">
                <div className="container mx-auto">
                    <ProductDetailPage data={data} />
                </div>
            </section>
        </DefaultLayout>
    )
}