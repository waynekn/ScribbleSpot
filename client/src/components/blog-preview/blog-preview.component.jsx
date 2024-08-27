import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotificationMessage } from "../../store/blog/blog-post.slice";
import { fetchTitles } from "../../api-requests/requests";
import { BlogLink } from "./blog-preview.styles";
const BlogPreview = () => {
  const [blogTitles, setBlogTitles] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTitles = async () => {
      try {
        const { titles } = await fetchTitles();
        setBlogTitles(titles);
      } catch (error) {
        dispatch(setNotificationMessage(error.message));
      }
    };
    getTitles();
  }, [dispatch]);

  return (
    <div>
      {blogTitles.map((blogPost) => (
        <BlogLink key={blogPost.title} to={blogPost.title}>
          {blogPost.title}
        </BlogLink>
      ))}
    </div>
  );
};

export default BlogPreview;
