const { signUp, login, userData } = require("../services/userService");

const signUpUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await signUp(data);
    const token = newUser.accessToken;
    res.status(200).json({ message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error while signing up" });
  }
};

const loginUser = async (req, res) => {
  try {
     
     const data = req.body;
    const token = await login(data);
    
    res.status(200).json({ message: "User logged successfully", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user;
    const user = await userData(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signUpUser,
  loginUser,
  getUser,
};
