'use client'

import { Button } from "@/components/ui/button"
import axios from "axios"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react"

export function ConnectGithub() {
  const handleConnect = async() => {
    const res = await axios.post('/api/auth/github/link')
    if (res.status === 200) {
      console.log(res.data)
    }
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