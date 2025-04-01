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
import { KeyIcon, SendIcon, User2Icon, UserPlus2Icon } from "lucide-react"
import { Separator } from "../ui/separator"
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
import { useModalStateContext } from '@/lib/context/modal-state'
import { cn } from '@/lib/utils'

interface Props {
    children?: React.ReactNode
    hidden?: boolean
}

const authRegisterFormSchema = z.object({
    email: z.string().email().min(1, "Email address is required.").trim(),
    password: z.string().min(1, "Password is required").trim(),
    confirmPassword: z.string().min(1, "Password Confirmation is required").trim(),
})

type AuthRegisterFormSchemaType = z.infer<typeof authRegisterFormSchema>

export function AuthRegistrationDialog({ children, hidden = false }: Props) {
    const { state, dispatch } = useModalStateContext()
    const open = state.authDialog.registrationDialog
    const setOpen = () => dispatch.authDialog({
        type: open ? "CLOSE_REGISTRATION" : "OPEN_REGISTRATION"
    })
    
    const form = useForm<AuthRegisterFormSchemaType>({
        resolver: zodResolver(authRegisterFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (data: AuthRegisterFormSchemaType) => {
        if (data.password !== data.confirmPassword) {
            form.setError('password', {
                message: "Password and Confirm Password does not match."
            })
            form.setError('confirmPassword', {
                message: "Password and Confirm Password does not match."
            })

            return
        }


        toast.error(`${data.email}, ${data.password}`)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ?? (
                    <Button variant="outline" size="sm" className={cn("rounded-full space-x-2 !px-6 py-5", {
                        "hidden": hidden
                    })}>
                        <UserPlus2Icon className='text-neutral-400'/>
                        <span>Register</span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex flex-row gap-2">
                    <div className="border rounded p-2">
                        <UserPlus2Icon className="w-8 h-8 min-w-fit" />
                    </div>
                    <div className="flex flex-col justify-center gap-x-2">
                    <DialogTitle>Create an account</DialogTitle>
                    <DialogDescription>
                        Please the required field below to create an account.
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
                                    You will use this email address to login and receive information on your purchases.
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
                                    Password should be at least 8 characters long.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Please re-enter your password" {...field} type='password' />
                                </FormControl>
                                <FormDescription>
                                    Confirm your password
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
                            <Button type="submit" className='ml-auto hover:cursor-pointer'>
                                <SendIcon />
                                <span>Create Account</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}