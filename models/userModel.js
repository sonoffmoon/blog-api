const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, reqired: true },
  // login: {
  //   type: String,
  //   trim: true,
  //   required: [true],
  // },
  password: {
    type: String,
    required: true,
  },

  // passwordConfirm: {
  //   type: String,
  //   validate: {
  //     validator: function (val) {
  //       return val === this.password;
  //     },
  //     message: "passwords are not matching",
  //   },
  // },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

// userSchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, 12);
//   this.passwordConfirm = undefined;
//   next();
// });

// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", UserSchema);
