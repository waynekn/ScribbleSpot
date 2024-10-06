import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import Spinner from "../spinner/spinner.component";
import {
  BlogLinkContainer,
  BlogLink,
} from "../blog-preview/blog-preview.styles";
import { fetchCurrentUser } from "../../store/user/user.slice";

const LikesPreview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser(currentUser.userName))
      .unwrap()
      .then((user) => {
        setLikes(user.likedBlogs);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [currentUser.userName, dispatch]);

  if (isLoading) return <Spinner />;

  if (likes.length === 0) {
    return <p>You haven&apos;t liked any blogs</p>;
  }

  return (
    <div>
      {likes.map((likedBlog) => (
        <BlogLinkContainer key={likedBlog.title}>
          <BlogLink
            to={`../../blog/${likedBlog.titleSlug}/${likedBlog.blogId}`}
          >
            {likedBlog.title}
          </BlogLink>
        </BlogLinkContainer>
      ))}
    </div>
  );
};

export default LikesPreview;
