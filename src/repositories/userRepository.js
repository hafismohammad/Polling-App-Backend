const PollModel = require("../models/pollModel");
const UserModel = require("../models/userModel");

const createUser = async (data) => {
  try {
    return await UserModel.create(data);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

const getUserByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user");
  }
};

const fetchUserById = async (userId) => {
  try {
    return await UserModel.findById(userId);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user");
  }
};

const fetchAllVoters = async () => {
  try {
    return await PollModel.find()
  } catch (error) {
    throw new Error('Failed to fetch voter')
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  fetchUserById,
  fetchAllVoters
};
