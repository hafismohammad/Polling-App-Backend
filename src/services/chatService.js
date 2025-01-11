const {
  createChat,
  fetchAllMessages,
  createNotification,
  fetchNotifications,
} = require("../repositories/chatRepository");

const chatData = async (data) => {
  try {
    const chatData = await createChat(data);

    if (chatData) {
      await createNotification(chatData);
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
        return await fetchNotifications()
    } catch (error) {
        console.log("Error while finding notifications", error);
    }
}

module.exports = {
  chatData,
  messages,
  notifications
};
