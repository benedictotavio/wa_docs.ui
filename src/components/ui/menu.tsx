import React, { useContext, useState } from "react";
import Modal from "../../design/modal/Modal";
import Form from "../../design/form/Form";
import InputText from "../../design/inputs/InputText/inputText";
import { ProjectContext } from "../../context/project/project.context";
import { AuthContext } from "../../context/auth/auth.context";
import { TeamContext } from "../../context/team/team.context";
import Dropdown from "../../design/dropdown/Dropdown";
import List from "./lists/list";
import { FolderContext } from "../../context/folder/folder.context";
import HtmlIcon from "../../design/icon/htmlIcon/HtmlIcon";
import Button from "../../design/button/button";
import image_logo_200 from "../../assets/logo_200w.png";
import image_logo_100 from "../../assets/logo_100w.png";
import image_logo_50 from "../../assets/logo_50w.png";
import Logo from "./logo";

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

  const [isArrowIcon, setIsArrowIcon] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

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
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir projeto ${currentProject?.name}?`
    );

    if (confirmDelete) {
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
        <div className="d-flex flex-row">
          <input type="text" className="form-control" placeholder="Pesquisar" />
          <button
            className="btn btn-primary"
            onClick={() => setOpenModal(!openModal)}
          >
            <i>+</i>
          </button>
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
          onClick={() => setIsArrowIcon(!isArrowIcon)}
          trigger={
            <Button className="mt-3">
              <HtmlIcon unicode="&#8964;" size={28} />
              <span>{currentProject?.name ?? "Selecione um projeto"}</span>
            </Button>
          }
        >
          <List
            direction="column"
            className="text-center bg-white rounded-3 border"
            gap={1.5}
          >
            {projects.map((project) => (
              <li key={project.id} className="mx-1 my-2">
                <button
                  onClick={() => changeProject(project.id!)}
                  className="btn btn-outline-primary"
                >
                  {project.name}
                </button>
              </li>
            ))}
            <li className="d-flex justify-content-center">
              <button onClick={handleClickCreateFolder}>Criar pasta</button>
              <button
                className="badge bg-danger"
                onClick={handleClickDeleteProject}
              >
                <HtmlIcon unicode="&#x1F5D1;" />
                <span>Deletar Projeto</span>
              </button>
            </li>
          </List>
          <button
            className="w-100 rounded-bottom"
            onClick={() => setOpenModal(true)}
          >
            Criar projeto
          </button>
        </Dropdown>

        <ul className="list-group list-group-flush h-100">{children}</ul>
      </menu>
    </aside>
  );
};

export default Menu;
