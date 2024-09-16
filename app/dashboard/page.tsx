import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { checkUserSupabaseConnection } from "@/data/user"
import { NotConnected } from "@/components/dashboard/NotConnected"
import { Dashboard } from "@/components/dashboard/Dashboard"

export default async function DashboardPage() {
  const session = await auth()
  const user = session?.user

  if (!user?.id) {
    redirect("/login")
  }

  const isUserSupabaseConnected = await checkUserSupabaseConnection(user.id)

  if (!isUserSupabaseConnected.status) { return (<NotConnected />) }

  return (
    <div className="min-h-screen h-full w-screen flex flex-col justify-center items-center"><Dashboard userId={user.id} /></div>
  )
}
