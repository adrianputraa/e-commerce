'use client'
import { Badge } from "@/components/ui/badge"
import { formatValueToCurrency } from "@/lib/helper/currency"
import { ProductDetailType } from "@/lib/type/product"
import { ImageIcon, PlusCircleIcon, StarIcon } from "lucide-react"
import { startCase } from "lodash-es"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useModalStateContext } from "@/lib/context/modal-state"

interface Props {
    data: ProductDetailType
}

export function ProductDetailPage({ data }: Props) {
    const { state, dispatch } = useModalStateContext()
    const addToCart = () => {
        toast.success("Added to cart")
    }

    return (
        <div className="p-4">
            <div className="w-full lg:w-fit flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="flex flex-col gap-2">
                    <div className="aspect-square w-full lg:w-52 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 lg:p-4">
                        <ImageIcon className="text-neutral-400 w-16 h-16"/>
                    </div>

                    <div className="flex lg:grid lg:grid-cols-3 gap-2">
                        <div className="w-16 h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                            <ImageIcon className="text-neutral-400 w-16 h-16"/>
                        </div>
                        <div className="w-16 h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                            <ImageIcon className="text-neutral-400 w-16 h-16"/>
                        </div>
                        <div className="w-16 h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                            <ImageIcon className="text-neutral-400 w-16 h-16"/>
                        </div>
                        <div className="w-16 h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                            <ImageIcon className="text-neutral-400 w-16 h-16"/>
                        </div>
                        <div className="w-16 h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                            <ImageIcon className="text-neutral-400 w-16 h-16"/>
                        </div>
                        <div className="w-16 h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                            <ImageIcon className="text-neutral-400 w-16 h-16"/>
                        </div>
                    </div>

                    <Button className="rounded-lg py-6 mt-4 hover:cursor-pointer" onClick={() => {
                        dispatch.authDialog({
                            type: "OPEN_LOGIN",
                        })
                    }}>
                        <PlusCircleIcon className="w-4 h-4"/>
                        <span>Login to add to card</span>
                    </Button>
                </div>

                <div className="flex-1 flex flex-col max-w-xl">
                    <h2 className="font-bold text-4xl">
                        {data.name}
                    </h2>

                    <p className="font-medium text-2xl text-neutral-400">
                        {formatValueToCurrency(data.price)}
                    </p>

                    <div>
                        {data.category.map((category, index) => (
                            <Badge
                                key={index}
                                className="mr-2 mt-2"
                            >
                                {startCase(category.label)}
                            </Badge>
                        ))}
                    </div>

                    <Separator className="my-4"/>
                        
                    <div>
                        <span className="font-medium">Description</span>
                        <p className="mt-4">
                            {data.description ?? 
                                <i className="text-neutral-500">
                                    No description provided.
                                </i>
                            }
                        </p>
                    </div>

                    <Separator className="my-4"/>

                    <div>
                        <span className="font-medium">Reviews</span>
                        <div className="flex flex-col gap-4 mt-4">
                            {Array.from({ length: 5 }, (_, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-900 flex items-center justify-center">
                                        <ImageIcon className="text-neutral-400 w-4 h-4"/>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="font-bold">John Doe</span>
                                        <p className="text-sm text-neutral-500">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        </p>

                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: Math.floor(Math.random() * 5) }, (_, starIndex) => (
                                                <StarIcon 
                                                    key={starIndex} 
                                                    fill="yellow" 
                                                    className="text-yellow-400 w-4 h-4"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}