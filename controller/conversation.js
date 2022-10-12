import { ConversationModels } from "../models/ConversationModels.js";

export const postConversation = async (req, res) => {
  const newConversation = new ConversationModels({ members: req.body.members });
  try {
    const saveNewConversation = await newConversation.save();
    res.status(200).json(saveNewConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await ConversationModels.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
