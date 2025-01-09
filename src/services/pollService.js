const {
  createPoll,
  getPolls,
  addVote,
  findPoll,
  deletePoll,
} = require("../repositories/pollRepository");

const pollData = async (question, options, userId) => {
  try {
    return await createPoll(question, options, userId);
  } catch (error) {
    console.log("Error during poll creation", error);
    throw error;
  }
};

const allPolls = async () => {
  try {
    return await getPolls();
  } catch (error) {
    console.log("Error during finding poll", error);
    throw error;
  }
};

const vote = async (pollId, optionId, userId) => {
  try {
    const poll = await findPoll(pollId);
    if (poll.voters.includes(userId)) {
      console.log('You have already voted on this poll');
      throw new Error("You have already voted on this poll"); 
    }
    const option = poll.options.find(o => o._id.toString() === optionId);
    if (option) {
      return await addVote(pollId, optionId, userId);
    } else {
      throw new Error("Option not found");
    }
  } catch (error) {
    console.error("Error during voting", error);
    throw error; 
  }
};

const findAddDeletePoll = async (pollId) => {
  try {
    return await deletePoll(pollId)
  } catch (error) {
    
  }
}

module.exports = {
  pollData,
  allPolls,
  vote,
  findAddDeletePoll
};
