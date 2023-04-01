import type { RouterOutputs } from '~/utils/api'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Delete } from './delete'
import { useUser } from '@clerk/nextjs'
dayjs.extend(relativeTime)

type PostWithUser = RouterOutputs['posts']['getAll'][number]
export const PostView = (props: PostWithUser) => {
  const { post, author } = props

  const { user } = useUser()

  return (
    <div className="flex items-start justify-between p-4 shadow-sm dark:bg-gray-900 dark:shadow-none md:rounded-lg">
      <div className="flex gap-3">
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
          <Link href={`/post/${post.id}`} className="text-xl">
            {post.content}
          </Link>
        </div>
      </div>
      {user && (
        <div className="flex gap-1">
          {author.id === user?.id && <Delete {...props} />}
        </div>
      )}
    </div>
  )
}
