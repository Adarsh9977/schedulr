'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'AccessDenied':
        return 'Access denied. Please check your credentials and try again.'
      case 'CredentialsSignin':
        return 'Invalid email or password. Please try again.'
      case 'EmailSignin':
        return 'Error sending login email. Please try again.'
      case 'Configuration':
        return 'There was a problem with the server configuration.'
      case 'Verification':
        return 'The verification link has expired or has already been used.'
      default:
        return 'An error occurred during authentication. Please try again.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Authentication Error
          </h2>
          <p className="text-gray-600 mb-6">
            {getErrorMessage(error)}
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signin"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Sign In
            </Link>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}