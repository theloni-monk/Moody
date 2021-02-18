import express, { Request, Response } from 'express';

const secrets = require('../certs/secrets.json');
const {OAuth2Client} = require('google-auth-library');
const gClient = new OAuth2Client(secrets.google_client_id);

async function verifyAndExtract(token:string) {
    const ticket = await gClient.verifyIdToken({
        idToken: token,
        audience:  secrets.google_client_id
    });
    return ticket.getPayload();
    //payload['sub'] is a unique user id
}
export const router = express.Router({
    strict: true
});

//FIXME: first login req always fails
router.post('/', async (req: Request, res: Response) => {
    let tk:string = req.body['id_token'];
    console.log('authtk received',tk);
    let payload = await verifyAndExtract(tk).catch(
        (err: Error) => {console.log(err); console.log('Auth route unauthorized request'); res.status(401).end(); return;} 
    );
    console.log('decrypted payload: ', payload);
    //TODO: create/get user and return profile info and sign session with user_id
    res.status(200).send('some userdata').end();
    return;
});