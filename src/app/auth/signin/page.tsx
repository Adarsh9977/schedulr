import SignInForm from '@/components/auth/SignInForm'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  if(session) {
    redirect('/dashboard')
  }

  return (
    <SignInForm />
  )
}
