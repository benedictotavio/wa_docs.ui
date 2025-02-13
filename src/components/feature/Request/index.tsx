import { useState } from "react";
import BoxResponse from "./box/BoxResponse";
import ButtonExecute from "./button/ButtonExecute";
import InputUri from "./input/InputUri";
import SelectMethod from "./select/SelectMethod";
import TableHeaders from "./tables/TableHeaders";
import InputBody from "./input/InputBody";
import Tabs from "../../../design/tabs";

const Request: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [newHeaderKey, setNewHeaderKey] = useState("");
  const [newHeaderValue, setNewHeaderValue] = useState("");
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);

  const addRow = () => {
    setHeaders([...headers, { key: newHeaderKey, value: newHeaderValue }]);
    setNewHeaderKey("");
    setNewHeaderValue("");
  };

  const [body, setBody] = useState<string>("");

  return (
    <div>
      <div className="d-flex flex-row justify-content-center my-3">
        <SelectMethod />
        <InputUri />
        <ButtonExecute
          onClick={() => {
            setResponse("{'message': 'Hello World!'}");
          }}
        />
      </div>
      <Tabs
        stylesTab="bordered-bottom"
        tabsContent={[
          {
            title: "Headers",
            content: <TableHeaders 
            headers={headers}
            newHeaderKey={newHeaderKey}
            newHeaderValue={newHeaderValue}
            setNewHeaderKey={setNewHeaderKey}
            setNewHeaderValue={setNewHeaderValue}
            addRow={addRow}
            />,
          },
          {
            title: "Body",
            content: (
              <InputBody value={body} onChange={(value) => setBody(value)} />
            ),
          },
          {
            title: "Auth",
            content: <BoxResponse response={response} />,
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
      <BoxResponse response={response} statusCode={200} />
    </div>
  );
};

export default Request;
