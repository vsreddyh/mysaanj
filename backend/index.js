const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const approute = require('./route');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const port = process.env.PORT||3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const uri = process.env.MONGO_URL;
mongoose.connect(uri);
var store = new MongoDBStore({
    uri: uri,
    collection: 'mySessions',
    ttl: 14 * 24 * 60 * 60
});
app.set("trust proxy", 1);
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        store: store,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: isProduction,
            maxAge: 14 * 24 * 60 * 60 * 1000, //14 days
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
