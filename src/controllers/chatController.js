const { messages, notifications } = require("../services/chatService");



const findAllMessages = async (req, res) => {
    try {
        const allmessages = await messages()
        res.status(200).json({allmessages})
    } catch (error) {
        console.log('Error while finding chat', error);
    }
}

const findAllNotifications = async (req, res) => {
    try {
        const AllNotificaitons = await notifications()
        console.log('AllNotificaitons' , AllNotificaitons);
        
        res.status(200).json({AllNotificaitons})
    } catch (error) {
        console.log('Error while finding notifications', error);
    }
}

module.exports = {
    findAllMessages ,
    findAllNotifications
}