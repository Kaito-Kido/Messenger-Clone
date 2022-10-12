import { MessageModels } from "../models/MessageModels.js";

export const postMessage = async (req, res) => {
  try {
    const newMessage = new MessageModels(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessage = async (req, res) => {
  try {
    const messages = await MessageModels.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
