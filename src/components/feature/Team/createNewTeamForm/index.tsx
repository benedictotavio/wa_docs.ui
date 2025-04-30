import { useContext, useState } from "react";
import { TeamContext } from "../../../../context/team/team.context";
import Form from "../../../../design/form/Form";
import InputText from "../../../../design/inputs/InputText/InputText";
import { AuthContext } from "../../../../context/auth/auth.context";
import Title from "../../../../design/text/title/Title";

const CreateNewTeamForm: React.FC = () => {
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");

  const { user } = useContext(AuthContext);
  const { addTeam } = useContext(TeamContext);

  const createNewTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTeam({
      name: newTeamName,
      description: newTeamDescription,
      ownerId: user?.id,
    });
    window.alert("Equipe criada com sucesso!"); 
    setInterval(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <Title title="Criar nova equipe" heading="h4" />
      <Form onSubmit={createNewTeam}>
        <InputText
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Nome da equipe"
          type={"text"}
          isRequired
        />
        <InputText
          value={newTeamDescription}
          onChange={(e) => setNewTeamDescription(e.target.value)}
          placeholder="Descrição da equipe"
          type={"text"}
          isRequired
        />
      </Form>
    </>
  );
};

export default CreateNewTeamForm;
