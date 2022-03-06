import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import Auth from 'components/Auth';

import 'styles/main.scss';

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <Auth>
      <Component {...pageProps} />
    </Auth>
    <ToastContainer />
  </SessionProvider>
);

App.propTypes = {
  pageProps: PropTypes.shape({
    session: PropTypes.shape({}),
  }).isRequired,
  Component: PropTypes.elementType.isRequired,
};

export default App;
