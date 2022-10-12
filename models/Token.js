import mongoose from "mongoose";

const schema = mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

export const TokenModel = ("RefreshToken", schema);
