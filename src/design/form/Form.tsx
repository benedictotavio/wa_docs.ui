import Button from "../button/Button";
import Skeleton from "../loading/Skeleton";
import styles from "./Form.module.css";

type FormProps = {
  children?: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonText?: string;
  buttonDisabled?: boolean;
  isLoading?: boolean;
  skeleton?: boolean;
  width?: number;
};

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  buttonText = "Enviar",
  buttonDisabled = false,
  isLoading = false,
  skeleton = false,
  width
}) => {
  if (isLoading && skeleton) {
    return (
      <>
        <Skeleton height="30px" isLoading />
        <Skeleton height="30px" isLoading />
        <Skeleton height="30px" isLoading />
        <Skeleton height="30px" isLoading />
        <Skeleton height="80px" isLoading />
        <div className={styles.skeleton}>
          <Skeleton height="30px" isLoading />
          <Skeleton height="30px" isLoading />
        </div>
      </>
    );
  }

  const formStyles: React.CSSProperties = {
    width: width && `${width}%`,
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} style={formStyles}>
      {children}
      {!buttonDisabled && (
        <Button className={styles.button} type="submit">
          {buttonText}
        </Button>
      )}
    </form>
  );
};
export default Form;
