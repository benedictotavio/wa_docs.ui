import styles from "./Option.module.css";

interface OptionProps {
    value: string;
    label: string;
}

const Option: React.FC<OptionProps> = ({ value, label }) => {
    return <option className={styles.option} value={value}>{label}</option>;
};

export default Option;