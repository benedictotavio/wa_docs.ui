interface ListItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return <li>{children}</li>
};

export default ListItem;