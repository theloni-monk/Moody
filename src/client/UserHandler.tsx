import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { useAuth } from './context/auth';
import { token_format } from './App';


const store = require('store');
var expirePlugin = require('store/plugins/expire');
store.addPlugin(expirePlugin);

const secrets = require('../secrets.json'); // stores google clientid

interface PropInterface {
    location: any, //its a really long type - its the locatino field of the react-router dom object passed to it
    setAuth: Function
}
interface StateInterface {
    redirectToReferrer: boolean,
    loginFailed: boolean,
    errorMsg: string,
    hasLoginToken: boolean
}
const UserHandler: React.FC<PropInterface> = (location: any, setAuth: Function) => {

    const [loginFailed, setLoginFailed] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [hasLoginToken, setHasLoginToken] = useState(false)

    const { loggedIn } = useAuth();


    //component did mount
    useEffect(() => {
        store.removeExpiredKeys();
        if (store.get('token')) { // this state shouldn't be possible, bc you shouldn't have to obtain a new key if you already have one that isn't expired
            setHasLoginToken(true);
            setAuth(store.get('token'));
        }

    }, []
    );




    const { from } = location.state || { from: { pathname: '/' } };


    if (loggedIn) {
        //When we setAuth to the new token, we told the App to reassess the token and try to use it to log into the backend
        //if that backend login succeeeded we set the loggedIn variable from the context provider in the app to true
        //thus telling us to redirect back to where we wanted to go originally
        return (
            <Redirect to={from} />
        )
    }

    const processResponse = (response: any) => {
        console.log('processing google response')
        var token_obj = response.tokenObj;
        let token: token_format = { id_token: token_obj.id_token, expiration: token_obj.expires_at }
        setAuth(token) // will trigger the app to reassess the token and try to use it to log into the backend
    }

    //FAROFF: make userlogin pretty
    if (!hasLoginToken) return (
        <div id='google-login-panel'>
            {(loginFailed) ? <div id='google-login-failed'>that didn't seem to work, try again</div> : <div />}
            {(errorMsg) ? <div id='backend-login-error'>Encountered critical backend error while attempting to log in: {errorMsg}</div> : <div />}
            <p> You must log in to view the content at {from.pathname} </p>
            <div className="google-login-button">
                <GoogleLogin
                    clientId={secrets.google_client_id}
                    buttonText="Login with Google"
                    onSuccess={res => { console.log('google-login succ', res); processResponse(res) }}
                    onFailure={err => { console.log('google-login fail', err); setLoginFailed(true); setErrorMsg(err.message); }} />
            </div>
        </div>
    );
    return (
        <div id='google-login-processing'>
            You must log in to view the content at {from.pathname}. Your google_id_token is processing, you will be redirected shortly...
        </div>
    )
}

export default UserHandler;