import styles from "./Textarea.module.css";

type TextareaProps = {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea: React.FC<TextareaProps> = ({ name, placeholder, value, onChange }) => {
    return (
            <textarea className={styles.textarea} name={name} placeholder={placeholder} value={value} onChange={onChange} />
    );
};

export default Textarea;