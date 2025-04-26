import { useContext, useState } from "react";
import { FolderContext } from "../../../context/folder/folder.context";
import Form from "../../../design/form/Form";
import InputText from "../../../design/inputs/InputText/InputText";

interface NewFolderFormProps {
  projectId: number;
}

const NewFolderForm: React.FC<NewFolderFormProps> = ({ projectId }) => {
  const [newFolderName, setNewFolderName] = useState("");
  const { createFolder } = useContext(FolderContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createFolder({
      name: newFolderName,
      projectId: projectId,
      level: 0,
    }).then(() => {
      setNewFolderName("");
      window.confirm("Pasta criada com sucesso!");
      window.location.reload();
    });
  };

  return (
    <Form onSubmit={handleSubmit} buttonText="Adicionar">
      <InputText
        value={newFolderName}
        type="text"
        placeholder="Nome da pasta"
        className="w-100"
        onChange={(e) => setNewFolderName(e.target.value)}
      />
    </Form>
  );
};

export default NewFolderForm;
