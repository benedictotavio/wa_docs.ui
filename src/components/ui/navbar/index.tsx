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
      <div className="d-flex flex-row gap-2">
        <p className="mx-2">
          <strong>Usuário</strong>
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
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
