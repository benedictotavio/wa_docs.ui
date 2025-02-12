import Button from "../button/button";
import Skeleton from "../loading/Skeleton";
import styles from "./form.module.css";

type FormProps = {
  children?: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonText?: string;
  buttonDisabled?: boolean;
  isLoading?: boolean;
  skeleton?: boolean;
};

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  buttonText = "Enviar",
  buttonDisabled = false,
  isLoading = false,
  skeleton = false,
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

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
      {buttonDisabled ? (
        <Button className={styles.button}>
          {buttonText}
        </Button>
      ) : (
        <Button className={styles.button} type="submit">
          {buttonText}
        </Button>
      )}
    </form>
  );
};
export default Form;
