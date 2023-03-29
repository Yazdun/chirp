import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { LoadingSpinner } from '~/components/loading'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'
import Container from '~/components/container'

export const CreatePostWizard = () => {
  const { user } = useUser()
  const [input, setInput] = useState('')

  const ctx = api.useContext()

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput('')
      void ctx.posts.getAll.invalidate()
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
    <Container className="flex gap-3 p-4">
      <Image
        src={user.profileImageUrl}
        alt="Profile Image"
        className="rounded-full"
        height={56}
        width={56}
      />
      <input
        type="text"
        placeholder="type some emojis!"
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

      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}

      {input !== '' && (
        <button onClick={() => mutate({ content: input })} disabled={isPosting}>
          Post
        </button>
      )}
    </Container>
  )
}
