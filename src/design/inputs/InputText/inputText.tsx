import styles from "./inputText.module.css";

interface InputTextProps {
  type: "text" | "password" | "email" | "number";
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  width?: number;
}

const InputText = ({ type, placeholder, onChange, value, className, width }: InputTextProps) => {

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
    />
  );
};

export default InputText;
