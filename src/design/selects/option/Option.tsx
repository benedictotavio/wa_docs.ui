import styles from "./Option.module.css";

interface OptionProps {
    value: string;
    label: string;
    color?: string;
}

const Option: React.FC<OptionProps> = ({ value, label, color }) => {

    const optionStyle = {
        backgroundColor: color,
        color: color ? "white" : "black",

    };

    return <option className={styles.option} value={value} style={optionStyle}>{label}</option>;
};

export default Option;