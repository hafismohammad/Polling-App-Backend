const mongoose = require("mongoose")
const { Schema } = require("mongoose")

const chatMessageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    groupId: {
        type: String,
        default: 'general',
    }
})

const ChatModel = mongoose.model('Chat', chatMessageSchema)
module.exports = ChatModel