import styles from "./Button.module.css";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  rounded?: boolean | number;
  width?: number;
  isTransparent?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = "button",
  rounded = false,
  width,
  isTransparent = false,
}) => {
  const buttonStyles: React.CSSProperties = {
    width: "100%",
    borderRadius: "1px",
  };

  if (width) {
    buttonStyles.width = `${width}px`;
  }

  if (rounded) {
    if (typeof rounded === "number") {
      buttonStyles.borderRadius = `${rounded}px`;
    } else {
      buttonStyles.borderRadius = "100px";
    }
  }

  if (isTransparent) {
    buttonStyles.backgroundColor = "transparent";
    buttonStyles.border = "none";
  }

  return (
    <button
      type={type}
      className={styles.button + " " + className}
      onClick={onClick}
      style={buttonStyles}
    >
      {children}
    </button>
  );
};

export default Button;
