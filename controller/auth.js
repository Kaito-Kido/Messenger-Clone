import { UserModel } from "../models/UserModel.js";
import { hash, compare } from "bcrypt";
import { createRefreshToken, createToken } from "../JWT.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const findUser = await UserModel.findOne({ username: req.body.username });
    if (findUser)
      return res.status(409).json("This email is already registered");
    const hashPassword = await hash(req.body.password, 10);
    const user = {
      username: req.body.username,
      password: hashPassword,
      name: req.body.username,
    };
    const register = new UserModel(user);
    await register.save();
    res.status(200).json("registered");
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      const dbPassword = user.password;
      const match = await compare(req.body.password, dbPassword);
      if (match) {
        const accessToken = createToken(user);
        const refreshToken = createRefreshToken(user);
        const newToken = { refreshToken: refreshToken };
        await UserModel.findOneAndUpdate({ _id: user._id }, newToken, {
          new: true,
        });
        res.cookie("accessToken", accessToken, {
          maxAge: 15000000,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
        res.cookie("refreshToken", refreshToken, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
        res.status(200).json({ id: user._id, username: user.username });
      } else res.status(400).json("Wrong password");
    } else {
      res.status(400).json("Username doesn't exist");
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const handleRefresh = async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res.status(401).json("refreshToken has expired");
  }
  const user = await UserModel.findOne({ refreshToken: refreshToken });
  if (!user) return res.status(403).json("User doesn't exist"); //Forbidden

  const match = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (match) {
    const accessToken = createToken(user);
    res.cookie("accessToken", accessToken, {
      maxAge: 15000,
      httpOnly: true,
      sameSite: true,
      secure: true,
    });
    res.status(200).json(accessToken);
  } else {
    res.status(403).json("forbidden");
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) return res.status(403);
  try {
    await UserModel.findOneAndUpdate({ refreshToken: "" });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.status(200).json("logged out");
  } catch (err) {
    return res.status(403).json("User has been deleted");
  }
};
