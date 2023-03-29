import { SignOutButton, SignInButton, useUser } from '@clerk/nextjs'
import React from 'react'
import Container from './container'
import { ThemeToggle } from './theme'
import { IoMdPower } from 'react-icons/io'
import Image from 'next/image'
import LIGHT_LOGO from '~/assets/light.svg'
import { useTheme } from 'next-themes'

export const Navigation = () => {
  const { theme } = useTheme()
  const { isSignedIn } = useUser()
  return (
    <div className="p-4">
      <Container as="nav" className="flex items-center justify-between">
        <Image
          src={theme === 'dark' ? '/dark.svg' : '/light.svg'}
          width={100}
          height={100}
          alt="chirp+"
        />
        <div className="flex gap-2">
          {!isSignedIn ? (
            <SignInButton>
              <button className="flex items-center gap-1 rounded-lg  bg-blue-600 px-4 py-2 font-semibold text-white transition-colors md:hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
          ) : (
            <SignOutButton>
              <button className="flex items-center gap-1 rounded-lg  bg-red-600 px-4 py-2 font-semibold text-white transition-colors md:hover:bg-red-700">
                <IoMdPower className="mt-[0.07rem]" />
                Sign Out
              </button>
            </SignOutButton>
          )}
          <ThemeToggle />
        </div>
      </Container>
    </div>
  )
}
