const {
  createNewPoll,
  getAllPollsService,
  addVoteService,
  deletePollService,
  removeVote

} = require("../services/pollService");

const createPoll = async (req, res, next) => {
  try {
    const { question, options } = req.body;
    const userId = req.user;
    const poll = await createNewPoll(question, options, userId);
    res.status(201).json({ status: 'success', message: "Poll created successfully", data: poll });
  } catch (error) {
   next(error)
  }
};

const fetchPolls = async (req, res, next) => {
  try {
    const polls = await getAllPollsService(); 
    res.status(200).json({ status: 'success', data: polls });
  } catch (error) {
   next(error)
  }
};

const addVoteToPoll = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionId } = req.body;
    const userId = req.user;
    await addVoteService(id, optionId, userId);
    res.status(200).json({ status: 'success', message: "Vote added successfully" });
  } catch (error) {
    const statusCode = error.statusCode || 500; 
    res.status(statusCode).json({ message: error.message || "Internal Server Error" });
  }
};

const deletePoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deletePollService(id);
    res.status(200).json({ status: 'success', message: "Poll deleted successfully" });
  } catch (error) {
    next(error)
  }
};

const updateVote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user; 
    await removeVote(id, userId);
    res.status(200).json({ status: "success", message: "Vote removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPoll,
  fetchPolls, 
  addVoteToPoll,
  deletePoll,
  updateVote
};
