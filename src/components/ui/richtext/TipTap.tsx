"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./Toolbar";

type TiptapProps = {
  content: string;
  onChange: (content: string) => void;
};

const Tiptap: React.FC<TiptapProps> = ({ content, onChange }) => {
  const handleEditorContentChange = (reason: string) => {
    onChange(reason);
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    immediatelyRender: false,
    content: content,
    editorProps: {
      attributes: {
        class:
          "flex flex-col gap-5 p-5 border-2 border-gray-300 rounded-md outline-none w-full h-full focus:border-blue-500",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      handleEditorContentChange(content);
    },
  });

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <Toolbar content={content} editor={editor} />
      <EditorContent
        style={{
          whiteSpace: "pre-line",
          minWidth: "100%",
          minHeight: "100%",
          overflow: "auto",
          resize: "both",
          overflowWrap: "break-word",
          wordWrap: "break-word",
          wordBreak: "break-word",
        }}
        editor={editor}
        content={content}
        placeholder="Adicione um texto aqui..."
        defaultValue={content}
        aria-busy={false}
        onBlurCapture={(e) => {
          const content = e.target.innerHTML;
          handleEditorContentChange(content);
        }}
        onInput={(e) => {
          const content = e.currentTarget.innerHTML;
          handleEditorContentChange(content);
        }}
        onKeyDown={(e) => {
          const content = e.currentTarget.innerHTML;
          handleEditorContentChange(content);
        }}
        onPaste={(e) => {
          const content = e.currentTarget.innerHTML;
          handleEditorContentChange(content);
        }}
      />
    </div>
  );
};

export default Tiptap;
