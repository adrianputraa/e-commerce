'use client'
import Link from "next/link"
import { LogInIcon, SearchIcon, ShoppingCart, User2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import * as z from "zod"
import { useState } from "react"
import { toast } from "sonner"
import { ThemeToggle } from "./theme"
import { cn } from "@/lib/utils"
import { AuthDialog } from "../modal/auth"
import { useModalStateContext } from "@/lib/context/modal-state"



export default function DefaultNavbar() {
    return (
        <nav className="w-full p-2 border-b">
            <div className="container mx-auto">
                <div className="w-full flex items-center justify-center gap-x-8">
                    <NavbarBrand />
                    <NavbarMenu />
                    <NavbarUser />
                </div>
            </div>
        </nav>
    )
}


function NavbarBrand() {
    return (
        <Link href='/' className="inline-flex gap-x-2" passHref>
            <ShoppingCart />
            <span className="font-bold text-lg">Ecommerce</span>
        </Link>
    )
}

const navbarSearchFormSchema = z.object({
    query: z.string(),
})

type NavbarSearchFormSchemaType = z.infer<typeof navbarSearchFormSchema>

function NavbarMenu() {
    const [searchResult, setSearchResult] = useState<any[]>([])
    const form = useForm<NavbarSearchFormSchemaType>({
        resolver: zodResolver(navbarSearchFormSchema),
        defaultValues: {
            query: ''
        }
    })

    const onSubmit = (data: NavbarSearchFormSchemaType) => {
        toast.info(`Query: ${data.query}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-0">
            <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                <FormItem className="w-full max-w-lg">
                    <FormControl>
                        <Input 
                            {...field} 
                            placeholder="Search item..." 
                            className={cn(
                                "!text-lg !py-5",
                                "rounded-xl rounded-r-none border-r-0", 
                                "dark:border-neutral-700 dark:bg-neutral-900", 
                                "focus:!outline-none focus:!ring-0")
                            }

                        />
                    </FormControl>
                </FormItem>
                )}
            />
            <Button 
                type="submit" 
                variant="ghost" 
                className={cn(
                    "py-5",
                    "rounded-xl rounded-l-none border border-l-0", 
                    "dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-700",
                    "hover:cursor-pointer"
                )}
            >
                <SearchIcon />
            </Button>
            </form>
        </Form>
    )
}

function NavbarUser() {
    const { state, dispatch } = useModalStateContext()
    const isAuthenticated = false
    const handleClick = () => {
        if (!isAuthenticated) {
            const loginModalState = state.authDialog.loginDialog
            dispatch.authDialog({
                type: "CLOSE_ALL"
            })

            dispatch.authDialog({
                type: loginModalState ? "CLOSE_LOGIN" : "OPEN_LOGIN"
            })

            return
        }

        /** opens user menu when authenticated */
    }

    return (
        <div className="inline-flex items-center gap-2">
            <Button variant="outline" size="sm" className={cn("rounded-full space-x-2 !px-6 py-5", "hover:cursor-pointer")} onClick={handleClick}>
                <LogInIcon className='text-neutral-400'/>
                <span>Login</span>
            </Button>
            <ThemeToggle />
        </div>
    )
}