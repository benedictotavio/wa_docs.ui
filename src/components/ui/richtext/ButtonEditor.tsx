import { Editor } from "@tiptap/react";

type ButtonEditor = {
  editor: Editor | null;
  children?: React.ReactNode;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonEditor: React.FC<ButtonEditor> = ({
  editor,
  children,
  className,
  onClick,
}) => {
  if (!editor) {
    return null;
  }
  return (
    <button
      onClick={onClick}
      className={className + " text-white hover:bg-sky-700 rounded-lg p-2"}
      disabled={!editor.can().chain().focus().run()}
      title="Editor"
    >
      {children}
    </button>
  );
};

export default ButtonEditor;
