import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FcOrganization, FcTimeline, FcFlowChart, FcHome,
} from 'react-icons/fc';
import { FiChevronRight, FiChevronLeft, FiChevronDown } from 'react-icons/fi';
import LogOutButton from 'components/Atoms/Auth/LogoutButton';

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
      route: '/ordenes',
      img: <FcOrganization />,
      childrenActive: false,
      children: [
        {
          name: 'Carga de Órdenes',
          route: '/ordenes/subir-ordenes',
        },
        {
          name: 'Listado de Órdenes',
          route: '/ordenes',
        },
      ],
    },
    {
      name: 'Proyectos',
      active: true,
      route: '/inventario',
      img: <FcFlowChart />,
      childrenActive: false,
      children: [
        {
          name: 'Listado de Inventario',
          route: '/inventario',
        },
        {
          name: 'Listado de Reposición',
          route: '/reposition',
        },
      ],
    },
    {
      name: 'Tareas',
      active: true,
      route: '/incidencias',
      img: <FcTimeline />,
    },
  ];

  const [currentLinks, setCurrentLinks] = useState(Links);

  const handleClick = (e) => {
    e.preventDefault();
    setCurrentLinks(Links);
    setActiveNavbar(!activeNavbar);
  };

  const handleClickItem = (e, key) => {
    e.preventDefault();
    const newArray = currentLinks;
    if (activeNavbar) {
      newArray[key] = {
        ...newArray[key],
        childrenActive: !newArray[key].childrenActive,
      };
      setCurrentLinks([...newArray]);
    } else {
      history.push(newArray[key].route);
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
      console.log('leave');
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

        <div className="text-center my-4 pb-4">
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

        <ul className={`${activeNavbar ? styles.innerMenu : ''}`}>
          {currentLinks.map((item, key) => (
            <li
              className="my-5"
              key={item.name}
            >
              <a
                href="!#"
                onClick={(e) => handleClickItem(e, key)}
                onMouseEnter={(e) => handleHoverItem(e, key)}
                onMouseLeave={(e) => handleLeaveItem(e)}
              >
                <ul className={`d-flex align-items-baseline px-2 ${!activeNavbar ? 'justify-content-center' : ''}`}>

                  <li className="fs-1">
                    {item.img}
                  </li>

                  {activeNavbar && (
                    <li className="ms-4">
                      <p className="mb-0 fs-4">
                        <span>{item.name}</span>
                      </p>
                    </li>
                  )}

                  {activeNavbar && item.children?.length > 0 && (
                    <li className={`${item.childrenActive ? styles.rotateIcon : styles.normalIcon} ms-auto`}>
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

        <div className="mt-auto">
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
