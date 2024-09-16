import { auth } from "@/auth"
import { checkUserSupabaseConnection } from "@/data/user"
import { redirect } from "next/navigation"
import { NotConnected } from "@/components/dashboard/NotConnected"

export default async function DashboardPage() {
  const session = await auth()
  const user = session?.user

  if (!user?.id) {
    redirect("/login")
  }

  const isUserSupabaseConnected = await checkUserSupabaseConnection(user.id)

  if (!isUserSupabaseConnected.status) { return (<NotConnected />) }

  return (
    <div>Dashboard</div>
  )
}
