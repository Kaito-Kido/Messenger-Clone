import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const ConversationModels = mongoose.model("Conversation", schema);
