import blogs from "../../schemas/blog/blog.schema.js";

export const checkExistingTitle = async (authorId, title) => {
  return blogs.findOne({ authorId, title });
};

export const uploadBlog = async (
  authorId,
  userName,
  title,
  titleSlug,
  content,
  datePosted
) => {
  await blogs.create({
    authorId,
    userName,
    title,
    titleSlug,
    content,
    datePosted,
  });
};

export const fetchBlogTitles = async (userName) => {
  return blogs
    .find({ userName }, { _id: 0, title: 1, titleSlug: 1 })
    .sort({ datePosted: -1 });
};

export const fetchBlogContent = async (userName, titleSlug) => {
  const posts = await blogs.findOne(
    { userName, titleSlug },
    { _id: 0, title: 1, content: 1, userName: 1, datePosted: 1 }
  );
  return posts;
};

export const deleteBlog = async (authorId, title) => {
  return blogs.findOneAndDelete({ authorId, title });
};
