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
import {
  setNotificationMessage,
  getBlog,
} from "../../store/blog/blog-post.slice";
import Spinner from "../spinner/spinner.component";
import { BlogContainer, UserName, BlogTitle, BlogContent } from "./blog.styles";

import { selectProfile } from "../../store/profile/profile.selector";
import { selectBlogPost } from "../../store/blog/blog-post.selector";
import "../editor/editor.styles.scss";

const Blog = () => {
  const { titleSlug } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const blog = useSelector(selectBlogPost);
  const [isLoading] = useState(blog.isLoading);
  const [datePosted, setDatePosted] = useState("");

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
    dispatch(getBlog({ titleSlug, userName: profile.userName }))
      .unwrap()
      .then((blog) => {
        const datePosted = new Date(blog.datePosted);
        const date = `${datePosted.getDate()}`.padStart(2, "0");
        const month = `${datePosted.getMonth()}`.padStart(2, "0");
        const year = `${datePosted.getFullYear()}`;
        const formatedDate = `${date}/${month}/${year}`;
        setDatePosted(formatedDate);
      })
      .catch((errorMessage) => {
        setNotificationMessage(errorMessage);
      });
  }, [titleSlug, dispatch, profile]);

  useEffect(() => {
    if (editor && blog.content) {
      editor.commands.setContent(blog.content);
    }
  }, [editor, blog.content]);

  if (isLoading) return <Spinner />;

  if (!editor) return <p>Couldn&apos;t get editor</p>;

  return (
    <BlogContainer>
      <BlogTitle>{blog.title}</BlogTitle>
      <UserName>
        Posted by {blog.userName} on {datePosted}
      </UserName>
      <BlogContent>
        <EditorContent editor={editor} />
      </BlogContent>
    </BlogContainer>
  );
};

export default Blog;
