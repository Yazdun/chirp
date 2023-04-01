import { SignOutButton, SignInButton, useUser } from '@clerk/nextjs'
import React from 'react'
import Container from './container'
import { ThemeToggle } from './theme'
import { IoMdPower } from 'react-icons/io'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { BsGithub } from 'react-icons/bs'
import Link from 'next/link'

export const Navigation = () => {
  const { theme } = useTheme()
  const { isSignedIn } = useUser()
  return (
    <div className="p-4">
      <Container
        as="nav"
        className="flex h-[2.8rem] items-center justify-between"
      >
        <Link href="/">
          <Image
            src={theme === 'dark' ? '/logo.svg' : '/logo.svg'}
            width={80}
            height={100}
            alt="chirp+"
          />
        </Link>
        <div className="flex gap-2">
          {!isSignedIn ? (
            <SignInButton>
              <button className="flex  items-center gap-2 rounded-lg  bg-blue-600 px-4 py-2 font-semibold text-white transition-colors md:hover:bg-blue-700">
                <BsGithub className="mt-[0.07rem" />
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
