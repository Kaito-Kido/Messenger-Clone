import { UserModel } from "../models/UserModel.js";

export const getUser = async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  const user = await UserModel.findOne({ refreshToken: refreshToken });
  try {
    res.status(200).json({ id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAUser = async (req, res) => {
  const userId = req.params.userId;
  const username = req.params.username;
  try {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: username });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    const updateUser = req.body;
    const user = await UserModel.findByIdAndUpdate(
      { refreshToken: refreshToken },
      updateUser,
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
