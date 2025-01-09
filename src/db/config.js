const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async () => {
    const uri = process.env.MONGO_URI || ''
    try {
        await mongoose.connect(uri)
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('MongoDB connection error', error); 
        process.exit(1); 
    }
}

module.exports = connectDB