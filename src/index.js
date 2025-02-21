const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const connectDB = require('./db/config')
const userRoutes = require('./routes/userRoutes')
const pollRoutes = require('./routes/pollRoute')
const chatRoutes = require('./routes/chatRoute')
const errorHandler  = require('./middleware/errorMiddleware')
const {app, server} = require('./socketIO/config')



dotenv.config()
// console.log('process.env.CORS_ORGIN',process.env.CORS_ORGIN)
connectDB()
const corsOptions = {
    origin: process.env.CORS_ORGIN,
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

app.use('/api/user', userRoutes)
app.use('/api/poll', pollRoutes)
app.use('/api/chat', chatRoutes)

server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})