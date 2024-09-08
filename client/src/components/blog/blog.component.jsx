import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { fetchBlogContent } from "../../api-requests/requests";
import { setNotificationMessage } from "../../store/blog/blog-post.slice";
import { BlogContainer, UserName, BlogTitle, BlogContent } from "./blog.styles";

import { selectProfile } from "../../store/profile/profile.selector";
import "../editor/editor.styles.scss";

const Blog = () => {
  const { titleSlug } = useParams();
  const [blog, setBlog] = useState({});
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

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
        const { blog } = await fetchBlogContent(titleSlug, profile.userName);
        setBlog(blog);
      } catch (error) {
        dispatch(setNotificationMessage(error.message));
      }
    };
    getBlog();
  }, [titleSlug, dispatch, profile]);

  useEffect(() => {
    if (editor && blog.content) {
      editor.commands.setContent(blog.content);
    }
  }, [editor, blog.content]);

  if (!editor) return <p>Couldn&apos;t get editor</p>;

  return (
    <BlogContainer>
      <BlogTitle>{blog.title}</BlogTitle>
      <UserName>Posted by {blog.userName}</UserName>
      <BlogContent>
        <EditorContent editor={editor} />
      </BlogContent>
    </BlogContainer>
  );
};

export default Blog;
