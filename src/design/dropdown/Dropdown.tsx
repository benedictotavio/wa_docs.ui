import { useState } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  right?: number;
  left?: number;
  onClick?: () => void;
  absolute?: boolean;
  width?: string | number;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  right,
  left,
  onClick,
  absolute = true,
  width = "auto",
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
    width: `${width}%`,
  };

  const dropdownStyleAbsolute: React.CSSProperties = {
    ...dropdownStyle,
    position: absolute ? "absolute" : "relative",
  };

  return (
    <div className={styles.dropdown}>
      <div
        role="button"
        tabIndex={0}
        className={styles.dropdownButton}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={onClickDropdown}
        onMouseDown={(e) => e.preventDefault()}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`${styles.dropdownMenu}`}
          style={absolute ? dropdownStyleAbsolute : dropdownStyle}
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
