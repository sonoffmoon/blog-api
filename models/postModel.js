const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: String,
  authorId: String,
  createdAt: Date,
  topic: String,
  content: String,
});

module.exports = mongoose.model("Post", postSchema);
