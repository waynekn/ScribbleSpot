import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotificationMessage } from "../../store/blog/blog-post.slice";
import { fetchTitles } from "../../api-requests/requests";
import {
  BlogLink,
  BlogLinkContainer,
  DeleteBlogButton,
} from "./blog-preview.styles";
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

  const handleDelete = (e) => {
    console.log(e.dataset);
  };

  return (
    <div>
      {blogTitles.map((blogTitle) => (
        <BlogLinkContainer key={blogTitle.title}>
          <BlogLink key={blogTitle.title} to={blogTitle.titleSlug}>
            {blogTitle.title}
          </BlogLink>
          <DeleteBlogButton>
            <i
              onClick={handleDelete}
              data-title={blogTitle.title}
              className="fa-solid fa-trash"
            ></i>
          </DeleteBlogButton>
        </BlogLinkContainer>
      ))}
    </div>
  );
};

export default BlogPreview;
