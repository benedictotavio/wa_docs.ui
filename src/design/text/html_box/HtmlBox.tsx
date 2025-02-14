import styles from "./HtmlBox.module.css";

type HtmlBoxProps = {
  html: string;
  container?: boolean;
  fontFamily?: "Arial" | "Montserrat" | "Roboto" | "Questrial";
  fontSize?: number;
  textAlign?: "left" | "center" | "right" | "justify";
};

const HtmlBox: React.FC<HtmlBoxProps> = ({
  html,
  fontFamily = "Montserrat",
  fontSize = 16,
  container = false,
  textAlign = "justify",
}) => {
  const htmlStyles: React.CSSProperties = {
    fontFamily: `${fontFamily}, sans-serif`,
    fontSize: `${fontSize}px`,
    textAlign: textAlign,
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    width: "100%",
    fontStyle: "italic",
  };

  if (container) {
    htmlStyles.minWidth = "100%";
    htmlStyles.margin = "0 auto";
    htmlStyles.padding = "5px 15px";
  }
  
  return (
    <div
      style={htmlStyles}
      className={styles.html_box}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HtmlBox;
