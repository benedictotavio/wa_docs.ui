import Title from "../text/title/Title";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  title?: string;
  height?: number;
  isCenter?: boolean;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  height,
  isCenter,
  className = "",
}) => {
  const modalStyles: React.CSSProperties = {
    minHeight: height ? `${height}vh` : "auto",
  };

  const modalBodyStyles: React.CSSProperties = {
    alignItems: isCenter ? "center" : "flex-start",
    justifyContent: isCenter ? "center" : "flex-start",
  };

  return (
    <div
      className={`${className} ${
        isOpen ? styles.modal_overlay : styles.modal_closed
      }`}
    >
      <div style={modalStyles} className={styles.modal_content}>
        <div className={styles.modal_close_row}>
          <button className={styles.close_button} onClick={onClose}>
            &times;
          </button>
        </div>
        {title && (
          <div className={styles.modal_header}>
            <Title heading="h2" title={title} fontSize={24} />
          </div>
        )}
        <div style={modalBodyStyles} className={styles.modal_body}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
