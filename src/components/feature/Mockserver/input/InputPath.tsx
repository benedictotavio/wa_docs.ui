import InputText from "../../../../design/inputs/InputText/inputText";

interface InputPathProps {
  path: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPath: React.FC<InputPathProps> = ({ path, onChange }) => {
    return (
        <InputText
            className="my-2"
            value={path}
            onChange={onChange}
            type="url"
            placeholder="Ex: /path/example"
            isRequired
        />
    );
}
 
export default InputPath;