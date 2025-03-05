import styles from "./HtmlIcon.module.css";

interface HtmlIconProps {
  className?: string;
  size?: number;
  color?: string;
  unicode: string;
}

const HtmlIcon: React.FC<HtmlIconProps> = ({
  className = "",
  size = 24,
  color = "#000000",
  unicode = "f13b",
}) => {
  return (
    <i
      className={`${className} ${unicode} ${styles.icon}`}
      style={{ fontSize: size, color: color, lineHeight: 0 }}
    >
        {unicode}
    </i>
  );
};

export default HtmlIcon;