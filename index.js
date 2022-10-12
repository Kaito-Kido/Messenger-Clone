import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import posts from "./routes/posts.js";
import mongoose from "mongoose";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import conversation from "./routes/conversation.js";
import message from "./routes/message.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import { validateToken } from "./JWT.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000", "http://192.168.116.138:3000"],
    credentials: true,
  },
});
app.use(express.static(path.join(__dirname, "/client/build")));

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.116.138:3000"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", auth);
app.use(validateToken);
app.use("/user", user);
// app.use("/posts", posts);
app.use("/conversation", conversation);
app.use("/message", message);

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (users, socketId) => {
  const ret = users.filter((user) => {
    return user.socketId !== socketId;
  });
  return ret;
};

const findSocket = (id) => {
  const ret = users.find((user) => {
    return user.userId === id;
  });
  return ret;
};

io.on("connection", (socket) => {
  socket.on("send", (data) => {
    socket.broadcast.emit("receive", data);
  });

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("onlineFriend", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiverSocket = findSocket(receiverId);
    io.to(receiverSocket?.socketId).emit("receiveMessage", { senderId, text });
  });

  socket.on("disconnect", () => {
    users = removeUser(users, socket.id);
    io.emit("onlineFriend", users);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connect to DB");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
