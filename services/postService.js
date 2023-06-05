const ApiError = require("../exeptions/error");
const PostModel = require("../models/postModel");

class PostService {
  async createPost(author, authorId, createdAt, topic, content) {
    console.log(topic);
    content = content.replace(/&lt;/g, "<");
    const post = await PostModel.create({
      author,
      authorId,
      createdAt,
      topic,
      createdAt,
      topic,
      content,
    });

    return post;
  }

  async getAllPosts(author, skip, perPage) {
    try {
      let query = {};

      if (author) {
        query = { author: author };
      }

      const posts = await PostModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage);

      if (!posts) {
        throw new ApiError.BadRequest("Cannot find posts");
      }

      return posts;
    } catch (err) {
      throw err;
    }
  }

  async getPost(id) {
    console.log(id);
    const post = await PostModel.findOne({ _id: id });

    if (!post) {
      throw ApiError.BadRequest("Post not found");
    }

    return post;
  }

  async editPost(id, changes) {
    let { topic, content } = changes;
    content = content.replace(/&lt;/g, "<");
    let post = await PostModel.findOne({ _id: id });

    if (!post) {
      throw ApiError.BadRequest("Post not found");
    }

    post.topic = topic;
    post.content = content;

    post = await post.save();

    return post;
  }

  async deletePost(id) {
    if (!id) {
      throw ApiError.BadRequest("Post does not exist");
    }

    await PostModel.deleteOne({ _id: id });
  }
}

module.exports = new PostService();
