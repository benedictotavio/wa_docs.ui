import Option from "../option/Option";
import styles from "./Select.module.css";

interface SelectProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, className }) => {
    return (
        <select value={value} onChange={onChange} className={className + " " + styles.select}>
            {options.map((option) => (
                <Option key={option.value} value={option.value} label={option.label} />
            ))}
        </select>
    );
};

export default Select;