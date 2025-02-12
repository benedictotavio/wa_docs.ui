
interface ButtonClearProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonClear: React.FC<ButtonClearProps> = ({ onClick }) => {
  return <button className="btn btn-danger" onClick={onClick}>Clear</button>;
};

export default ButtonClear;