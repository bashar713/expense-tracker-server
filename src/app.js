const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const { errorHandler, notFoundHandler } = require('./middlewares/errorMiddleware');
const userRouter = require('./routes/usersRoute/usersRoute');
const app = express();

//env
dotenv.config();

//dbConnect
dbConnect();

app.use(express.json());

//route
app.use('/api/users',userRouter);

//middleware Error
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;


