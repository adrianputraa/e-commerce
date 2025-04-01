import { ProductDetailType } from "@/lib/type/product";
import { ImageIcon } from "lucide-react";
import Link from "next/link";
import { formatValueToCurrency } from "@/lib/helper/currency";
import { cn } from "@/lib/utils";

interface Props {
    data: ProductDetailType[]
}

export function ProductListHorizontal({ data }: Props) {
    const slicedData = data.slice(20, data.length)
    
    return (
        <div className="p-8 space-y-4">
            <div className="inline-flex items-center gap-4">
                <h4 className="font-bold text-2xl text-neutral-400">
                    Product List
                </h4>
                <Link href='/product/view-more' className="font-bold text-sm hover:underline hover:text-blue-400 transition-colors duration-150">
                    View more
                </Link>
            </div>
            
            <div className={cn(
                "flex flex-col md:flex-row md:flex-wrap items-center gap-2",
                ""
            )}>
                {slicedData.map((item, i) => (
                    <Link key={i} href={`/product/${item.id}`} className="w-full md:w-fit">
                        <div className="w-full md:w-42 md:h-64 flex flex-col border rounded-lg">
                            <div id="product_thumbnail" className="w-full min-h-42 flex justify-center items-center bg-neutral-200 dark:bg-neutral-900 rounded-t-lg border-b">
                                <ImageIcon className="w-8 h-8 text-neutral-400 dark:text-neutral-800 mx-auto"/>
                            </div>
                            <div id="product_detail" className="w-full h-full flex flex-col p-2">
                                <h6 className="font-medium text-sm truncate">{item.name}</h6>
                                {item.category.map((cat, ci) => (
                                    <p key={ci} className="font-medium text-xs text-neutral-400 dark:text-neutral-600">
                                        {cat.label}
                                    </p>
                                ))}
                                <p className="mt-auto font-medium text-neutral-600 dark:text-neutral-400 text-sm">
                                    {formatValueToCurrency(item.price, "IDR")}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}