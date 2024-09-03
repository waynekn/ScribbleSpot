import blogs from "../../schemas/blog/blog.schema.js";

export const checkExistingTitle = async (authorId, title) => {
  return blogs.findOne({ authorId, title });
};

export const uploadBlog = async (
  authorId,
  displayName,
  title,
  titleSlug,
  content
) => {
  await blogs.create({ authorId, displayName, title, titleSlug, content });
};

export const fetchBlogTitles = async (authorId) => {
  return blogs.find({ authorId }, { _id: 0, title: 1, titleSlug: 1 });
};

export const fetchBlogContent = async (authorId, titleSlug) => {
  const posts = await blogs.findOne(
    { authorId, titleSlug },
    { _id: 0, title: 1, content: 1, displayName: 1 }
  );
  return posts;
};
