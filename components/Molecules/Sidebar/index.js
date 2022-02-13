import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Sidebar = ({ className, activeNavbar, setActiveNavbar }) => {
  const primaryLinks = [
    {
      name: 'Dashboard',
      active: true,
      route: '/',
    },
    {
      name: 'Órdenes',
      active: true,
      route: '/ordenes',
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
      name: 'Inventario',
      active: true,
      route: '/inventario',
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
      name: 'Incidencias',
      active: true,
      route: '/incidencias',
    },
  ];

  const [currentLinks, setCurrentLinks] = useState(primaryLinks);

  const handleClick = (e) => {
    e.preventDefault();
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
    e.preventDefault();
    if (!activeNavbar) {
      setCurrentLinks(links);
      const newArray = links;
      newArray[key] = {
        ...newArray[key],
        childrenActive: !newArray[key].childrenActive,
      };
      setCurrentLinks([...newArray]);
    }
  };
  const handleLeaveItem = () => {
    if (!activeNavbar) {
      setCurrentLinks(primaryLinks);
    }
  };
  return (
    <aside className={`${className} shadow bg-white  d-none d-lg-block`}>
      <nav
        className={`${styles.navigation} ${activeNavbar ? styles.navigationOpen : styles.navigationClose}`}
        onMouseLeave={() => handleLeaveItem()}
      >
        <a href="!#" onClick={handleClick} className={`${styles.navigationToggle}`}>
          <span className={styles.navigationToggleSymbol}>
            {activeNavbar ? (
              // <BxChevronLeft
              //   color="white"
              //   size="14"
              // />
              <p>Left</p>
            ) : (
              // <BxChevronRight
              //   color="white"
              //   size="14"
              // />
              <p>Right</p>
            )}
          </span>
        </a>
        <div>
          <div className="text-center my-4 pb-4 d-none d-lg-block">
            {/* <Link to="/">
              <img src={LogoBlue} alt="Blue express" width="62" />
            </Link> */}
          </div>
          <ul className="d-flex flex-column align-items-center my-4">
            <li>
              <ul className={`${activeNavbar ? styles.innerMenu : ''} whole`}>
                {currentLinks.map((item, key) => (
                  <li
                    className={`${item.active ? '' : 'd-none'} py-2 my-3`}
                    key={item.name}
                  >
                    <a
                      href="!#"
                      className="itemLi"
                      onClick={(e) => handleClickItem(e, key)}
                      onMouseEnter={(e) => handleHoverItem(e, key)}
                    >
                      <div className={`d-flex ${activeNavbar ? 'w-100' : ''}`}>
                        <div className={`${styles.navigationItemImg} me-2`}>
                          {/* <img src={item.img} alt={item.name} width="22" /> */}
                        </div>
                        <div className={`${styles.navigationItemText} ${activeNavbar ? '' : 'd-none'}`}>
                          <p className="ms-3 mt-1 mb-0 display-font" style={{ fontSize: 15 }}>
                            <b>
                              {item.children?.length > 0 ? (
                                <span>
                                  {item.name}
                                </span>
                              ) : (
                                <p>Link</p>
                              )}
                            </b>
                          </p>
                        </div>
                        {activeNavbar && item.children?.length > 0 && (
                          <div className={`ms-auto ${item.childrenActive ? styles.rotateIcon : styles.normalIcon}`}>
                            {/* <BxChevronRight
                              color="#ff7e44"
                              size="16"
                            /> */}
                            <p>Right</p>
                          </div>
                        )}
                      </div>
                    </a>
                    {item.children?.length > 0 && item.childrenActive && (
                      <ul className={`mb-2 ${activeNavbar ? styles.subListOpen : styles.subListClose}`}>
                        {item.children.map((subItem) => (
                          <li className="py-2" key={subItem.route}>
                            {/* <Link to={`${subItem.route}`}>
                              {subItem.name}
                            </Link> */}
                            link
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  activeNavbar: PropTypes.bool.isRequired,
};

export default Sidebar;
