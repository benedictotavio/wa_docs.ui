import styles from "./List.module.css";

type ListProps = {
  children?: React.ReactNode;
  gap?: number;
  direction?: "row" | "column";
  isFloat?: boolean;
  positionX?: number | "left" | "right";
  positionY?: number | "top" | "bottom";
  margin?: number[];
  selectable?: boolean;
  twoColumns?: boolean;
  className?: string;
};

const List: React.FC<ListProps> = ({
  children,
  gap,
  direction,
  isFloat,
  positionX,
  positionY,
  margin,
  selectable,
  twoColumns = false,
  className = "",
}) => {
  const defineMargin = (margin?: number[]) => {
    if (margin && margin.length === 4) {
      return `${margin[0]}rem ${margin[1]}rem ${margin[2]}rem ${margin[3]}rem`;
    }
    return "0";
  };

  const stylesList: React.CSSProperties = {
    gap: gap ? `${gap}px` : "0",
    display: "flex",
    flexDirection: direction,
    margin: defineMargin(margin),
  };

  if (isFloat) {
    stylesList.position = "absolute";

    if (typeof positionX === "number") {
      stylesList.left = `${positionX}rem`;
    }

    if (typeof positionY === "number") {
      stylesList.top = `${positionY}rem`;
    }

    if (positionX === "left") {
      stylesList.left = "0";
    }

    if (positionX === "right") {
      stylesList.right = "0";
    }
  }

  return (
    <ul
      style={stylesList}
      className={`${styles.list} ${className} ${
        selectable ? styles.list_selectable : ""
      } ${twoColumns ? styles.list_two_columns : ""}`}
    >
      {children}
    </ul>
  );
};

export default List;
