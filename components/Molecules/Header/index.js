import PropTypes from 'prop-types';
// import styles from './styles.module.scss';

const Header = ({ className, activeNavbar, setActiveNavbar }) => {
  return (
    <header className={`${className}`}>
    </header>
  );
};

Header.defaultProps = {
  setActiveNavbar: () => { },
};

Header.propTypes = {
  activeNavbar: PropTypes.bool.isRequired,
  setActiveNavbar: PropTypes.func,
};

export default Header;
