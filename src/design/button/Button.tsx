import styles from "./Button.module.css";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  rounded?: boolean | number;
  width?: number | string;
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
  onDoubleClick,
}) => {
  const buttonStyles: React.CSSProperties = {
    width: "auto",
    borderRadius: "1px",
  };

  if (width) {
    if (typeof width === "number") {
      buttonStyles.width = `${width}px`;
    } else {
      buttonStyles.width = width;
    }
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
      onDoubleClick={onDoubleClick}
      style={buttonStyles}
    >
      {children}
    </button>
  );
};

export default Button;
