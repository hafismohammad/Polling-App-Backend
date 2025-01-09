const { pollData, allPolls, vote, poll, findAddDeletePoll } = require("../services/pollService");

const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    const userId = req.user;
    
    const poll = await pollData(question, options, userId);
    res.status(200).json({ message: "Poll created successfully", poll });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error while creating poll" });
  }
};

const getAllPolls = async (req, res) => {
  try {
    const polls = await allPolls();
    res.status(200).json({ polls });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error while finding all polls" });
  }
};

const addVote = async (req, res) => {
  try {
    const { id } = req.params; 
    const { optionId } = req.body; 
    const userId = req.user
    await vote(id, optionId, userId);
    res.status(200).json({ message: 'Vote added successfully' });
  } catch (error) {
    if (error.message === "You have already voted on this poll") {
      return res.status(403).json({ message: error.message });
    }
    res.status(400).json({ message: "Error while voting" });
  }
};

const deletePoll = async (req, res) => {
  try {
    const {id} = req.params
    await findAddDeletePoll(id)
    res.status(200).json({message: 'Poll deleted successfully'})
  } catch (error) {
    res.status(400).json({ message: "Error while deleting poll" });
  }
}

module.exports = {
  createPoll,
  getAllPolls,
  addVote,
  deletePoll
};
