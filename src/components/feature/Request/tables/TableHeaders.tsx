import { useState } from "react";
import InputText from "../../../../design/inputs/InputText/inputText";

interface TableHeadersProps {
  headers: { key: string; value: string }[];
  addRow?: () => void;
  newHeaderKey: string;
  newHeaderValue: string;
  setNewHeaderKey: (key: string) => void;
  setNewHeaderValue: (value: string) => void;
}

const TableHeaders: React.FC<TableHeadersProps> = ({ headers, addRow, newHeaderKey, newHeaderValue, setNewHeaderKey, setNewHeaderValue }) => {
  
  const [openAddRow, setOpenAddRow] = useState(false);

  const addNewRow = () => {
    if (addRow) {
      addRow();
    }
    setOpenAddRow(false);
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {headers.map((header, index) => (
          <tr key={header.key + index}>
            <td>{header.key}</td>
            <td>{header.value}</td>
          </tr>
        ))}
        <tr>
          {
            openAddRow ? (
              <td colSpan={2}>
                <div className="d-flex flex-row justify-content-center">
                  <InputText key={"key"} value={newHeaderKey} onChange={(e) => setNewHeaderKey(e.target.value)} type={"text"} placeholder={"Nova chave"} />
                  <InputText key={"value"} value={newHeaderValue} onChange={(e) => setNewHeaderValue(e.target.value)} type={"text"} placeholder={"Novo valor"} />
                </div>
                <div>
                  <button className="btn btn-primary" onClick={addNewRow}>
                    Salvar
                  </button>
                </div>
              </td>
            ) : (
              <td colSpan={2}>
                <button className="btn btn-primary" onClick={() => setOpenAddRow(true)}>
                  +
                </button>
              </td>
            )
          }
        </tr>
      </tbody>
    </table>
  );
};

export default TableHeaders;
