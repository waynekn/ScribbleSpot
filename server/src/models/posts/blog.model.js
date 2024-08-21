import posts from "../../schemas/post/post.schema.js";

export const uploadBlog = async (authorId, title, htmlContent) => {
  try {
    const authorPost = await posts.findOne({ authorId });

    if (authorPost) {
      const existingBlog = authorPost.blogs.find(
        (blog) => blog.title === title
      );

      if (existingBlog) {
        throw new Error("Can't have posts with the same title");
      }

      authorPost.blogs.push({ title, content: htmlContent });
      await authorPost.save();
    } else {
      const newPost = new posts({
        authorId,
        blogs: [{ title, content: htmlContent }],
      });

      await newPost.save();
    }
  } catch (error) {
    console.error("Error uploading blog:", error);
    throw new Error("Error uploading blog");
  }
};
