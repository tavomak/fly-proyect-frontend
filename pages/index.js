import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import SignIn from 'components/Atoms/Auth/SigninForm';
import PageLAyout from 'components/Templates/PageLayout';

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <PageLAyout>
      <div>
        {!session && (
          <SignIn />
        )}
        {session && (
          <>
            Signed in as
            {' '}
            {session.user.email}
            {' '}
            {status}
            <br />
            <div>You can now access our super secret pages</div>
            <button type="button">
              <Link href="/test">To the secret</Link>
            </button>
            <button type="button" onClick={signOut}>sign out</button>
          </>
        )}
      </div>
    </PageLAyout>
  );
};

export default Home;
