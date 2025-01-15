const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    question: {
      type: String,
      required: true, 
      trim: true,     
    },
    options: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(), 
        },
        option: {
          type: String,
          required: true,
          trim: true,
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
    votedUsers: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        optionId: { type: Schema.Types.ObjectId, required: true },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now, 
    },
    updatedAt: {
      type: Date,
      default: Date.now, 
    },
  },
  { timestamps: true } 
);

const PollModel = mongoose.model('Poll', pollSchema);
module.exports = PollModel;
