'use client'

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"

export function ConnectGithub() {
  const handleConnect = () => {
    signIn('github', {
      callbackUrl: '/dashboard'
    })
  }

  return (
    <Button 
      onClick={handleConnect}
      className="flex items-center gap-2"
      variant="outline"
    >
      <Github className="h-5 w-5" />
      Connect with GitHub
    </Button>
  )
}