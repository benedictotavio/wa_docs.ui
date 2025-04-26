import { NavLink } from "react-router-dom";
import Button from "../../../design/button/Button";
import Dropdown from "../../../design/dropdown/Dropdown";
import HtmlIcon from "../../../design/icon/htmlIcon/HtmlIcon";
import List from "../../../design/list/List";
import ListItem from "../../../design/list/ListItem";
import Modal from "../../../design/modal/Modal";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/auth/auth.context";
import { TeamContext } from "../../../context/team/team.context";
import { Team } from "../../../interfaces/team.interface";
import CreateNewTeamForm from "../../feature/Team/createNewTeamForm";

const UserProfileMenuProps: React.FC = () => {
  const [isTeamPanelOpen, setIsTeamPanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const { teams, changeActualTeam } = useContext(TeamContext);
  const { logout } = useContext(AuthContext);

  const changeTeam = (team: Team) => {
    changeActualTeam(team);
  };

  // TODO: Move it to Dropdown component
  const toggleDropdown = () => {
    setIsTeamPanelOpen((prev) => !prev);
  };

  return (
    <menu type="menu">
      <List direction="row" gap={1}>
        <ListItem>
          <div className="d-flex flex-column text-right">
            {user?.username}
            <span>cargo</span>
            {/* // TODO: add cargo */}
          </div>
          <Dropdown
            trigger={
              <Button
                className="btn btn-primary px-2 py-0"
                onClick={toggleDropdown}
                isTransparent
              >
                <HtmlIcon
                  className="px-2 py-2"
                  hex="&#x2659;"
                  border
                  borderRadius={5}
                  lineHeight={2}
                />
              </Button>
            }
            right={15}
            isDropdownOpen={isTeamPanelOpen}
            setIsDropdownOpen={setIsTeamPanelOpen}
          >
            <List direction="column" gap={1}>
              <ListItem>
                <NavLink to="/me">Minha conta</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/settings">Configurações</NavLink>
              </ListItem>
              {teams.length > 0 ? (
                <List direction="column" gap={0}>
                  <ListItem>Equipes</ListItem>
                  <ListItem>
                    <List direction="column" gap={1}>
                      {teams?.map((team, index) => (
                        <ListItem
                          key={team.team_id ? team.team_id + index : index}
                        >
                          <Button onClick={() => changeTeam(team)}>
                            {team.name}
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                  <ListItem className="d-flex justify-content-between">
                    <button onClick={() => setIsModalOpen(!isModalOpen)}>
                      <HtmlIcon hex="&oplus;" />
                      Criar equipe
                    </button>
                  </ListItem>
                </List>
              ) : (
                <ListItem>
                  <Button onClick={() => setIsModalOpen(!isModalOpen)}>
                    <HtmlIcon hex="&oplus;" />
                    Criar equipe
                  </Button>
                </ListItem>
              )}
              <div className="divider"></div>
              <ListItem>
                <Button onClick={logout}>Sair</Button>
              </ListItem>
            </List>
          </Dropdown>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isCenter
          >
            <CreateNewTeamForm />
          </Modal>
        </ListItem>
      </List>
    </menu>
  );
};

export default UserProfileMenuProps;
