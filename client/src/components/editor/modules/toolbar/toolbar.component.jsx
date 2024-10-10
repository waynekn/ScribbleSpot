import { useState } from "react";
import PropTypes from "prop-types";

import "./toolbar.styles.scss";

const Toolbar = ({ editor }) => {
  const [showExtraOptions, setShowExtraOptions] = useState(false);

  if (!editor) return null;

  return (
    <div className="toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        aria-label="Bold"
      >
        <strong>B</strong>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        aria-label="Italic"
      >
        <em>I</em>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
        aria-label="Underline"
      >
        <u>U</u>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        aria-label="Strike"
      >
        <s>S</s>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        aria-label="Heading 1"
      >
        H1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        aria-label="Heading 2"
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        aria-label="Bullet List"
      >
        <i className="bi bi-list-ul"></i>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        aria-label="Ordered List"
      >
        <i className="bi bi-list-ol"></i>
      </button>

      <input
        type="color"
        onInput={(event) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes("textStyle").color || "#000000"}
        aria-label="Choose Text Color"
      />

      <button
        onClick={() => editor.chain().focus().unsetColor().run()}
        aria-label="Unset Text Color"
      >
        Unset Color
      </button>

      {/* Toggle Button for Extra Features */}
      <button
        onClick={() => setShowExtraOptions(!showExtraOptions)}
        aria-label="Toggle Extra Options"
      >
        {/* Use HTML code because for some reason &plus; isn't rendering properly */}
        &#43;
      </button>

      {/* Extra Features */}
      {showExtraOptions && (
        <div className="extra-options">
          <button
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={editor.isActive("subscript") ? "is-active" : ""}
            aria-label="Subscript"
          >
            X<sub>2</sub>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={editor.isActive("superscript") ? "is-active" : ""}
            aria-label="Superscript"
          >
            X<sup>2</sup>
          </button>

          <button
            onClick={() => setShowExtraOptions(!showExtraOptions)}
            aria-label="Toggle Extra Options"
          >
            &minus;
          </button>
        </div>
      )}
    </div>
  );
};

Toolbar.propTypes = {
  editor: PropTypes.object.isRequired,
};

export default Toolbar;
