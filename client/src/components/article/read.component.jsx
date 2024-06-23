import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { DeltaContext } from "../../contexts/delta.context";
import "react-quill/dist/quill.bubble.css";

const Article = () => {
  const { delta } = useContext(DeltaContext);
  const [editorValue, setEditorValue] = useState({});
  console.log(editorValue);

  useEffect(() => {
    if (delta) {
      setEditorValue(delta);
    }
  }, [delta]);

  return (
    <div>
      <ReactQuill value={editorValue} readOnly={true} theme="bubble" />
    </div>
  );
};

export default Article;
