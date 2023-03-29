import { SignOutButton, SignInButton, useUser } from '@clerk/nextjs'
import React from 'react'
import Container from './container'

export const Navigation = () => {
  const { isSignedIn } = useUser()
  return (
    <div className="p-4">
      <Container as="nav" className="flex items-center justify-between">
        Chirp
        {!isSignedIn ? (
          <SignInButton>
            <button className="rounded-lg bg-green-700 px-4 py-2">
              Sign In
            </button>
          </SignInButton>
        ) : (
          <SignOutButton>
            <button className="rounded-lg bg-red-700 px-4 py-2">
              Sign Out
            </button>
          </SignOutButton>
        )}
      </Container>
    </div>
  )
}
