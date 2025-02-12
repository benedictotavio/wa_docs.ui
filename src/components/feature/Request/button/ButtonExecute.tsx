interface ButtonExecuteProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonExecute: React.FC<ButtonExecuteProps> = ({ onClick }) => {
  return (
    <button className="btn btn-primary m-0 w-25" onClick={onClick}>
      Enviar
    </button>
  );
};

export default ButtonExecute;
