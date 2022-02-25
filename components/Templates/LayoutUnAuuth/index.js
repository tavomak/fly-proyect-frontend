import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = ({ title, description, children }) => (
  <>
    <Head>
      <title>{`${title ? `${title} | ` : ''} FlyProject By EED`}</title>
      <meta
        name="description"
        content={`${description ? `${description} | ` : ''} FlyProject By EED'`}
      />
    </Head>
    <div className="container-fluid bg-ligth-grey">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-6 col-md-3">
          {children}
        </div>
      </div>
    </div>
  </>
);

Layout.defaultProps = {
  title: '',
  description: '',
};

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Layout;
