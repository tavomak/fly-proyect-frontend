import Head from "next/head";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import SignIn from '../components/Atoms/Auth/signin'

export default function Home() {
  const { data: session, status } = useSession()
  return (
    <div >
      <Head>
        <title>Auth Examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!session && (
          <SignIn/>
        )}
        {session && (
          <>
            Signed in as {session.user.email} <br />
            <div>You can now access our super secret pages</div>
            <button>
              <Link href="/secret">To the secret</Link>
            </button>
            <button onClick={signOut}>sign out</button>
          </>
        )}
      </main>
    </div>
  );
}