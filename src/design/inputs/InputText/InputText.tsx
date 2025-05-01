import styles from "./InputText.module.css";

interface InputTextProps {
  type: "text" | "password" | "email" | "number" | "tel" | "url";
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  width?: number;
  isRequired?: boolean;
  isReadOnly?: boolean;
}

const InputText = ({
  type,
  placeholder,
  onChange,
  value,
  className = "",
  width,
  isRequired = false,
  isReadOnly = false,
}: InputTextProps) => {
  const inputStyles: React.CSSProperties = {
    width: width ? width + "px" : "100%",
  };

  return (
    <input
      style={inputStyles}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.inputText + " " + className}
      width={width}
      required={isRequired}
      readOnly={isReadOnly}
    />
  );
};

export default InputText;
