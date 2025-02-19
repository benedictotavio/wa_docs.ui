import styles from "./index.module.css";
import { useContext, useEffect, useState } from "react";
import List from "../lists/list";
import { NavLink } from "react-router-dom";
import Dropdown from "../../../design/dropdown/dropdown";
import { TeamContext } from "../../../context/team/team.context";
import { AuthContext } from "../../../context/auth/auth.context";
import TeamPanel from "../../feature/Team";
import { Team } from "../../../interfaces/team.interface";
import Modal from "../../../design/modal/Modal";
import Form from "../../../design/form/form";
import InputText from "../../../design/inputs/InputText/inputText";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");

  const { user } = useContext(AuthContext)
  const { teams, addTeam, changeActualTeam } = useContext(TeamContext)
  const { logout } = useContext(AuthContext)

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const userProfile = () => {
    return (
      <div className="d-flex justify-content-between">
        <div className={styles.user_profile}>
          <span>
            {user?.username}
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

  const [actualTeam, setActualTeam] = useState<Team>(teams[0]);

  useEffect(() => {
    setActualTeam(teams[0]);
  }, [teams]);

  const changeTeam = (team: Team) => {
    setActualTeam(team);
    changeActualTeam(team);
  };

  const createNewTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTeam({
      name: newTeamName,
      description: newTeamDescription,
      ownerId: user?.id,
    })
  };

  return (
    <nav className={styles.navbar}>

      <TeamPanel team={actualTeam} />

      <menu type="toolbar" className={styles.menu}>
        <div>
          <List direction="row" gap={1.5}>
            <li>
              <Dropdown trigger={userProfile()} right={15}>
                <List direction="column" gap={1} className="list-group bg-light pl-1 pr-5 py-3">
                  <li>
                    <NavLink to="/me">Minha conta</NavLink>
                  </li>
                  <li>Configurações</li>
                  {
                    teams.length > 0 ? (
                      <>
                        <li>Equipes</li>
                        <li>
                          <ul className="list-group">
                            {
                              teams?.map((team, index) => (
                                <li key={
                                  team.team_id ? team.team_id + index : index
                                } className="list-group-item">
                                  <button onClick={() => changeTeam(team)}>
                                    {team.name}
                                  </button>
                                </li>
                              ))
                            }
                          </ul>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <button onClick={() => setIsModalOpen(!isModalOpen)}>
                            Criar equipe
                          </button>
                        </li>
                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                          <Form onSubmit={createNewTeam}>
                            <InputText value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} placeholder="Nome da equipe" type={"text"} isRequired />
                            <InputText value={newTeamDescription} onChange={(e) => setNewTeamDescription(e.target.value)} placeholder="Descrição da equipe" type={"text"} isRequired />
                          </Form>
                        </Modal>
                      </>
                    )
                  }
                  <div className="divider"></div>
                  <li>
                    <button onClick={logout}>Sair</button>
                  </li>
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
