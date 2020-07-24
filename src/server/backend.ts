const express = require('express');
const { userRouter, authRouter, moodRouter, moodConfigRouter } = require('./routes');
const secrets = require('../secrets.json');

var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // json parser middleware
app.use(bodyParser.urlencoded({ extended: true })); 

const session = require('express-session');
app.use(session({
    secret: secrets.session_secret,
    name: 'sessionId',
    cookie: {
        secure: true,
        httpOnly: true
      }
 }));

const cors = require('cors');
app.use(cors()); // allow all Cross Origin Requests (i.e. localhost:3000 -> localhost:5000)

const helmet = require('helmet'); // a collection of various protections as a middleware
app.use(helmet());
app.set('trust proxy', 1); // trust first proxy

const port = process.env.PORT || "5000";


app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/users:uid', moodRouter);

app.use('/users/:uid/config', moodConfigRouter);

app.listen(port, function(){
    console.log('backend server listening at port', port);
});
export function dummy(){console.log('dumb');}