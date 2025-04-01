export type ProductDetailType = {
    id: number
    name: string
    description: string | null
    price: number
    category: ProductCategoryType[]
}

export type ProductCategoryType = {
    id: number
    label: string
    value: string
}