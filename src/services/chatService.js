const {
  createChat,
  fetchAllMessages,
  createNotification,
  fetchNotifications,
  getUsersInGroup,
  deleteAllNotifications,
} = require("../repositories/chatRepository");

const chatData = async (data) => {
  try {
    const chatData = await createChat(data);
    const users = await getUsersInGroup();
    if (chatData) {
      for (const user of users) {
        await createNotification(chatData, user);
      }
    }
    return chatData;
  } catch (error) {
    console.log("Error while creating chat", error);
  }
};

const messages = async () => {
  try {
    return await fetchAllMessages();
  } catch (error) {
    console.log("Error while finding chat", error);
  }
};

const notifications = async () => {
  try {
    return await fetchNotifications();
  } catch (error) {
    console.log("Error while finding notifications", error);
  }
};

const removeNotifications = async (userId) => {
  try {
    const users = await getUsersInGroup();
    for (const user of users) {
      await deleteAllNotifications(userId, user);
    }
  } catch (error) {
    console.log("Error while clearing notifications:", error);
  }
};

module.exports = {
  chatData,
  messages,
  notifications,
  removeNotifications,
};
