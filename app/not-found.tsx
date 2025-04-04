import DefaultLayout from "@/components/layout/default";
import { Button } from "@/components/ui/button";
import { HouseIcon } from "lucide-react";
import Link from "next/link";


export default async function NotFound() {
    return (
        <DefaultLayout>
            <section className="container min-h-[calc(100dvh-6rem)] mx-auto flex flex-col items-center justify-center gap-2">
                <h4 className="font-bold text-4xl">Page not found</h4>
                <p>The page you are trying to access cannot be found.</p>

                <Link href="/">
                    <Button>
                        <HouseIcon />
                        <span>Back to Home</span>
                    </Button>
                </Link>
            </section>
        </DefaultLayout>
    )
}