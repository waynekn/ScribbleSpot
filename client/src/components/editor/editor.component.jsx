import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  const handlePublishClick = () => {
    const delta = getDelta();
    console.log(delta);
    navigate("/stories");
  };

  const ConfirmButton = () => <i className="fa-solid fa-check"></i>;

  const CustomToolbar = () => (
    <div className="custom-toolbar">
      <select
        className="ql-header"
        defaultValue=""
        onChange={(e) => e.persist()}
      >
        <option value="1" />
        <option value="2" />
        <option selected />
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <select className="ql-color">
        <option value="red" />
        <option value="green" />
        <option value="blue" />
        <option value="orange" />
        <option value="violet" />
        <option value="#d0d1d2" />
        <option selected />
      </select>
      <button className="ql-link" />
      <button className="ql-confirm">
        <ConfirmButton />
      </button>
    </div>
  );

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
    <>
      <Button variant="success" onClick={handlePublishClick}>
        Publish
      </Button>

      <div className="text-editor">
        <CustomToolbar />
        <div className="editor">
          <ReactQuill ref={quillRef} modules={modules} />
        </div>
      </div>
    </>
  );
};

export default Editor;
