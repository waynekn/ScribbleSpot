import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import CustomToolbar from "../../editor-formats/toolbar";
import "react-quill/dist/quill.snow.css";
import { Article, Title } from "./editor.styles.jsx";

import Button from "react-bootstrap/Button";
const Editor = () => {
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const getDelta = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      return editor.getContents();
    }
  };

  const handleConfirm = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const cursorPosition = editor.getSelection().index;
      editor.insertText(cursorPosition, "✔");
      editor.setSelection(cursorPosition + 1);
    }
  };

  const handlePost = () => {
    const delta = getDelta();
    console.log(delta);
    navigate("/stories");
  };

  const modules = {
    toolbar: {
      container: ".custom-toolbar",
      handlers: {
        confirm: handleConfirm,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };
  return (
    <Article>
      <Title type="text" placeholder="Write the title of your post here" />
      <div className="text-editor">
        <CustomToolbar />
        <div className="editor">
          <ReactQuill
            ref={quillRef}
            modules={modules}
            placeholder="Write the body here..."
          />
        </div>
      </div>

      <Button variant="dark" onClick={handlePost}>
        Post
      </Button>
    </Article>
  );
};

export default Editor;
