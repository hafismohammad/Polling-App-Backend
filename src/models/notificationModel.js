const mongoose = require("mongoose");

const chatNotificationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    message: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true } 
);

const ChatNotification = mongoose.model("ChatNotification", chatNotificationSchema);

module.exports = ChatNotification;
