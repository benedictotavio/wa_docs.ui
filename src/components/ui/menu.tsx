import React, { useContext, useState } from "react";
import Modal from "../../design/modal/Modal";
import Form from "../../design/form/Form";
import InputText from "../../design/inputs/InputText/InputText";
import { ProjectContext } from "../../context/project/project.context";
import { AuthContext } from "../../context/auth/auth.context";
import { TeamContext } from "../../context/team/team.context";
import Dropdown from "../../design/dropdown/Dropdown";
import { FolderContext } from "../../context/folder/folder.context";
import HtmlIcon from "../../design/icon/htmlIcon/HtmlIcon";
import Button from "../../design/button/Button";
import image_logo_200 from "../../assets/logo_200w.png";
import image_logo_100 from "../../assets/logo_100w.png";
import image_logo_50 from "../../assets/logo_50w.png";
import Logo from "./logo";
import List from "../../design/list/List";
import ListItem from "../../design/list/ListItem";

interface MenuProps {
  children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ children }) => {
  const {
    addProject,
    projects,
    currentProject,
    changeCurrentProject,
    deleteProject,
  } = useContext(ProjectContext);
  const { user } = useContext(AuthContext);
  const { team } = useContext(TeamContext);
  const { createFolder } = useContext(FolderContext);
  
  const [openModal, setOpenModal] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // TODO: Move it to Dropdown component
  const toggleDropdown = () => {
    setIsProjectDropdownOpen((prev) => !prev);
  };

  const createProject = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      addProject({
        description: projectDescription,
        name: projectName,
        ownerId: user?.id,
        teamId: team?.id,
      });
      setOpenModal(false);
    } catch (error) {
      window.alert("Erro ao criar projeto" + error);
    }
  };

  const changeProject = (projectId: number) => {
    changeCurrentProject(projectId);
  };

  const handleClickCreateFolder = (e: React.MouseEvent) => {
    const newFolderName = prompt("Digite o nome da pasta");

    e.preventDefault();
    if (newFolderName) {
      createFolder({
        name: newFolderName,
        projectId: currentProject?.id ?? 0,
      })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleClickDeleteProject = (e: React.MouseEvent) => {
    e.preventDefault();
    const confirmDelete = window.prompt(
      `Digite "${currentProject?.name}" para confirmar a exclusão do projeto`
    );

    if (confirmDelete === currentProject?.name) {
      deleteProject(currentProject?.id ?? 0);
    }
  };

  return (
    <aside className="mt-5 px-0 mx-0 bg-transparent shadow-sm bg-none">
      <div className="d-flex flex-column align-items-center">
        <Logo
          imageSmall={image_logo_200}
          imageMedium={image_logo_100}
          imageLarge={image_logo_50}
          imageAlt="WA Docs Logo"
        />
      </div>

      <menu className="d-flex flex-column">
        <div className="row">
          <InputText
            type="text"
            className="form-control col-10"
            placeholder="Pesquisar"
          />
          <Button
            rounded={4}
            className="btn btn-primary col-2"
            onClick={() => console.log("Pesquisar...")}
          >
            <HtmlIcon hex="&#x1F50D;" />
          </Button>
          <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            isCenter
          >
            <h3>Criar Projeto</h3>
            <Form onSubmit={createProject}>
              <InputText
                type={"text"}
                placeholder={"Nome do projeto"}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                isRequired
              />
              <InputText
                type={"text"}
                placeholder={"Descrição do projeto"}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                isRequired
              />
            </Form>
          </Modal>
        </div>

        <Dropdown
          width={90}
          isDropdownOpen={isProjectDropdownOpen}
          setIsDropdownOpen={setIsProjectDropdownOpen}
          trigger={
            <Button
              className="mt-3 d-flex flex-column align-items-center btn"
              onClick={toggleDropdown}
            >
              {currentProject?.name ?? "Selecione um projeto"}
              <HtmlIcon
                hex="&#8964;"
                size={24}
                color="black"
                lineHeight={0.75}
              />
            </Button>
          }
        >
          <List
            direction="column"
            className="text-center bg-white rounded-3 border"
            gap={0.5}
          >
            {projects.map((project) => (
              <ListItem key={project.id}>
                <Button
                  onClick={() => changeProject(project.id!)}
                  className="btn btn-outline-primary"
                >
                  {project.name}
                </Button>
              </ListItem>
            ))}

            {projects.length > 0 && (
              <ListItem className="d-flex justify-content-center">
                <Button onClick={handleClickCreateFolder}>
                  <HtmlIcon hex="&#x1F4C1;" />
                  <span>Criar pasta</span>
                </Button>
                <Button onClick={handleClickDeleteProject}>
                  <HtmlIcon hex="&#x1F5D1;" />
                  <span>Deletar Projeto</span>
                </Button>
              </ListItem>
            )}
          </List>
          <Button onClick={() => setOpenModal(!openModal)}>
            <span>Criar projeto</span>
          </Button>
        </Dropdown>
        <List className="list-group list-group-flush h-100">{children}</List>
      </menu>
    </aside>
  );
};

export default Menu;
