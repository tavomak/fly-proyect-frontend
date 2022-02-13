import { useState, useContext, useEffect } from 'react';
import Card from 'components/Molecules/Card';

import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const urlLogin = process.env.REACT_APP_LOGOUT_URL;

const Header = ({ className, activeNavbar, setActiveNavbar }) => {
  const [rememberShipedge, setRememberShipedge] = useState(true);
  const [logOutCard, setLogOutCart] = useState(false);
  const [notifyCard, setNotifyCart] = useState(false);
  const [responseSocket, setResponseSocket] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setActiveNavbar(!activeNavbar);
  };
  const handleClickUser = (e) => {
    e.preventDefault();
    if (notifyCard) {
      setNotifyCart(false);
    }
    setLogOutCart(!logOutCard);
  };
  const handleClickNotify = (e) => {
    e.preventDefault();
    if (logOutCard) {
      setLogOutCart(false);
    }
    if (responseSocket.length > 0) {
      setNotifyCart(!notifyCard);
    }
  };
  const handleClickRemember = () => {
    setRememberShipedge(!rememberShipedge);
  };
  const logOut = () => {
    console.log('logOut');
  };
  const signOut = (e) => {
  };

  return (
    <header className={`${className} ${styles.header}`}>
      <Card className={`${logOutCard ? '' : 'd-none'} ${styles.headerCard} shadow`} onMouseLeave={() => setLogOutCart(false)}>
        <ul className="text-center">
          <li>
          </li>
          <li>
            <p className="mb-0">
              <b>Bienvenido</b>
            </p>
          </li>
          <li>
            <a href="!#" onClick={signOut}>
              <span>
                Cerrar Sesión
              </span>
            </a>
          </li>
        </ul>
      </Card>
      {responseSocket.length > 0 && (
        <Card className={`${notifyCard ? '' : 'd-none'} ${styles.headerCard} shadow`} onMouseLeave={() => setNotifyCart(false)}>
          <ul>
            <li>
              <ul className="d-flex justify-content-between">
                <li className="me-4"><h5>Notificaciones</h5></li>
                <li className="">
                  <a href="#!" onClick={(e) => { e.preventDefault(); setResponseSocket([]); }}>
                    <small>Borrar todo</small>
                  </a>
                </li>
              </ul>
            </li>
            {responseSocket.length > 0 && responseSocket.map((item) => (
              <li key="id">
                <a href="#!" onClick={(e) => { e.preventDefault(); history.push(`/incidencia/${item.ticktId}`); }}>
                  El ticket
                  {' '}
                  {item.numTicket}
                  {' '}
                  cambió de estado a
                  {' '}
                  {item.statusDesc}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}
      <ul className="d-flex w-100 justify-content-end align-items-center my-2">
        <li className="px-4 d-none">
          <a href="!#" onClick={handleClick}>
          </a>
        </li>
        <li className="d-flex">
          <a href="#!" className={`position-relative me-4 pt-2 ${styles.headerNotifyLink}`} onClick={handleClickNotify}>
            {responseSocket.length > 0 && (
              <span className={styles.headerNotify}>
                <span className={styles.headerNotifyNumber}>{responseSocket.length}</span>
              </span>
            )}
          </a>
          <a href="!#" onClick={handleClickUser} className="d-flex pe-5">
            <p className="d-none">
              <br />
              <small>Fulfillment</small>
            </p>
          </a>
        </li>
      </ul>
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
