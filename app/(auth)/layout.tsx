import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen  flex items-center justify-center drop-shadow-lg">
      {children}
    </div>
  )
} 
