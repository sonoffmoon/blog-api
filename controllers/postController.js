const Post = require("../models/postModel");
const PostService = require("../services/postService");

class PostController {
  async createPost(req, res) {
    const { author, authorId, topic, content } = req.body;
    console.log(author, authorId, topic, content);

    const createdAt = Date.now();
    const post = await PostService.createPost(
      author,
      authorId,
      createdAt,
      topic,
      content
    );
    res.json(post);
  }

  // async getAllPosts(req, res, next) {
  //   try {
  //     const { author } = req.query;

  //     const posts = await PostService.getAllPosts(author);
  //     res.json(posts);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async getAllPosts(req, res, next) {
    try {
      const { author, page } = req.query;
      const perPage = 18;
      const pageNumber = parseInt(page) || 1;
      const skip = (pageNumber - 1) * perPage;

      const posts = await PostService.getAllPosts(author, skip, perPage);

      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  async getPost(req, res, next) {
    const { id } = req.params;

    const post = await PostService.getPost(id);
    res.json(post);
  }

  async editPost(req, res, next) {
    const { id } = req.params;
    const { topic, content } = req.body;
    console.log(content);

    const post = await PostService.editPost(id, { topic, content });
    res.json(post);
  }

  async deletePost(req, res, next) {
    const { id } = req.params;

    await PostService.deletePost(id);
    res.json({ message: "Post deleted" });
  }
}

module.exports = new PostController();
