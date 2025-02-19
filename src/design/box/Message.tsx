import styles from "./Message.module.css";

type MessageProps = {
  message: string;
  type: "success" | "error" | "warning" | "info";
};

const Message = ({ message, type }: MessageProps) => {
  return (
    <div className={`${styles.message} ${styles[type]}`}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
