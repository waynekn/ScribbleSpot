import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";

import BubbleMenuComponent from "./modules/bubble-menu/bubble-menu";
import Toolbar from "./modules/toolbar/toolbar.component";

import "./editor.styles.scss";

const extensions = [
  StarterKit,
  Color,
  Paragraph,
  Text,
  TextStyle,
  Underline,
  Heading,
  BulletList,
  OrderedList,
  Subscript,
  Superscript,
];

const Editor = () => {
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions,
  });

  if (!editor) return null;

  return (
    <div className="editor-container">
      <input
        type="text"
        placeholder="Title"
        className="editor-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="editor-content">
        <Toolbar editor={editor} />
        <BubbleMenuComponent editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
