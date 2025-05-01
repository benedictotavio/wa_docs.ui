import Select from "../../../../design/selects/select/Select";
import { RequestMethod } from "../../../../interfaces/request.interface";

interface SelectMethodProps {
  value: RequestMethod;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  setValue: (value: RequestMethod) => void;
}

const SelectMethod: React.FC<SelectMethodProps> = ({
  value,
  onChange,
  className = "",
  setValue
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value as RequestMethod);
    value = event.target.value as RequestMethod;
    onChange(event);
  };

  const options: { value: RequestMethod; label: string }[] = [
    { value: RequestMethod.GET, label: "GET" },
    { value: RequestMethod.POST, label: "POST" },
    { value: RequestMethod.PUT, label: "PUT" },
    { value: RequestMethod.DELETE, label: "DELETE" },
    { value: RequestMethod.PATCH, label: "PATCH" },
    { value: RequestMethod.HEAD, label: "HEAD" },
    { value: RequestMethod.OPTIONS, label: "OPTIONS" },
  ];

  return (
    <Select
      value={value}
      onChange={handleChange}
      options={options}
      className={`${className}`}
    />
  );
};

export default SelectMethod;
