const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const approute = require('./route');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const port = process.env.PORT||3000;
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000',"exp://0ee2vv8-anonymous-8081.exp.direct","http://localhost:8081","https://mysaanj.vercel.app"],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const uri = process.env.MONGO_URL;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});
var store = new MongoDBStore({
    uri: uri,
    collection: 'mySessions',
});
app.set("trust proxy", 1);
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        store: store,
        saveUninitialized: false,
        cookie: {
            sameSite:"strict",
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 6 * 60 * 60 * 1000, //6 hours
            rolling: true, //whenever session is modified it resets expirytime
        },
    })
);
app.get('/', (req, res) => {
    res.json('Hello World!');
});
app.get('/welcome', (req, res) => {
    res.json('Hell');
});
app.use('/en', approute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});