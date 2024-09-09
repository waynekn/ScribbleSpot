import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogByTitle } from "../../store/blog/blog-post.slice";
import { selectBlogPost } from "../../store/blog/blog-post.selector";
import { setNotificationMessage } from "../../store/blog/blog-post.slice";
import { fetchTitles } from "../../api-requests/requests";
import MessageToast from "../toast/toast.component";
import { selectProfile } from "../../store/profile/profile.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import PropTypes from "prop-types";
import {
  BlogLink,
  BlogLinkContainer,
  DeleteBlogButton,
} from "./blog-preview.styles";
const BlogPreview = ({ index }) => {
  const [blogTitles, setBlogTitles] = useState([]);
  const dispatch = useDispatch();
  const blog = useSelector(selectBlogPost);
  const profile = useSelector(selectProfile);
  const currentUser = useSelector(selectCurrentUser);
  const [isOwnProfile, setIsOwnProfile] = useState(
    currentUser.userName === profile.userName
  );

  useEffect(() => {
    const getTitles = async () => {
      try {
        const { titles } = await fetchTitles(profile.userName);
        setBlogTitles(titles);
        setIsOwnProfile(currentUser.userName === profile.userName);
      } catch (error) {
        dispatch(setNotificationMessage(error.message));
      }
    };
    getTitles();
  }, [dispatch, profile.userName, currentUser.userName]);

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
            to={
              blog.isLoading
                ? "#"
                : index
                ? blogTitle.titleSlug
                : `../${blogTitle.titleSlug}`
            }
          >
            {blogTitle.title}
          </BlogLink>
          {isOwnProfile && (
            <DeleteBlogButton disabled={blog.isLoading}>
              <i
                onClick={handleDelete}
                data-title={blogTitle.title}
                className="fa-solid fa-trash"
              ></i>
            </DeleteBlogButton>
          )}
        </BlogLinkContainer>
      ))}
      {blog.notification && <MessageToast message={blog.notification} />}
    </div>
  );
};

BlogPreview.propTypes = {
  index: PropTypes.bool,
};

export default BlogPreview;
