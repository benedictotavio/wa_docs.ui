import { useState } from "react";
import Dropdown from "../../../design/dropdown/Dropdown";
import HtmlIcon from "../../../design/icon/htmlIcon/HtmlIcon";
import List from "../../../design/list/List";
import Button from "../../../design/button/Button";
interface MoreOptionsProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const MoreOptions: React.FC<MoreOptionsProps> = ({
  children,
  isOpen = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <Dropdown
      trigger={
        <Button onClick={toggleDropdown} isTransparent>
          <HtmlIcon hex="&#x22EF;" />
        </Button>
      }
      isDropdownOpen={isDropdownOpen}
      setIsDropdownOpen={setIsDropdownOpen}
    >
      <List direction="column" className="p-0">
        {children}
      </List>
    </Dropdown>
  );
};

export default MoreOptions;
