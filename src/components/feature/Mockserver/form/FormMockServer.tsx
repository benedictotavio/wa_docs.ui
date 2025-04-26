import { useContext, useState } from "react";
import { RequestMethod } from "../../../../interfaces/request.interface";
import { MockserverContext } from "../../../../context/mockserver/mockserver.context";
import InputText from "../../../../design/inputs/InputText/inputText";
import Tabs from "../../../../design/tabs/Tabs";
import InputBody from "../../Request/input/InputBody";
import SelectMethod from "../../Request/select/SelectMethod";
import TableHeaders from "../../Request/tables/TableHeaders";
import InputStatusCode from "../../Request/input/InputStatusCode";
import Form from "../../../../design/form/Form";
import { Mockserver } from "../../../../interfaces/mockserver.interface";

interface FormMockServerProps {
  projectId: number;
  mockServer?: Mockserver;
}

const FormMockServer: React.FC<FormMockServerProps> = ({
  projectId,
  mockServer,
}) => {
  const [name, setName] = useState(mockServer?.name ?? "");
  const [path, setPath] = useState(mockServer?.path ?? "");
  const [method, setMethod] = useState<RequestMethod>(RequestMethod.GET);
  const [body, setBody] = useState(mockServer?.body ?? "");
  const [newHeaderKey, setNewHeaderKey] = useState("");
  const [newHeaderValue, setNewHeaderValue] = useState("");
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>(
    JSON.parse(mockServer?.headers ?? "[]")
  );
  const [statusCode, setStatusCode] = useState<number>(
    mockServer?.statusCode ?? 200
  );
  const [bodyResponse, setBodyResponse] = useState(
    mockServer?.bodyResponse ?? ""
  );

  const { createMockServer } = useContext(MockserverContext);

  const createNewMockServer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMockServer({
      name,
      path,
      method,
      headers: JSON.stringify(headers),
      projectId,
      statusCode,
      bodyResponse,
    })
      .then(() => {
        setInterval(() => {
          setName("");
          setPath("");
          setMethod(RequestMethod.GET);
          setHeaders([]);
          setStatusCode(200);
          setBodyResponse("");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addRow = () => {
    setHeaders([...headers, { key: newHeaderKey, value: newHeaderValue }]);
    setNewHeaderKey("");
    setNewHeaderValue("");
  };

  return (
    <Form
      buttonDisabled={
        path.length <= 0 && name.length <= 0 && bodyResponse.length <= 0
      }
      onSubmit={createNewMockServer}
    >
      <div>
        <h4>
          Base URL: <span>{mockServer?.url ?? "https:0.0.0.0:3000/"}</span>{" "}
          <span>{mockServer?.path ?? ""}</span>
        </h4>
      </div>
      <Tabs
        tabsContent={[
          {
            title: "Requisição",
            content: (
              <>
                <InputText
                  value={mockServer?.url ?? ""}
                  type="url"
                  placeholder="Nome do Mock Server"
                  isRequired
                  isReadOnly
                />
                <InputText
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  placeholder="Nome do Mock Server"
                  isRequired
                />
                <SelectMethod
                  value={method}
                  onChange={(event) =>
                    setMethod(event.target.value as RequestMethod)
                  }
                />
                {/* <InputPath
                  path={path}
                  onChange={(event) => setPath(event.target.value)}
                  key={path + name}
                /> */}
                <InputText
                  value={path}
                  onChange={(event) => setPath(event.target.value)}
                  type="text"
                  placeholder="Ex: /path/example"
                  isRequired
                />
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
                          isDisabled={method == RequestMethod.GET}
                        />
                      ),
                    },
                    {
                      title: "Auth",
                      content: <h3>Auth</h3>,
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
              </>
            ),
          },
          {
            title: "Resposta",
            content: (
              <>
                <InputStatusCode
                  value={statusCode}
                  onChange={(event) =>
                    setStatusCode(Number(event.target.value))
                  }
                  placeholder="Status Code"
                  isRequired
                />
                <InputBody
                  value={bodyResponse}
                  onChange={(event) => setBodyResponse(event.target.value)}
                  code={"JSON"}
                />
              </>
            ),
          },
        ]}
      />
    </Form>
  );
};
export default FormMockServer;
