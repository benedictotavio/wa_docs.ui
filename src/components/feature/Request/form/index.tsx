import { useContext, useState } from "react";
import Tabs from "../../../../design/tabs";
import InputUri from "../input/InputUri";
import SelectMethod from "../select/SelectMethod";
import TableHeaders from "../tables/TableHeaders";
import { RequestContext } from "../../../../context/request/request.context";
import { RequestMethod } from "../../../../interfaces/request.interface";
import Form from "../../../../design/form/form";
import InputText from "../../../../design/inputs/InputText/inputText";
import InputBody from "../input/InputBody";

export interface RequestFormProps {
  folderId: number;
}

const FormRequest: React.FC<RequestFormProps> = ({ folderId }) => {
  const [newHeaderKey, setNewHeaderKey] = useState("");
  const [newHeaderValue, setNewHeaderValue] = useState("");
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);

  const [method, setMethod] = useState<RequestMethod>(RequestMethod.GET);
  const [uri, setUri] = useState("");
  const [body, setBody] = useState("");
  const [requestName, setRequestName] = useState("");

  const { addRequest } = useContext(RequestContext);

  const createRequest = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      addRequest({
        name: requestName,
        uri,
        method,
        body,
        headers: JSON.stringify(headers),
        folderId: folderId,
      });

      setInterval(() => {
        setMethod(RequestMethod.GET);
        setUri("");
        setBody("");
        setHeaders([]);
        setRequestName("");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const addRow = () => {
    setHeaders([...headers, { key: newHeaderKey, value: newHeaderValue }]);
    setNewHeaderKey("");
    setNewHeaderValue("");
  };

  return (
    <Form onSubmit={createRequest}>
      <InputText
        value={requestName}
        onChange={(event) => setRequestName(event.target.value)}
        type="text"
        placeholder="Nome da Requisição"
        isRequired
      />
      <SelectMethod
        value={method}
        onChange={(event) => setMethod(event.target.value as RequestMethod)}
      />
      <InputUri value={uri} onChange={(event) => setUri(event.target.value)} />
      <Tabs
        stylesTab="bordered-bottom"
        tabsContent={[
          {
            title: "Headers",
            content: (
              <TableHeaders
                headers={headers}
                newHeaderKey={newHeaderKey}
                newHeaderValue={newHeaderValue}
                setNewHeaderKey={setNewHeaderKey}
                setNewHeaderValue={setNewHeaderValue}
                addRow={addRow}
              />
            ),
          },
          {
            title: "Body",
            content: (
              <InputBody
                value={body}
                onChange={(event) => setBody(event.target.value)}
                code={"JSON"}
              />
            ),
          },
          {
            title: "Auth",
            content: <h3>Autenticação</h3>,
          },
          {
            title: "Vars",
            content: <h3>Variaveis</h3>,
          },
          {
            title: "Histórico",
            content: <h3>Histórico</h3>,
          },
        ]}
      />
    </Form>
  );
};

export default FormRequest;
