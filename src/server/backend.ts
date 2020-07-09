const secrets = require('../secrets.json');

const {OAuth2Client} = require('google-auth-library');
const gClient = new OAuth2Client(secrets.google_client_id);

import express, { Request, Response } from 'express';

var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // json parser middleware
//app.use(bodyParser.urlencoded({ extended: true })); 

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

async function verifyAndExtract(token:string) {
    const ticket = await gClient.verifyIdToken({
        idToken: token,
        audience:  secrets.google_client_id
    });
    return ticket.getPayload();
    //payload['sub'] is a unique user id
}


interface User{
    email:string,
    email_verified:boolean,
    name: string, //fullname
    sub_id:string
}
//HACK: cast req to any in order to access its body
app.post('/login', function(req:Request, res:Response){
//WRITEME: backend session signing
    let tk:string = req.body['id_token'];
    console.log('authtk received',tk);
    let payload = verifyAndExtract(tk).catch(
        (err: Error) => { res.status(401).end(); return;} //TODO: seperate into different auth and user CRUD routes
    );
    
});


app.listen(port, function(){
    console.log('backend server listening at port', port);
});