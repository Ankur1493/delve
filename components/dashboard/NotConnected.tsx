"use client"

import { Button } from "../ui/button"
import { useRouter } from 'next/navigation'

export const NotConnected = () => {

  const router = useRouter()

  const onSupabaseConnect = async () => {
    router.push("api/supabase")
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl">Connect your supabase account here</h1>
      <Button onClick={onSupabaseConnect} variant="secondary">Connect</Button>
    </div>
  )
}
