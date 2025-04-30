import Option from "../option/Option";
import styles from "./Select.module.css";

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={className + " " + styles.select}
    >
      {options.map((option, index) => (
        <Option key={option.value} value={option.value} label={option.value} color={
          index % 2 === 0 ? "#2196F3" : "#FF9800"
        } />
      ))}
    </select>
  );
};

export default Select;
