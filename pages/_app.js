import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import Auth from 'components/Atoms/Auth';

import 'styles/main.scss'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
      <ToastContainer />
    </SessionProvider>
  )
}