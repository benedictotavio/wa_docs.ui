import { useState } from "react";

interface InputStatusCodeProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  placeholder?: string;
  isRequired?: boolean;
}

const InputStatusCode: React.FC<InputStatusCodeProps> = ({
  onChange,
  className,
  value,
  placeholder,
  isRequired,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(Number(event.target.value));
    onChange(event as unknown as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <input
      placeholder={placeholder}
      type="number"
      value={selectedValue}
      onChange={changeInput}
      className={className}
      required={isRequired}
    />
  );
};

export default InputStatusCode;
