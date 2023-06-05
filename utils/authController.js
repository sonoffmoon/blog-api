// const { promisify } = require("util");
// const cookie = require("cookie");
// const User = require("../models/userModel");
// const jwt = require("jsonwebtoken");

// exports.authCheck = async (req, res) => {
//   console.log("AUTH CHECK");
//   try {
//     const token = req.cookies.jwt;
//     console.log("TOKEN" + token);
//     if (!token) {
//       return res.status(401).json({ isAuthenticated: false });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const currentUser = await User.findById(decoded.id);
//     if (!currentUser) {
//       return res.status(401).json({ isAuthenticated: false });
//     }

//     res.status(200).json({ isAuthenticated: true });
//   } catch (err) {
//     res.status(401).json({ isAuthenticated: false });
//   }
// };

// exports.createUser = async (req, res, next) => {
//   const { login, password, passwordConfirm } = req.body;

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ login });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create a new user
//     const user = await User.create({ login, password, passwordConfirm });

//     // Create token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     });

//     // Set cookie
//     res.cookie("jwt", token, { httpOnly: true });

//     res.status(201).json({
//       status: "success",
//       token,
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({ status: "fail", error });
//   }
// };

// exports.logInUser = async (req, res, next) => {
//   const { login, password } = req.body;

//   try {
//     // Check if user exists and password is correct
//     const user = await User.findOne({ login }).select("+password");
//     if (!user || !(await user.correctPassword(password, user.password))) {
//       return res.status(401).json({ message: "Incorrect login or password" });
//     }

//     // If everything is ok, send token to client
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     });

//     // Set cookie
//     res.cookie("jwt", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none", // if your client and server are on different domains
//     });
//     res.status(200).json({
//       status: "success",
//       token,
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({ status: "fail", error });
//   }
// };
