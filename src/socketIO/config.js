const express = require("express")
const http = require("http")
const { Server } = require('socket.io');
const dotenv = require('dotenv')
const { chatData, messages } = require("../services/chatService"); 
const {userData} = require("../services/userService");
const { emit } = require("process");
dotenv.config()

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORGIN,
        credentials: true,
    }
})

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  
    socket.on("sendMessage", async (data) => {
      const isValidUser = await userData(data.userID);
      if (!isValidUser) return;
  
      await chatData(data);
  
      socket.broadcast.emit("receiveMessage", data);
    });
  
    socket.on("chatNotification", ( userName, messages) => {
      socket.emit("sendNotification", userName, messages)
    })  
    

    socket.on("typing", ({ userName, groupId }) => {
        // console.log('typing', userName, groupId);
        
      socket.to(groupId).emit("userTyping", { userName });
    });
  
    socket.on("stopTyping", ({ userName, groupId }) => {
      socket.to(groupId).emit("userStoppedTyping", { userName });
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  
  

module.exports = {app, io, server}

