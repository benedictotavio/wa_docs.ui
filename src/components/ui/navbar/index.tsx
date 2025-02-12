import styles from "./index.module.css";
import { useState } from "react";
import List from "../lists/list";
import { NavLink } from "react-router-dom";
import Dropdown from "../../../design/dropdown/dropdown";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const userProfile = () => {
    return (
      <div className="d-flex justify-content-between">
        <div className={styles.user_profile}>
          <span>
            Username
          </span>
          <span>
            cargo
          </span>
        </div>

        <div className="fs-2 mx-3 d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"></path>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <nav className={styles.navbar}>
      <div>
        <h3>
          Team 01
        </h3>
        <p>
          loorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <menu type="toolbar" className={styles.menu}>
        <div>
          <List direction="row" gap={1.5}>
            <li>
              <Dropdown trigger={userProfile()} right={15}>
                <List direction="column" gap={1}>
                  <li>
                    <NavLink to="/me">Minha conta</NavLink>
                  </li>
                  <li>Configurações</li>
                  <li>Equipes</li>
                  <li>
                    <ul className="list-group">
                      <li className="list-group-item active">Cras justo odio</li>
                      <li className="list-group-item">Dapibus ac facilisis in</li>
                      <li className="list-group-item">Morbi leo risus</li>
                      <li className="list-group-item">Porta ac consectetur ac</li>
                      <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                  </li>
                  <li>-------------------</li>
                  <li>Sair</li>
                </List>
              </Dropdown>
            </li>
          </List>
        </div>
      </menu>

      <menu className={styles.menu_mobile}>
        {!isOpen ? (
          <button
            className={styles.menu_mobile_toggle_hamburguer}
            onClick={handleClick}
          >
            <i>&#9776;</i>
          </button>
        ) : (
          <>
            <button
              className={styles.menu_mobile_toggle_close}
              onClick={handleClick}
            >
              <i>&#10006;</i>
            </button>
            <div className={styles.menu_mobile_container}>
              <List
                direction="column"
                gap={1}
                isFloat
                positionX="right"
                positionY={5}
                margin={[0, 2, 0, 0]}
                selectable
              >
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
              </List>
            </div>
          </>
        )}
      </menu>
    </nav>
  );
};

export default Navbar;
