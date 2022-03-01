import PropTypes from 'prop-types';
// import styles from './styles.module.scss';

const Header = ({ className, activeNavbar, setActiveNavbar }) => {
  return (
    <header className={`${className} px-5`}>
    </header>
  );
};

Header.defaultProps = {
  className: '',
  setActiveNavbar: () => { },
};

Header.propTypes = {
  activeNavbar: PropTypes.bool.isRequired,
  className: PropTypes.string,
  setActiveNavbar: PropTypes.func,
};

export default Header;
