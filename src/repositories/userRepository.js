const UserModel = require('../models/userModel')

const createUser = async (data) => {
   try {
    const response = await UserModel.create(data)
    return response
   } catch (error) {
    throw error
   }
    
}

const getuser = async (data) => {
  try {
    return await UserModel.findOne({email: data.email})
  } catch (error) {
    throw error
  }
}

const fetchUser = async (userId) => {
  try {
    return await UserModel.findById(userId)
  } catch (error) {
    
  }
}


module.exports = {
    createUser,
    getuser,
    fetchUser
}