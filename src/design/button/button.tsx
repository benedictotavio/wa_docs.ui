import styles from "./button.module.css";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ children, onClick, className, type = "button" }: ButtonProps) => {
  return <button type={type} className={styles.button + " " + className} onClick={onClick}>{children}</button>;
};

export default Button;
