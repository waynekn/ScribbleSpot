import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogByTitle } from "../../store/blog/blog-post.slice";
import { selectBlogPost } from "../../store/blog/blog-post.selector";
import { setNotificationMessage } from "../../store/blog/blog-post.slice";
import { fetchTitles } from "../../api-requests/requests";
import MessageToast from "../toast/toast.component";
import { selectProfile } from "../../store/profile/profile.selector";
import {
  BlogLink,
  BlogLinkContainer,
  DeleteBlogButton,
} from "./blog-preview.styles";
const BlogPreview = () => {
  const [blogTitles, setBlogTitles] = useState([]);
  const dispatch = useDispatch();
  const blog = useSelector(selectBlogPost);
  const profile = useSelector(selectProfile);

  useEffect(() => {
    const getTitles = async () => {
      try {
        const { titles } = await fetchTitles(profile.userName);
        setBlogTitles(titles);
      } catch (error) {
        dispatch(setNotificationMessage(error.message));
      }
    };
    getTitles();
  }, [dispatch, profile.userName]);

  const handleDelete = (e) => {
    const title = e.target.dataset.title;
    dispatch(deleteBlogByTitle(title))
      .unwrap()
      .then((successMessage) => {
        const updatedBlogTitles = blogTitles.filter(
          (blogTitle) => blogTitle.title !== title
        );
        setBlogTitles(updatedBlogTitles);
        dispatch(setNotificationMessage(successMessage));
      })
      .catch((errorMessage) => dispatch(setNotificationMessage(errorMessage)));
  };

  return (
    <div>
      {blogTitles.map((blogTitle) => (
        <BlogLinkContainer key={blogTitle.title}>
          <BlogLink
            key={blogTitle.title}
            to={blog.isLoading ? "#" : blogTitle.titleSlug}
          >
            {blogTitle.title}
          </BlogLink>
          <DeleteBlogButton disabled={blog.isLoading}>
            <i
              onClick={handleDelete}
              data-title={blogTitle.title}
              className="fa-solid fa-trash"
            ></i>
          </DeleteBlogButton>
        </BlogLinkContainer>
      ))}
      {blog.notification && <MessageToast message={blog.notification} />}
    </div>
  );
};

export default BlogPreview;
