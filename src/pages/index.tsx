import { SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { SignInButton } from "@clerk/nextjs";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();

  const { data } = api.posts.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-10">
        <div>
          <div>{!user.isSignedIn && <SignInButton />}</div>
          <div>{!!user.isSignedIn && <SignOutButton />}</div>
        </div>

        <div>
          {data?.map((post) => {
            return <div key={post.id}>{post.content}</div>;
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
