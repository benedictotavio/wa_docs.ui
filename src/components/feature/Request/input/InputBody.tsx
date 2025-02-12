import { useState } from "react";
import ButtonClear from "../button/ButtonClear";

interface InputBodyProps {
  value: string;
  onChange: (value: string) => void;
}

// Change to code snippet
const InputBody: React.FC<InputBodyProps> = ({ value, onChange }) => {

  const [code, setCode] = useState<string>(value ?? '');

  return (
    <>
      <textarea className="form-control w-100" rows={10} value={code} onChange={(e) => onChange && onChange(e.target.value)} />
      <div className="d-flex justify-content-end">
        <ButtonClear onClick={() => setCode('')} />
      </div>
    </>
  )
}

export default InputBody;