const {
  createUser,
  getUserByEmail,
  fetchUserById,
} = require("../repositories/userRepository");
const { generateAccessToken } = require("../utils/utils");
const bcrypt = require("bcryptjs");

const signUp = async (data) => {
  try {
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      console.log("User already exists");
      throw { message: "Email already exists", statusCode: 400 };
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = {
      ...data,
      password: hashedPassword,
    };

    const newUser = await createUser(userData);
    const accessToken = generateAccessToken(newUser._id);
    return { token: accessToken };
  } catch (error) {
    if (error.message === "Email already exists") {
      throw error;
    }
    console.error("Error during signup:", error);
    throw new Error("Failed to create user");
  }
};

const login = async (data) => {
  try {
    const user = await getUserByEmail(data.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(user._id);
    return accessToken;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
};

const userData = async (userId) => {
  try {
    const user = await fetchUserById(userId);
    if (!user) throw new Error("User not found");

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to retrieve user data");
  }
};

module.exports = {
  signUp,
  login,
  userData,
};
