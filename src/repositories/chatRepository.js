const ChatModel = require("../models/chatModel");
const ChatNotification = require("../models/notificationModel");
const UserModel = require("../models/userModel");


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

  const getUsersInGroup = async () => {
    try {
      return await UserModel.find()
    } catch (error) {
      console.error('Error while fetching users:', error);
    }
  }



  const createNotification = async (chatData, user) => {
    try {
      return await ChatNotification.create({
        senderId: chatData.userId,
        receiverId:user._id,
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
      const notifications = await ChatNotification.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'senderId', 
            foreignField: '_id',
            as: 'senderDetails',
          },
        },
        {
          $unwind: '$senderDetails', 
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $project: {
            _id: 1, 
            message: 1, 
            createdAt: 1,
            senderId:1,
            receiverId: 1,
            senderName: '$senderDetails.name',
          },
        },
      ]);
  
      return notifications;
    } catch (error) {
      console.error('Error while fetching notifications:', error);
    }
  };
  
  const deleteAllNotifications = async (userId, user) => {
    try {
      const data = await ChatNotification.deleteMany({ receiverId: userId });  
      // console.log('Deleted notifications for user:', user.name); 
      return data;
    } catch (error) {
      console.error('Error while deleting notifications:', error);
    }
  };

  
module.exports = {
    createChat,
    fetchAllMessages,
    createNotification,
    fetchNotifications,
    getUsersInGroup,
    deleteAllNotifications
}