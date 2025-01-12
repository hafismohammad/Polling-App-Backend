const {
  messages,
  notifications,
  removeNotifications,
} = require("../services/chatService");

const findAllMessages = async (req, res, next) => {
  try {
    const allmessages = await messages();
    res.status(200).json({ allmessages });
  } catch (error) {
   next(error)
  }
};

const findAllNotifications = async (req, res, next) => {
  try {
    const AllNotificaitons = await notifications();
    res.status(200).json({ AllNotificaitons });
  } catch (error) {
    next(error)
  }
};

const clearNotifications = async (req, res, next) => {
  try {
    const userId = req.user;
    await removeNotifications(userId);
    res.status(200).json({ message: "Notifications cleared successfully" });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  findAllMessages,
  findAllNotifications,
  clearNotifications,
};
