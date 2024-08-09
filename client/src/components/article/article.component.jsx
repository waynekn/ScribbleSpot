import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const Article = () => {
  const [editorValue, setEditorValue] = useState({});
  console.log(editorValue);

  return (
    <div>
      <ReactQuill value={editorValue} readOnly={true} theme="bubble" />
    </div>
  );
};

export default Article;
