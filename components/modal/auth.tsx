'use client'
import * as React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { KeyIcon, LogInIcon, User2Icon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import { AuthRegistrationDialog } from './register'
import { useModalStateContext } from '@/lib/context/modal-state'
import { cn } from '@/lib/utils'

const authLoginFormSchema = z.object({
    email: z.string().email().min(1, "Email address is required."),
    password: z.string().min(1, "Password is required")
})

type AuthLoginFormSchemaType = z.infer<typeof authLoginFormSchema>

interface Props {
    hidden?: boolean
}
export function AuthDialog({ hidden = false }: Props) {
    const { state, dispatch } = useModalStateContext()
    const open = state.authDialog.loginDialog
    const setOpen = () => dispatch.authDialog({
        type: open ? "CLOSE_LOGIN" : "OPEN_LOGIN"
    })

    const openRegistrationModal = () => {
        dispatch.authDialog({
            type: "CLOSE_LOGIN"
        })

        dispatch.authDialog({
            type: "OPEN_REGISTRATION"
        })
    }

    const form = useForm<AuthLoginFormSchemaType>({
        resolver: zodResolver(authLoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: AuthLoginFormSchemaType) => {
        toast.error(`${data.email}, ${data.password}`)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className={cn("rounded-full space-x-2 !px-6 py-5", {
                    "hidden": hidden
                })}>
                    <LogInIcon className='text-neutral-400'/>
                    <span>Login</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex flex-row gap-2">
                    <div className="border rounded p-2">
                        <KeyIcon className="w-8 h-8 min-w-fit" />
                    </div>
                    <div className="flex flex-col justify-center gap-x-2">
                    <DialogTitle>Login to E commerce</DialogTitle>
                    <DialogDescription>
                        Please enter your email address and password to login.
                    </DialogDescription>
                    </div>
                </DialogHeader>

                <Separator />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email addresss</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email address" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter your registered email address
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your password" {...field} type='password' />
                                </FormControl>
                                <FormDescription>
                                    Enter your password associated with your email.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Separator />

                        <div className='flex items-center'>
                            <Button type='button' variant='link' className='hover:cursor-pointer'>
                                <KeyIcon />
                                <span>Forget Password</span>
                            </Button>
                            <Button type='button' onClick={openRegistrationModal} variant='link' className='hover:cursor-pointer'>
                                <User2Icon />
                                <span>Create Account</span>
                            </Button>
                            <Button type="submit" className='ml-auto hover:cursor-pointer'>
                                <LogInIcon />
                                <span>Login</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}