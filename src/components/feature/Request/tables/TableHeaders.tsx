import { useState } from "react";
import InputText from "../../../../design/inputs/InputText/InputText";

interface TableHeadersProps {
  headers: { key: string; value: string }[];
  addRow?: () => void;
  newHeaderKey: string;
  newHeaderValue: string;
  setNewHeaderKey: (key: string) => void;
  setNewHeaderValue: (value: string) => void;
}

const TableHeaders: React.FC<TableHeadersProps> = ({
  headers,
  addRow,
  newHeaderKey,
  newHeaderValue,
  setNewHeaderKey,
  setNewHeaderValue,
}) => {

  const [rows, setRows] = useState(headers);

  const [openAddRow, setOpenAddRow] = useState(false);

  const addNewRow = () => {
    if (addRow && newHeaderKey && newHeaderValue) {
      addRow();
    }
    setRows([...rows, { key: newHeaderKey, value: newHeaderValue }]);
    setOpenAddRow(false);
  };

  const deleteRow = (index: number) => {
    const updatedHeaders = [...rows];
    updatedHeaders.splice(index, 1);
    setRows(updatedHeaders);
  };

  const handleCancelAddRow = () => {
    setOpenAddRow(false);
    setNewHeaderKey("");
    setNewHeaderValue("");
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr className="flex flex-row">
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody className="flex flex-column">
        {rows.map((header, index) => (
          <tr key={header.key + index} className="flex flex-row">
            <td>{header.key}</td>
            <td>{header.value}</td>
            <td>
              <button type="button" className="btn-close" aria-label="Close" onClick={
                () => deleteRow(index)
              }>
                X
              </button>
            </td>
          </tr>
        ))}
        <tr>
          {openAddRow ? (
            <td colSpan={2} className="text-center flex">
              <div className="d-flex flex-row">
                <InputText
                  key={"key"}
                  value={newHeaderKey}
                  onChange={(e) => setNewHeaderKey(e.target.value)}
                  type={"text"}
                  placeholder={"Nova chave"}
                />
                <InputText
                  key={"value"}
                  value={newHeaderValue}
                  onChange={(e) => setNewHeaderValue(e.target.value)}
                  type={"text"}
                  placeholder={"Novo valor"}
                  className="w-100 mx-2"
                />
              </div>
              <div className="d-flex flex-row justify-content-center my-3 gap-2 align-items-center">
                <button
                  className="btn btn-primary my-3 mx-1 w-25"
                  onClick={addNewRow}
                >
                  Salvar
                </button>
                <button
                  className="btn btn-secondary my-3 mx-1 w-25"
                  onClick={handleCancelAddRow}
                >
                  Cancelar
                </button>
              </div>
            </td>
          ) : (
            <td colSpan={2} className="text-center my-3">
              <button
                className="btn btn-secondary rounded"
                onClick={() => setOpenAddRow(true)}
              >
                + Adicionar
              </button>
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default TableHeaders;
