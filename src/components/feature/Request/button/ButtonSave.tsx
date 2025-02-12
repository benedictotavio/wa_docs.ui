interface ButtonSaveProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonSave: React.FC<ButtonSaveProps> = ({ onClick }) => {
    return <button className="btn btn-secondary" onClick={onClick}>Save</button>;
};

export default ButtonSave;