import styles from "./HtmlIcon.module.css";

interface HtmlIconProps {
  className?: string;
  size?: number;
  color?: string;
  hex: string;
  lineHeight?: number;
  borderRadius?: number;
  border?: boolean;
}

const HtmlIcon: React.FC<HtmlIconProps> = ({
  className = "",
  size = 24,
  color = "#000000",
  hex = "f13b",
  lineHeight = 0,
  borderRadius = 0,
  border = false,
}) => {
  const htmlIconStyle: React.CSSProperties = {
    fontSize: size,
    color: color,
    lineHeight: lineHeight,
    borderRadius: borderRadius + "px",
    border: border ? "1px solid #000" : "none",
  };

  return (
    <i className={`${className} ${hex} ${styles.icon}`} style={htmlIconStyle}>
      {hex}
    </i>
  );
};

export default HtmlIcon;
