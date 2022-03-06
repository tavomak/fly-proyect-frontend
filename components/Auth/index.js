import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Signin from 'components/Auth/SigninForm';
import Spinner from 'components/Atoms/Spinner';
import LayouUnAuth from 'components/Templates/LayoutUnAuuth';
import Layout from 'components/Templates/Layout';

import PropTypes from 'prop-types';

const Auth = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const isUser = !!session?.user;
    if (isUser) {
      setAuthorized(true);
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="mainLoader">
        <Spinner />
      </div>
    );
  }

  if (authorized) {
    return (
      <Layout>
        {children}
      </Layout>
    );
  }

  return (
    <LayouUnAuth title="LogIn">
      <Signin />
    </LayouUnAuth>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
