import styles from "./inputText.module.css";

interface InputTextProps {
  type: "text" | "password" | "email" | "number" | "tel" | "url";
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  width?: number;
  isRequired?: boolean;
}

const InputText = ({
  type,
  placeholder,
  onChange,
  value,
  className,
  width,
  isRequired = false,
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
    />
  );
};

export default InputText;
