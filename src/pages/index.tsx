import { useUser } from '@clerk/nextjs'
import { type NextPage } from 'next'
import { LoadingPage } from '~/components/loading'
import { PageLayout } from '~/components/layout'
import { PostView } from '~/components/postview'
import { api } from '~/utils/api'
import Container from '~/components/container'
import { CreatePostWizard } from '~/components/wizard'
import { BiMessageAltError } from 'react-icons/bi'

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery()

  if (postsLoading) return <LoadingPage />

  if (!data)
    return (
      <Container>
        <div className="mt-10 flex flex-col items-center gap-2 p-0 text-lg font-bold">
          <BiMessageAltError className="text-6xl " />
          Something went wrong
        </div>
      </Container>
    )

  return (
    <Container className="flex flex-col gap-4 p-0">
      {data?.map(fullPost => {
        return <PostView {...fullPost} key={fullPost.post.id} />
      })}
    </Container>
  )
}

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser()

  // start fetching asap
  api.posts.getAll.useQuery

  if (!userLoaded) return <div />

  return (
    <PageLayout>
      <div>{!!isSignedIn && <CreatePostWizard />}</div>
      <Feed />
    </PageLayout>
  )
}

export default Home
