import { useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import SignIn from 'components/Auth/SigninForm';
import PageLAyout from 'components/Templates/PageLayout';
import clientFetch from 'lib/client-fetch';

const Home = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    clientFetch('tasks', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${session.user.token}`,
      },
    })
      .then((data) => console.table(data.tasks))
      .catch((error) => console.log('Error:', error));
  }, []);
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
