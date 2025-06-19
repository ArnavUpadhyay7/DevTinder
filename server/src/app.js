const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
// add cors later

// ROUTERS -> 
const authRouter = require('./routes/auth.route');
const profileRouter = require('./routes/profile.route');
const requestRouter = require('./routes/request.routes');

app.use('/auth', authRouter);
app.use('/profile', profileRouter);     
app.use('/request', requestRouter);

const connectDb = require('./config/db');
connectDb();

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});