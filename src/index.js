const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const connectDB = require('./db/config')
const userRoutes = require('./routes/userRoutes')
const pollRoutes = require('./routes/pollRoute')
const chatRoutes = require('./routes/chatRoute')
const {app, server} = require('./socketIO/config')


dotenv.config()

connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoutes)
app.use('/api/poll', pollRoutes)
app.use('/api/chat', chatRoutes)

server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})