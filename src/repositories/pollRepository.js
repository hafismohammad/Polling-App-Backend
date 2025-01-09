const PollModel = require("../models/pollModel");

const createPoll = async (question, options, userId) => {
  try {
    const poll = {
      userId: userId,
      question,
      options: options.map((option) => ({
        option,
        votes: 0,
      })),
    };

    return (newPoll = await PollModel.create(poll));
  } catch (error) {
    throw error;
  }
};

const getPolls = () => {
  try {
    return PollModel.find().sort({ createdAt: -1 });;
  } catch (error) {
    throw error;
  }
};

const findPoll = async (pollId) => {
  try {
    return await PollModel.findById(pollId); 
  } catch (error) {
    console.error("Error while finding the poll", error);
    throw error;
  }
};

const addVote = async (pollId,optionId,userId) => {
  try {
    const result = await PollModel.findOneAndUpdate(
      { _id: pollId },
      {
        $inc: { "options.$[option].votes": 1 },
        $push: { voters: userId }, 
      },
      {
        arrayFilters: [{ "option._id": optionId }],
        new: true, 
      }
    );
    if (!result) {
      throw new Error("Poll not found or update failed");
    }
    return result;
  } catch (error) {
    console.error("Error while updating the poll", error);
    throw error; 
  }
}

const deletePoll = async (pollId) => {
  try {
    return await PollModel.findByIdAndDelete(pollId)
  } catch (error) {
    
  }
}

module.exports = {
  createPoll,
  getPolls,
  addVote,
  findPoll,
  deletePoll
};
