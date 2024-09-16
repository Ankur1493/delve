"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { LoginSchema } from "@/schema"
import { useState, useTransition } from "react"

import { AuthWrapper } from "./AuthWrapper"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "./FormError"
import { login } from "@/actions/login"
import { useRouter } from "next/navigation"

export const LoginForm = ({ redirectTo }: { redirectTo: string }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const submitLogin = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    startTransition(() => {
      login(values)
        .then((data) => {
          if (!data?.error) {
            router.push(redirectTo)
          }
          setError(data?.error ?? "");
        })
    });
  }

  return (
    <AuthWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account" backButtonHref="/register">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitLogin)}
          className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input
                    className="bg-fuchsia-100 border-gray-400"
                    disabled={isPending}
                    {...field}
                    type="email"
                    placeholder="ankursharma1493@gmail.com" />
                  </FormControl>
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
                  <FormControl><Input
                    className="bg-fuchsia-100 border-gray-400"
                    disabled={isPending}
                    {...field}
                    type="password"
                    placeholder="*****" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <FormError message={error} />
          <Button disabled={isPending} type="submit" className="w-full bg-[#0C1B33] text-white text-[20px]" >
            Login
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  )
}
