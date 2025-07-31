const mongoose = require("mongoose");

const userSchema = new Schema({
  tgId: {
    type: Number,
    required: true,
    unique: true,
  },
  is_bot: Boolean,
  first_name: String,
  username: String,
  language_code: String,
  is_premium: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;


