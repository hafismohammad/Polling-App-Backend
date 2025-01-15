const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { chatData } = require("../services/chatService");
const { userData } = require("../services/userService");
dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORGIN,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    const isValidUser = await userData(data.userID);
    if (!isValidUser) return;

    await chatData(data);

    socket.broadcast.emit("receiveMessage", data);
  });

  socket.on("chatNotification", (userName, messages) => {
    socket.broadcast.emit("sendNotification", userName, messages);
  });

  socket.on("addVote", (pollData) => {
    socket.broadcast.emit("voteUpdated", pollData);
  });
  socket.on("removeVote", (pollData) => {
    socket.broadcast.emit("voteRemoved", pollData);
  });
  socket.on("removeVote", (pollData) => {
    socket.emit("voteRemoved", pollData);
  });
  
  socket.on("typing", (data) => {
    console.log("typing", data);

    socket.broadcast.emit("userTyping", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

module.exports = { app, io, server };
