const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const PostController = require("../controllers/postController");
const postController = require("../controllers/postController");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);
router.get("/users/:id", UserController.getUser);
router.get("/users/:email", UserController.getUserByEmail);

router.get("/posts", PostController.getAllPosts);
router.get("/posts/:id", postController.getPost);
router.post("/posts/new", authMiddleware, PostController.createPost);
router.put("/posts/:id", authMiddleware, PostController.editPost);
router.delete("/posts/:id", authMiddleware, PostController.deletePost);

module.exports = router;
