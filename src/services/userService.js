const { createUser, getuser, fetchUser } = require("../repositories/userRepository");
const { generateAccessToken } = require("../utils/utils");
const bcrypt = require("bcrypt");

const signUp = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password: hashedPassword,
    };
    const accessToken = generateAccessToken(userData.id);
    const newUser = await createUser(userData);
    return { newUser, accessToken };
  } catch (error) {
    console.log("Error during signup", error);
    throw error;
  }
};

const login = async (data) => {
  try {
    const user = await getuser(data);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      l;
      throw new Error("Invalid email or password");
    }
    const accessToken = generateAccessToken(user.id);
    return accessToken;
  } catch (error) {
    throw new Error(error.message);
  }
};

const userData = async  (userId) => {
  try {
     const user = await fetchUser(userId)
     const userData = {
      id: user._id, 
      name: user.name, 
    };
     return userData
  } catch (error) {
    throw error;
  }
}

module.exports = {
  signUp,
  login,
  userData
};
