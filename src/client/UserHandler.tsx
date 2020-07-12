import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';


import { AuthContext } from './context/auth';
import { token_format, removeExpiredTokens } from './App';

import { writeStorage} from '@rehooks/local-storage';
import { render } from '@testing-library/react';

const secrets = require('../secrets.json'); // stores google clientid


class UserHandler extends React.Component<any, any> {

    static contextType = AuthContext;

    state = {
        loginFailed:false,
        errorMsg: '',
        hasLoginToken: false
    }

    readonly from:any; 
    constructor(props:any){
        super(props);

        const{ from } = props.location.state || {from: {pathname: ''}}; 
        this.from = from;
    }

    render() {
        let loggedIn = this.context.loggedIn;

        if (loggedIn) {
            //When we setAuth to the new token, we told the App to reassess the token and try to use it to log into the backend
            //if that backend login succeeeded we set the loggedIn variable from the context provider in the app to true
            //thus telling us to redirect back to where we wanted to go originally
            console.log('UserHandler recongnized loggedIn context set to true');
            
            return (
                <Redirect to={this.from} />
            )
        }

        const processResponse = (response: any) => {
            console.log('processing google response')
            var token_obj = response.tokenObj;
            let tk: token_format = { id_token: token_obj.id_token, expiration: token_obj.expires_at }
            this.setState({hasLoginToken:true});
            writeStorage('google_token', JSON.stringify(tk)); // will trigger the app to reassess the token and try to use it to log into the backend
        }

        //TODO: make userlogin pretty
        if (!this.state.hasLoginToken) return (
            <div id='google-login-panel'>
                {(this.state.loginFailed) ? <div id='google-login-failed'>that didn't seem to work, try again</div> : <div />}
                {(this.state.errorMsg) ? <div id='backend-login-error'>Encountered critical backend error while attempting to log in: {this.state.errorMsg}</div> : <div />}
                {(this.from.pathname)? <p> You must log in to view the content at {this.from.pathname} </p>: <p/>}
                <div className="google-login-button">
                    <GoogleLogin
                        clientId={secrets.google_client_id}
                        buttonText="Login with Google"
                        onSuccess={res => { console.log('google-login succ', res); processResponse(res) }}
                        onFailure={err => { console.log('google-login fail', err); this.setState({loginFailed: true, errorMsg: err.message});}} />
                </div>
            </div>
        );
        return (
            <div id='google-login-processing'>
                You must log in to view the content at {this.from.pathname}. Your google_id_token is processing, you will be redirected shortly...
            </div>
        )
    }
}

export default UserHandler;