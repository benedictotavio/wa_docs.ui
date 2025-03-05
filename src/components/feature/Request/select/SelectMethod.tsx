import { useState } from "react";
import Select from "../../../../design/selects/select/Select";
import { RequestMethod } from "../../../../interfaces/request.interface";

interface SelectMethodProps {
  value: RequestMethod;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const SelectMethod: React.FC<SelectMethodProps> = ({
  value,
  onChange,
  className,
}) => {

  const [selectedValue, setSelectedValue] = useState(value);
  const options: { value: RequestMethod; label: string }[] = [
    { value: RequestMethod.GET, label: "GET" },
    { value: RequestMethod.POST, label: "POST" },
    { value: RequestMethod.PUT, label: "PUT" },
    { value: RequestMethod.DELETE, label: "DELETE" },
    { value: RequestMethod.PATCH, label: "PATCH" },
    { value: RequestMethod.HEAD, label: "HEAD" },
    { value: RequestMethod.OPTIONS, label: "OPTIONS" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value as RequestMethod);
    onChange(event);
  };

  return (
    <Select
      value={selectedValue}
      onChange={handleChange}
      options={options}
      className={`${className}w-100`}
    />
  );
};

export default SelectMethod;
