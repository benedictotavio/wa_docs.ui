import React, { useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  right?: number;
  left?: number;
  absolute?: boolean;
  width?: string | number;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  right,
  left,
  absolute = true,
  width = "auto",
  isDropdownOpen = false,
  setIsDropdownOpen,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownStyle: React.CSSProperties = {
    right: right !== undefined ? `${right}px` : undefined,
    left: left !== undefined ? `${left}px` : undefined,
    width: typeof width === "number" ? `${width}%` : width,
  };

  const dropdownStyleAbsolute: React.CSSProperties = {
    ...dropdownStyle,
    position: absolute ? "absolute" : "relative",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDropdownOpen]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div
        className={styles.dropdownButton}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        {trigger}
      </div>

      {isDropdownOpen && (
        <div
          className={styles.dropdownMenu}
          style={absolute ? dropdownStyleAbsolute : dropdownStyle}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          tabIndex={0}
          onMouseDown={(e) => e.preventDefault()}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
