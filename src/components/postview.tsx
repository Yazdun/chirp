import { api, RouterOutputs } from '~/utils/api'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { toast } from 'react-hot-toast'
import { useUser } from '@clerk/nextjs'
dayjs.extend(relativeTime)

type PostWithUser = RouterOutputs['posts']['getAll'][number]
export const PostView = (props: PostWithUser) => {
  const { post, author } = props
  const { user } = useUser()

  const ctx = api.useContext()

  const { mutate, isLoading } = api.posts.delete.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate()
    },

    onError: e => {
      const errorMessage = e.data?.zodError?.fieldErrors.content

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {
        toast.error('Failed to delete! Please try again later.')
      }
    },
  })

  return (
    <div className="flex gap-3 p-4 shadow-sm dark:bg-gray-900 dark:shadow-none md:rounded-lg">
      <Image
        src={author.profileImageUrl}
        alt={`@${author.username}`}
        className="h-14 w-14 rounded-full"
        height={56}
        width={56}
      />
      <div className="flex flex-col ">
        <div className="flex gap-2 dark:text-slate-300">
          <Link href={`/@${author.username}`} className="font-bold">
            <span>{`@${author.username}`}</span>{' '}
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="text-slate-600 dark:text-slate-400">{`· ${dayjs(
              post.createdAt,
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
      {author.id === user?.id && (
        <button onClick={() => mutate({ postId: post.id })}>delete</button>
      )}
    </div>
  )
}
