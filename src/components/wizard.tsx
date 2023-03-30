import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'
import Container from '~/components/container'
import { GrSend } from 'react-icons/gr'
import { AnimatePresence, motion } from 'framer-motion'
import cn from 'classnames'

const framer_button = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { duration: 0.3 },
}

export const CreatePostWizard = () => {
  const { user } = useUser()
  const [input, setInput] = useState('')

  const ctx = api.useContext()

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput('')
      void ctx.posts.getAll.invalidate()
      toast.success("You've successfully chirped!")
    },

    onError: e => {
      const errorMessage = e.data?.zodError?.fieldErrors.content

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error('Failed to post! Please try again later.')
      }
    },
  })

  if (!user) return null

  return (
    <div className="fixed left-0 right-0 bottom-0 z-50 bg-light-100 dark:bg-black md:static md:mb-4">
      <Container className="flex items-center gap-3 border-t-2 p-4 transition-all focus-within:border-black dark:border-slate-700 dark:focus-within:border-white md:rounded-lg md:border-2">
        <Image
          src={user.profileImageUrl}
          alt="Profile Image"
          className="rounded-full"
          height={56}
          width={56}
        />
        <input
          type="text"
          placeholder="start chirping..."
          className="grow bg-transparent outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isPosting}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              if (input !== '') {
                mutate({ content: input })
              }
            }
          }}
        />

        <AnimatePresence initial={false} mode="wait">
          {input !== '' && (
            <motion.button
              {...framer_button}
              className={cn(
                'flex items-center justify-center rounded-full bg-green-400 p-4',
                isPosting && 'animate-pulse',
              )}
              onClick={() => mutate({ content: input })}
              disabled={isPosting}
            >
              <GrSend />
            </motion.button>
          )}
        </AnimatePresence>
      </Container>
    </div>
  )
}
