interface ButtonExecuteProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const ButtonExecute: React.FC<ButtonExecuteProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      className={`btn btn-primary m-0 w-25 ${className}`}
      onClick={onClick}
    >
      Enviar
    </button>
  );
};

export default ButtonExecute;
