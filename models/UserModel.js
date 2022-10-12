import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

export const UserModel = mongoose.model("User", schema);
