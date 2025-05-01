import { useState } from "react";
import RichText from "../../../ui/richtext/RichText";

interface TextDocumentProps {}

const TextDocument: React.FC<TextDocumentProps> = ({}) => {
  const [text, setText] = useState<string>("");

  return (
    <RichText
      content={text}
      onChange={setText}
      key={text + "_text" + Number(new Date())}
    />
  );
};

export default TextDocument;
