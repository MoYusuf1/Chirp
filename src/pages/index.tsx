import { SignInButton, SignOutButton, SignUp, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

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
      <main className="flex h-screen justify-center">
        <div className="h-full w-full md:max-w-2xl border-x bg-slate-700"> 


        <div className="border-b border-slate-400 p-4">
        
        {!user.isSignedIn && <SignInButton />}{!!user.isSignedIn && <SignOutButton />}
        
 
        {data?.map((post) => (<div key={post.id} > {post.content} </div>))}






        </div>
        </div>
        
        
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </main>
    </>
  );
};

export default Home;
