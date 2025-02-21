import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../../design/modal/Modal";
import Form from "../../design/form/form";
import InputText from "../../design/inputs/InputText/inputText";
import { ProjectContext } from "../../context/project/project.context";
import { AuthContext } from "../../context/auth/auth.context";
import { TeamContext } from "../../context/team/team.context";

interface MenuProps {
    children?: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ children }) => {

    const {addProject} = useContext(ProjectContext)
    const {user} = useContext(AuthContext);
    const {team} = useContext(TeamContext);

    const [openModal, setOpenModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    const createProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addProject({
            description: projectDescription,
            name: projectName,
            ownerId: user?.id,
            teamId: team?.id,
        })
    }

    return (
        <aside className="mt-5 px-0 mx-0 bg-transparent shadow-sm bg-none">
            <div className="m-3 mb-4">
                <NavLink to="/" className={"d-flex justify-content-center align-items-center gap-4"}>
                    <i className="m-1" style={{ fontSize: "2rem" }}>
                        &#x1FA90;
                    </i>
                    <h3>
                        Wa DOCS
                    </h3>
                </NavLink>
            </div>

            <menu className="d-flex flex-column">
                <div className="d-flex flex-row">
                    <input type="text" className="form-control" placeholder="Pesquisar" />
                    <button className="btn btn-primary" onClick={() => setOpenModal(!openModal)}>
                        <i>+</i>
                    </button>
                    <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                        <h3>Criar Projeto</h3>
                        <Form onSubmit={createProject}>
                            <InputText type={"text"} placeholder={"Nome do projeto"} value={projectName} onChange={(e) => setProjectName(e.target.value)} isRequired />
                            <InputText type={"text"} placeholder={"Descrição do projeto"} value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} isRequired />
                        </Form>
                    </Modal>
                </div>

                <ul className="list-group list-group-flush h-100">
                    {children}
                </ul>
            </menu>
        </aside>
    );
};

export default Menu;
