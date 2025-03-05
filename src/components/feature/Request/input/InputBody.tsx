import { useState } from "react";
import ButtonClear from "../button/ButtonClear";
import Select from "../../../../design/selects/select/Select";

interface InputBodyProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  code: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

// Change to code snippet
const InputBody: React.FC<InputBodyProps> = ({
  value,
  onChange,
  code,
  isRequired,
  isDisabled,
}) => {
  const [codeScript, setCodeScript] = useState(code);

  const optionsScript = [
    { value: "json", label: "JSON" },
    { value: "xml", label: "XML" },
    { value: "html", label: "HTML" },
    { value: "javascript", label: "JavaScript" },
  ];

  return (
    <>
      <Select
        value={codeScript}
        onChange={(e) => setCodeScript(e.target.value)}
        options={optionsScript}
      />
      <textarea
        className="form-control w-100"
        rows={10}
        value={value}
        onChange={(e) => onChange(e)}
        required={isRequired}
        disabled={isDisabled}
      />
      <div className="d-flex justify-content-end">
        <ButtonClear onClick={() => setCodeScript("")} />
      </div>
    </>
  );
};

export default InputBody;
