import { useState } from "react";
import styles from "./dropdown.module.css";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  right?: number;
  left?: number;
  onClick?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  right,
  left,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onClickDropdown = () => {
    toggleDropdown();
    if (onClick) {
      onClick();
    }
  };

  const dropdownStyle: React.CSSProperties = {
    right: right !== undefined ? `${right}px` : undefined,
    left: left !== undefined ? `${left}px` : undefined,
  };

  return (
    <div
      className={`${styles.dropdown} relative inline-block text-left`}>
      <div>
        <button
          type="button"
          className={styles.dropdownButton}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={onClickDropdown}
          onMouseDown={(e) => e.preventDefault()}
        >
          {trigger}
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div
            id="options-menu"
            aria-labelledby="options-menu"
            style={dropdownStyle}
            className={`${styles.dropdownMenu}  py-1`}
            role="menu"
            aria-orientation="vertical"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
