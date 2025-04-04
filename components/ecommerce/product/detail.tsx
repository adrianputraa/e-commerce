'use client'
import { Badge } from "@/components/ui/badge"
import { formatValueToCurrency } from "@/lib/helper/currency"
import { ProductDetailType } from "@/lib/type/product"
import { BookmarkIcon, ImageIcon, MessageCircleIcon, PlusCircleIcon, Share2Icon, SquarePenIcon, StarIcon } from "lucide-react"
import { startCase } from "lodash-es"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useModalStateContext } from "@/lib/context/modal-state"

interface Props {
    data: ProductDetailType
}

export function ProductDetail({ data }: Props) {
    const { state, dispatch } = useModalStateContext()

    const addToCart = () => {
        toast.success("Added to cart")
    }

    return (
        <div className="p-4">
            <div className="w-full lg:w-full flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <SideContent data={data} dispatch={dispatch} />
                <MainContent data={data} />
            </div>
        </div>
    )
}

function SideContent({ data, dispatch }) {

    const addToCart = () => {
        dispatch.authDialog({
            type: "OPEN_LOGIN",
        })
    }

    const addToBookmark = () => {
        dispatch.authDialog({
            type: "OPEN_LOGIN",
        })
    }

    const handleShare = () => {
        window.navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard")
    }

    return (
        <div className="min-w-fit flex flex-col gap-2">
            <div className="aspect-square w-full flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 lg:p-4">
                <ImageIcon className="text-neutral-400 w-16 h-16"/>
            </div>

            <div className="flex lg:grid lg:grid-cols-3 gap-2">
                <div className="w-full h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                    <ImageIcon className="text-neutral-400 w-8 h-16"/>
                </div>
                <div className="w-full h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                    <ImageIcon className="text-neutral-400 w-8 h-16"/>
                </div>
                <div className="w-full h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                    <ImageIcon className="text-neutral-400 w-8 h-16"/>
                </div>
                <div className="w-full h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                    <ImageIcon className="text-neutral-400 w-8 h-16"/>
                </div>
                <div className="w-full h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                    <ImageIcon className="text-neutral-400 w-8 h-16"/>
                </div>
                <div className="w-full h-16 flex items-center justify-center rounded border bg-neutral-200 dark:bg-neutral-900 p-4">
                    <ImageIcon className="text-neutral-400 w-8 h-16"/>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Button className="col-span-2 rounded-lg py-6 mt-4 hover:cursor-pointer" onClick={addToCart}>
                    <PlusCircleIcon className="w-4 h-4"/>
                    <span>Add to cart</span>
                </Button>

                <Button type="button" variant="default" onClick={addToBookmark}>
                    <BookmarkIcon className="w-4 h-4"/>
                    <span className="text-sm">Bookmark</span>
                </Button>

                <Button type='button' variant="default" onClick={handleShare}>
                    <Share2Icon className="w-4 h-4"/>
                    <span className="text-sm">Share</span>
                </Button>

                <Button type="button" variant="link">
                    <SquarePenIcon className="w-4 h-4"/>
                    <span className="text-sm">233 Reviews</span>
                </Button>
                <Button type="button" variant="link">
                    <MessageCircleIcon className="w-4 h-4"/>
                    <span className="text-sm">14 Questions</span>
                </Button>
            </div>
        </div>
    )
}

function MainContent({ data }) {
    return (
        <div className="w-full flex flex-col max-w-4xl">
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
                <span className="font-medium">
                    Questions
                </span>
                <div className="flex flex-col gap-4 mt-4">
                    {Array.from({ length: 2 }, (_, index) => {
                        const reviewRating = 5

                        return (
                        <div key={index} className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-900 flex items-center justify-center">
                                <ImageIcon className="text-neutral-400 w-4 h-4"/>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-bold">Jane Doe</span>
                                <p className="text-sm text-neutral-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>

                                <div className="flex items-center gap-1 mt-1">
                                    {reviewRating > 0 ? Array.from({ length: reviewRating }, (_, starIndex) => (
                                        <StarIcon 
                                            key={starIndex} 
                                            fill="yellow" 
                                            className="text-yellow-400 w-4 h-4"
                                        />
                                    )) : <span className="text-sm text-neutral-600 dark:text-neutral-400 italic">No rating given.</span>}
                                </div>
                            </div>
                            
                        </div>
                    )})}
                </div>
            </div>

            <Separator className="my-4"/>

            <div>
                <span className="font-medium">
                    Reviews
                </span>
                <div className="flex flex-col gap-4 mt-4">
                    {Array.from({ length: 5 }, (_, index) => (
                        <div key={index} className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-900 flex items-center justify-center">
                                <ImageIcon className="text-neutral-400 w-4 h-4"/>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-bold">John Doe</span>
                                <p className="text-sm text-neutral-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>

                                <div className="flex items-center gap-1 mt-1">
                                    {Array.from({ length: 5 }, (_, starIndex) => (
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
    )
}