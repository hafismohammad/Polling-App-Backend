const PollModel = require("../models/pollModel");

const createPollRepository = async (question, options, userId) => {
  try {
    const poll = {
      userId: userId,
      question,
      options: options.map((option) => ({
        option,
        votes: 0,
      })),
      votedUsers: [],
    };

    return await PollModel.create(poll);
  } catch (error) {
    throw new Error(`Error creating poll in database: ${error.message}`);
  }
};

const fetchAllPollsFromDatabase = async () => {
  try {
    return await PollModel.find().sort({ createdAt: -1 });
  } catch (error) {
    throw new Error(`Error fetching polls from database: ${error.message}`);
  }
};

const findPoll = async (pollId) => {
  try {
    return await PollModel.findById(pollId);
  } catch (error) {
    throw new Error(`Error finding poll with ID ${pollId}: ${error.message}`);
  }
};

const addVoteToPollInDatabase = async (pollId, optionId, userId) => {
  try {
    console.log("hit controller", { pollId, optionId, userId });

    const result = await PollModel.findOneAndUpdate(
      { _id: pollId },
      {
        $inc: { "options.$[option].votes": 1 }, 
        $push: { votedUsers: { userId: userId, optionId: optionId } },
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
    throw new Error(`Error updating vote in database: ${error.message}`);
  }
};

const deletePollByIdInDatabase = async (pollId) => {
  try {
    await PollModel.findOneAndDelete(pollId);
  } catch (error) {
    throw new Error(`Error deleting poll with ID ${pollId}: ${error.message}`);
  }
};

const updateAllVote = async (pollId, userId, optionId) => {
  try {
    const response = await PollModel.updateOne(
      { _id: pollId },
      {
        $inc: { "options.$[option].votes": -1 },
        $pull: { votedUsers: { userId, optionId } },
      },
      {
        arrayFilters: [{ "option._id": optionId }],
        new: true,
      }
    );

    if (response.modifiedCount > 0) {
      console.log("Vote removed successfully");
    } else {
      console.log("No votes were updated");
    }
  } catch (error) {
    throw new Error(`Error updating specific vote: ${error.message}`);
  }
};

module.exports = {
  createPollRepository,
  fetchAllPollsFromDatabase,
  addVoteToPollInDatabase,
  findPoll,
  deletePollByIdInDatabase,
  updateAllVote,
};
