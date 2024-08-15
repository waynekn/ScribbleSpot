import { BubbleMenu } from "@tiptap/react";
import PropTypes from "prop-types";

import "./bubble-menu.styles.scss";

const BubbleMenuComponent = ({ editor }) => {
  return (
    <>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="bubble-menu">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
        </div>
      </BubbleMenu>
    </>
  );
};
BubbleMenuComponent.propTypes = {
  editor: PropTypes.object.isRequired,
};
export default BubbleMenuComponent;
