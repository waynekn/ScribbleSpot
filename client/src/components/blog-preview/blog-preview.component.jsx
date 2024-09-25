import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogByTitle } from "../../store/blog/blog.slice";
import { selectBlogPost } from "../../store/blog/blog.selector";
import { setBlogNotificationMessage } from "../../store/blog/blog.slice";
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
        dispatch(setBlogNotificationMessage(error.message));
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
        dispatch(setBlogNotificationMessage(successMessage));
      })
      .catch((errorMessage) =>
        dispatch(setBlogNotificationMessage(errorMessage))
      );
  };

  if (!blogTitles.length) {
    return (
      <p>{`${
        currentUser?.userName === profile.userName
          ? `You have not posted any blog yet. Posts that you make will appear here. `
          : `${profile.userName} has not posted any blog`
      }`}</p>
    );
  }

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
                className="bi bi-trash"
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
