import PropTypes from 'prop-types';

const PageTitle = ({
  title,
  titleSize,
  subtitle,
  className,
  subtitleClassName,
  icon,
}) => {
  const finalSize = titleSize || '2rem';
  return (
    <div className={className}>
      <div className="d-flex align-items-center">
        <h1 className="display-font me-3" style={{ fontSize: finalSize, fontWeight: 700 }}>{title}</h1>
        {icon && icon}
      </div>
      {subtitle
          && <p style={{ fontSize: '16px' }} className={subtitleClassName}>{subtitle}</p>}
    </div>
  );
};

PageTitle.defaultProps = {
  title: '',
  titleSize: '',
  subtitle: '',
  subtitleClassName: '',
  className: '',
  icon: null,
};

PageTitle.propTypes = {
  title: PropTypes.string,
  titleSize: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleClassName: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.node,
};

export default PageTitle;
