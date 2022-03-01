import Head from 'next/head';

import PropTypes from 'prop-types';

const PageLayout = ({ title, description, children }) => (
  <>
    <Head>
      <title>{`${title ? `${title} | ` : ''} FlyProject By EED`}</title>
      <meta
        name="description"
        content={`${description ? `${description} | ` : ''} FlyProject By EED'`}
      />
    </Head>
    {children}
  </>
);

PageLayout.defaultProps = {
  title: '',
  description: '',
};

PageLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PageLayout;
