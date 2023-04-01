import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { api } from '~/utils/api'
import { generateSSGHelper } from '~/server/helpers/ssgHelper'
import { PageLayout } from '~/components/layout'
import Image from 'next/image'
import { PostView } from '~/components/postview'
import { LoadingPage } from '~/components/loading'
import Container from '~/components/container'
import { useState } from 'react'
import cn from 'classnames'

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  })

  if (isLoading) return <LoadingPage />

  if (!data || data.length === 0) return <div>User has not posted</div>

  return (
    <div className="mt-3 flex flex-col gap-3">
      {data.map(fullPost => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  )
}

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  })
  const [imageLoading, setImageLoading] = useState<boolean>(true)

  if (!data) return <div>404</div>

  return (
    <>
      <Head>
        <title>{data.username ?? data.externalUsername}</title>
      </Head>
      <PageLayout>
        <Container>
          <div className="relative h-36 rounded-lg bg-gradient-to-bl from-slate-200 dark:from-slate-800">
            <Image
              src="./chat.svg"
              alt={`${data.username ?? ''}'s profile pic`}
              width={100}
              height={100}
              className="absolute left-[8rem] top-10 ml-4"
            />
            <div
              className={cn(
                'absolute bottom-0 left-0 -mb-[64px] ml-4 h-[128px] min-w-[128px]  rounded-full bg-slate-200 dark:bg-slate-700',
                imageLoading && 'animate-pulse',
              )}
            >
              <Image
                src={data.profileImageUrl}
                alt={`${data.username ?? ''}'s profile pic`}
                width={128}
                height={128}
                className="rounded-full border-4 border-light-100 bg-light-100 dark:border-black dark:bg-black"
                onLoad={() => setImageLoading(false)}
              />
            </div>
          </div>
          <div className="ml-[8rem] p-4 text-2xl font-bold">{`@${
            data.username ?? ''
          }`}</div>
          <ProfileFeed userId={data.id} />
        </Container>
      </PageLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const ssg = generateSSGHelper()

  const slug = context.params?.slug

  if (typeof slug !== 'string') throw new Error('no slug')

  const username = slug.replace('@', '')

  await ssg.profile.getUserByUsername.prefetch({ username })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  }
}

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export default ProfilePage
