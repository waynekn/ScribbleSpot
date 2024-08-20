import { uploadBlog } from "../../models/posts/blog.model.mjs";
export const postBlog = async (req, res) => {
  try {
    const authorId = req.user.id;
    const title = req.body.title;
    const htmlContent = req.body.htmlContent;
    await uploadBlog(authorId, title, htmlContent);
    res.status(200).json({ message: "Post successfuly posted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
