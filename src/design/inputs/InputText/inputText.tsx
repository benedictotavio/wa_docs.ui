import styles from "./inputText.module.css";

interface InputTextProps {
  type: "text" | "password" | "email" | "number";
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
}

const InputText = ({ type, placeholder, onChange, value, className }: InputTextProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.inputText + " " + className}
    />
  );
};

export default InputText;
