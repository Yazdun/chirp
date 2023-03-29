import type { RouterOutputs } from '~/utils/api'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

type PostWithUser = RouterOutputs['posts']['getAll'][number]
export const PostView = (props: PostWithUser) => {
  const { post, author } = props
  return (
    <div className="flex gap-3 bg-gray-900 p-4 md:rounded-lg">
      <Image
        src={author.profileImageUrl}
        alt={`@${author.username}`}
        className="h-14 w-14 rounded-full"
        height={56}
        width={56}
      />
      <div className="flex flex-col ">
        <div className="flex gap-2 text-slate-300">
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username}`}</span>{' '}
          </Link>
          <Link href={`/post/${post.id}`}>
            <span className="text-slate-400">{`· ${dayjs(
              post.createdAt,
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  )
}
