const { 
  createPollRepository,
  fetchAllPollsFromDatabase,
  addVoteToPollInDatabase,
  findPoll,
  deletePollByIdInDatabase
} = require("../repositories/pollRepository");

const createNewPoll = async (question, options, userId) => {
  try {
    if (!options || options.length < 2) {
      throw new Error("Poll must have at least two options.");
    }
    return await createPollRepository(question, options, userId);
  } catch (error) {
    throw new Error(`Error creating poll: ${error.message}`);
  }
};

const getAllPollsService   = async () => {
  try {
    return await fetchAllPollsFromDatabase();
  } catch (error) {
    throw new Error(`Error fetching polls: ${error.message}`);
  }
};

const addVoteService  = async (pollId, optionId, userId) => {
  try {
    const poll = await findPoll(pollId);
    if (poll.voters.includes(userId)) {
      throw { message: "You have already voted on this poll", statusCode: 400 };
    }

    const option = poll.options.find((o) => o._id.toString() === optionId);
    if (!option) {
      throw new Error("Option not found");
    }

    return await addVoteToPollInDatabase(pollId, optionId, userId);
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

const deletePollService  = async (pollId) => {
  try {
    const poll = await findPoll(pollId);
    if (!poll) {
      throw new Error("Poll not found");
    }
    await deletePollByIdInDatabase(pollId);
  } catch (error) {
    throw new Error(`Error deleting poll: ${error.message}`);
  }
};

module.exports = {
  createNewPoll,
  getAllPollsService,
  addVoteService,
  deletePollService
};
