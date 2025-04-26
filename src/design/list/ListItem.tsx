import styles from "./ListItem.module.css";

export interface ListItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  children,
  className = ""
}) => {
  return (
    <li
      className={`${styles.list_item} ${className}`}
    >
      {children}
    </li>
  );
};

export default ListItem;