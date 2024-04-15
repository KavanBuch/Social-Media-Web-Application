import PostMessage from "../models/postMessage.js";

const auth = async (req, res, next) => {
  try {
    const user = req.session?.passport?.user;
    if (!user) {
      return res.status(400).json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    const post = await PostMessage.findById(id);
    if (!post) {
      return res.status(400).json({ error: "post not found" });
    }
    if (user != post.creator) {
      return res.status(400).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
