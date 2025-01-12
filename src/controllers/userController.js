const { signUp, login, userData } = require("../services/userService");

const signUpUser = async (req, res) => {
  try {
    const data = req.body;
    const { token } = await signUp(data);
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    const statusCode = error.statusCode || 500; 
    res.status(statusCode).json({ message: error.message || "Internal Server Error" });
  }
};


const loginUser = async (req, res, next) => {
  try {
    const data = req.body;
    const token = await login(data);
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    next(error); 
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.user; 
    const user = await userData(userId);
    res.status(200).json({ user });
  } catch (error) {
    next(error); 
  }
};

module.exports = {
  signUpUser,
  loginUser,
  getUser,
};
