"use client";

import Tiptap from "./TipTap";

type NotePickerProps = {
  content: string;
  onChange: (reason: string) => void;
};

const RichText: React.FC<NotePickerProps> = ({ content, onChange }) => {
  return <Tiptap content={content} onChange={(reason) => onChange(reason)} />;
};

export default RichText;