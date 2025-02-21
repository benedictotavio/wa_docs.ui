export interface InputUriProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputUri: React.FC<InputUriProps> = ({ value, onChange, className }) => {
  return (
    <input
      type="text"
      className={`${className} form-control w-100`}
      placeholder="https://example.com"
      value={value}
      onChange={onChange}
    />
  );
};

export default InputUri;
