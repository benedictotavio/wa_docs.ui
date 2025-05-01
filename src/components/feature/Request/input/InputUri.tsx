export interface InputUriProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputUri: React.FC<InputUriProps> = ({ value, onChange, className }) => {
  return (
    <input
      type="text"
      className={`${className} w-100 px-3 py-2 h-100`}
      placeholder="https://example.com"
      value={value}
      onChange={onChange}
    />
  );
};

export default InputUri;
