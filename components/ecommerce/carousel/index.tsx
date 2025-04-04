import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

const carouselItems = [
    {
        id: 1,
        name: "banner_1",
        src: "/images/carousel/1.jpg",
        alt: "banner_1",
        title: "Item 1",
        description: "Description 1",
        url: "/product/1",
    },
    {
        id: 2,
        name: "banner_2",
        src: "/images/carousel/2.jpg",
        alt: "banner_2",
        title: "Item 2",
        description: "Description 2",
        url: "/product/2",
    },
    {
        id: 3,
        name: "banner_3",
        src: "/images/carousel/3.jpg",
        alt: "banner_3",
        title: "Item 3",
        description: "Description 3",
        url: "/product/3",
    },
    {
        id: 4,
        name: "banner_4",
        src: "/images/carousel/4.jpg",
        alt: "banner_4",
        title: "Item 4",
        description: "Description 4",
        url: "/product/4",
    },
    {
        id: 5,
        name: "banner_5",
        src: "/images/carousel/5.jpg",
        alt: "banner_5",
        title: "Item 5",
        description: "Description 5",
        url: "/product/5",
    }
]

export default function HomepageCarousel() {
    return (
        <Carousel>
            <CarouselContent className="aspect-[21/9]">
                {carouselItems.map((item) => (
                    <CarouselItem key={item.id}>
                        <Link href={item.url}>
                            <Image 
                                src={item.src} 
                                alt={item.alt} 
                                width={720}
                                height={480}
                                className="aspect-[21/9] w-full h-max object-cover rounded"    
                            />
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}