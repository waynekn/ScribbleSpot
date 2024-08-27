import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { fetchBlogContent } from "../../api-requests/requests";
import { setNotificationMessage } from "../../store/blog/blog-post.slice";
import {
  BlogContainer,
  DisplayName,
  BlogTitle,
  BlogContent,
} from "./blog.styles";
import "../editor/editor.styles.scss";

const Blog = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState({});
  const dispatch = useDispatch();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Color,
      TextStyle,
      Underline,
      Subscript,
      Superscript,
    ],
    content: "",
    editable: false,
  });

  useEffect(() => {
    const getBlog = async () => {
      try {
        const { blog } = await fetchBlogContent(title);
        setBlog(blog);
      } catch (error) {
        dispatch(setNotificationMessage(error.message));
      }
    };
    getBlog();
  }, [title, dispatch]);

  useEffect(() => {
    if (editor && blog.content) {
      editor.commands.setContent(blog.content);
    }
  }, [editor, blog.content]);

  if (!editor) return <p>Couldn&apos;t get editor</p>;

  return (
    <BlogContainer>
      <BlogTitle>{title}</BlogTitle>
      <DisplayName>Posted by {blog.displayName}</DisplayName>
      <BlogContent>
        <EditorContent editor={editor} />
      </BlogContent>
    </BlogContainer>
  );
};

export default Blog;
