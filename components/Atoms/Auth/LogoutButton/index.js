import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { CSSTransition } from 'react-transition-group';
import Image from 'next/image';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const LogOutButton = ({ activeNavbar }) => {
  const { data: session } = useSession();
  const [toggleLogoutBtn, setToggleLogoutBtn] = useState(false);
  const handleClickLogOut = (e) => {
    e.preventDefault();
    signOut();
  };
  const handleClickToggle = (e) => {
    e.preventDefault();
    setToggleLogoutBtn(!toggleLogoutBtn);
  };

  return (
    <div className="w-100 position-relative px-2 mb-1">
      <a href="!#" className={`${styles.profileButton}`} onClick={handleClickToggle}>
        <ul className={`mb-0 mb-lg-4 d-lg-flex align-items-center ${activeNavbar ? 'justify-content-between' : 'justify-content-center'}`}>
          <li className="px-4 px-lg-0">
            <div
              className={`rounded-circle position-relative ${styles.userImage}`}
            >
              <Image
                src={`https://avatars.dicebear.com/api/croodles-neutral/${session.user.name}-${session.user.lastName}.svg`}
                width="40"
                height="40"
              />
            </div>
          </li>
          {activeNavbar && (
            <>
              <li className="d-none d-lg-block ">
                <p className="mb-0">
                  {session.user.name}
                  {' '}
                  {session.user.lastName}
                </p>
              </li>
              <li className="d-none d-lg-block ">
                <div
                  className="position-relative p-3"
                >
                  <FiMoreHorizontal />
                </div>
              </li>
            </>
          )}
        </ul>
      </a>
      <CSSTransition
        in={toggleLogoutBtn}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <a
          href="!#"
          onClick={handleClickLogOut}
          onMouseLeave={() => setToggleLogoutBtn(false)}
          className={`card p-4 text-center ${styles.logOutButton}`}
        >
          Cerrar sesión
        </a>
      </CSSTransition>
    </div>
  );
};

LogOutButton.propTypes = {
  activeNavbar: PropTypes.bool.isRequired,
};

export default LogOutButton;
