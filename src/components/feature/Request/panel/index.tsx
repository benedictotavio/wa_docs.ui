import { useState } from "react";
import BoxResponse from "../box/BoxResponse";
import ButtonExecute from "../button/ButtonExecute";
import InputUri from "../input/InputUri";
import SelectMethod from "../select/SelectMethod";
import TableHeaders from "../tables/TableHeaders";
import InputBody from "../input/InputBody";
import Tabs from "../../../../design/tabs/Tabs";
import {
  Request,
  RequestMethod,
} from "../../../../interfaces/request.interface";
import { RequestService } from "../../../../services/request.service";

interface RequestPanelProps {
  currentRequest: Request;
}

const RequestPanel: React.FC<RequestPanelProps> = ({ currentRequest }) => {
  const requestService = new RequestService();

  console.log("currentRequest", currentRequest);

  const [response, setResponse] = useState<string>("");
  const [newHeaderKey, setNewHeaderKey] = useState("");
  const [newHeaderValue, setNewHeaderValue] = useState("");

  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [body, setBody] = useState<string>(currentRequest?.body ?? "");
  const [uri, setUri] = useState<string>(currentRequest?.uri ?? "");
  const [method, setMethod] = useState<RequestMethod>(
    currentRequest?.method ?? RequestMethod.GET
  );

  const addRow = () => {
    setHeaders([...headers, { key: newHeaderKey, value: newHeaderValue }]);
    setNewHeaderKey("");
    setNewHeaderValue("");
  };

  const executeRequest = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await requestService.exeute({
      method,
      uri,
      headers: JSON.stringify(headers),
      body,
    });

    if (response.error) {
      setResponse(JSON.stringify(response.error));
      return;
    }

    setResponse(JSON.stringify(response));
  };

  return (
    <div>
      <div className="d-flex flex-row justify-content-center my-3 w-100 container-fluid">
        <div className="w-100 h-100 d-flex flex-row justify-content-center">
          <SelectMethod
            value={method}
            onChange={(event) => setMethod(event.target.value as RequestMethod)}
          />
          <InputUri
            value={uri}
            onChange={(event) => setUri(event.target.value)}
          />
          <ButtonExecute onClick={executeRequest} />
        </div>
      </div>
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
                onChange={(e) => setBody(e.target.value)}
                code="JSON"
              />
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
export default RequestPanel;
