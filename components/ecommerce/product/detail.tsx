import { ProductDetailType } from "@/lib/type/product"

interface Props {
    data: ProductDetailType
}

export function ProductDetailPage({ data }: Props) {
    return (
        <div>
            <p>{data.name}</p>
        </div>
    )
}