const ChatModel = require("../models/chatModel");
const ChatNotification = require("../models/notificationModel");
const UserModel = require("../models/userModel")


const createChat = async (data) => {
    try {
        
      return await ChatModel.create({
        user: data.userName,   
        userId: data.userID,  
        message: data.message,  
        groupId: data.groupId || 'general', 
      });
    } catch (error) {
      console.error('Error while creating chat:', error);
    }
  };

  const createNotification = async (chatData) => {
    try {
      return await ChatNotification.create({
        senderId: chatData.userId,
        message: chatData.message,
      })
    } catch (error) {
      console.error('Error while creating chat notification:', error);
    }
  }

  const fetchAllMessages = async () => {
    try {
        const messages = await ChatModel.find()
        return messages
        
    } catch (error) {
        console.error('Error while fetching chat:', error);
    }
  }


  const fetchNotifications = async () => {
    try {
      return await ChatNotification.find()
    } catch (error) {
      console.error('Error while fetching notificatios:', error);
    }
  }

  
module.exports = {
    createChat,
    fetchAllMessages,
    createNotification,
    fetchNotifications
}