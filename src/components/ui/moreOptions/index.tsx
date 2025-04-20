import Dropdown from "../../../design/dropdown/Dropdown";
import List from "../lists/list";

interface MoreOptionsProps {
  children: React.ReactNode;
}

const MoreOptions: React.FC<MoreOptionsProps> = ({ children }) => {
  return (
    <Dropdown trigger={<i>&#x22EF;</i>}>
      <List direction="column">{children}</List>
    </Dropdown>
  );
};

export default MoreOptions;
