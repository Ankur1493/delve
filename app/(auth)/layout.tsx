import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen bg-[#e3d0d080] overflow-hidden flex items-center justify-center drop-shadow-lg">
      {children}
    </div>
  )
} 
