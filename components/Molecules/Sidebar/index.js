import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FcOrganization, FcTimeline, FcFlowChart, FcHome,
} from 'react-icons/fc';
import { FiChevronRight, FiChevronLeft, FiChevronDown } from 'react-icons/fi';
import LogOutButton from 'components/Atoms/Auth/LogoutButton';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Sidebar = ({ className, activeNavbar, setActiveNavbar }) => {
  const Links = [
    {
      name: 'Home',
      active: true,
      route: '/',
      img: <FcHome />,
    },
    {
      name: 'Cuentas',
      active: true,
      img: <FcOrganization />,
      childrenActive: false,
      children: [
        {
          name: 'Listado de Cuentas',
          route: '/cuentas',
        },
        {
          name: 'Crear cuenta',
          route: '/cuentas/crear-cuenta',
        },
      ],
    },
    {
      name: 'Proyectos',
      active: true,
      img: <FcFlowChart />,
      childrenActive: false,
      children: [
        {
          name: 'Listado de Proyectos',
          route: '/proyectos',
        },
        {
          name: 'Crear Proyecto',
          route: '/proyectos/crear-proyecto',
        },
      ],
    },
    {
      name: 'Tareas',
      active: true,
      img: <FcTimeline />,
      childrenActive: false,
      children: [
        {
          name: 'Listado de Tareas',
          route: '/proyectos',
        },
        {
          name: 'Crear Tarea',
          route: '/tareas/crear-tarea',
        },
      ],
    },
  ];

  const [currentLinks, setCurrentLinks] = useState(Links);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    setCurrentLinks(Links);
    setActiveNavbar(!activeNavbar);
  };

  const handleClickItem = (e, key, itemRoute) => {
    e.preventDefault();
    if (itemRoute) {
      router.push(itemRoute);
    }
    const newArray = currentLinks;
    if (activeNavbar) {
      newArray[key] = {
        ...newArray[key],
        childrenActive: !newArray[key].childrenActive,
      };
      setCurrentLinks([...newArray]);
    }
  };

  const handleHoverItem = (e, key) => {
    if (!activeNavbar) {
      const newArray = currentLinks;
      newArray[key] = {
        ...newArray[key],
        childrenActive: true,
      };
      setCurrentLinks([...newArray]);
    }
  };

  const handleLeaveItem = () => {
    if (!activeNavbar) {
      setCurrentLinks(Links);
    }
  };

  return (
    <aside className={`${className}`}>
      <nav className={`${styles.navigation} ${activeNavbar ? styles.navigationOpen : styles.navigationClose}`}>

        <a href="!#" onClick={handleClick} className={`${styles.navigationToggle} `}>
          <span className={styles.navigationToggleSymbol}>
            {activeNavbar ? (
              <FiChevronLeft />
            ) : (
              <FiChevronRight />
            )}
          </span>
        </a>

        <div className="text-center my-lg-4 pb-lg-4">
          <Link href="/">
            <a href="!#">
              <Image
                src="/logoWeb.svg"
                alt="FlyProject"
                width="90"
                height="90"
              />
            </a>
          </Link>
        </div>

        <ul className={`${styles.navigationList} ${activeNavbar ? styles.innerMenu : ''}`}>
          {currentLinks.map((item, key) => (
            <li
              className="my-lg-5"
              key={item.name}
              onMouseLeave={(e) => handleLeaveItem(e)}
            >
              <a
                href="!#"
                onClick={(e) => handleClickItem(e, key, item.route)}
                onMouseEnter={(e) => handleHoverItem(e, key)}
              >
                <ul className={`w-100 ${styles.navigationListItem} px-2 ${!activeNavbar ? 'justify-content-center' : ''}`}>

                  <li className="fs-1 mx-2 mx-lg-0">
                    <span>
                      {item.img}
                    </span>
                  </li>

                  {activeNavbar && (
                    <li className="d-none d-lg-block ms-lg-4">
                      <p className="mb-0">
                        <span className="fs-4">{item.name}</span>
                      </p>
                    </li>
                  )}

                  {activeNavbar && item.children?.length > 0 && (
                    <li className={`d-none d-lg-block ${item.childrenActive ? styles.rotateIcon : styles.normalIcon} ms-lg-auto`}>
                      <FiChevronDown />
                    </li>
                  )}

                </ul>
              </a>

              {item.children?.length > 0 && item.childrenActive && (
                <ul
                  className={`${activeNavbar ? styles.subListOpen : styles.subListClose}`}
                >
                  {item.children.map((subItem) => (
                    <li className="py-2" key={subItem.route}>
                      <Link href={`${subItem.route}`}>
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

            </li>
          ))}
        </ul>

        <div className={`${styles.logOutButton}`}>
          <LogOutButton activeNavbar={activeNavbar} />
        </div>

      </nav>
    </aside>
  );
};

Sidebar.defaultProps = {
  className: '',
  setActiveNavbar: () => {},
};

Sidebar.propTypes = {
  activeNavbar: PropTypes.bool.isRequired,
  className: PropTypes.string,
  setActiveNavbar: PropTypes.func,
};

export default Sidebar;
