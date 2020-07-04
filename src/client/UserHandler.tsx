import * as React from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
const WebSocket = require('ws');

export const BackendAuth = {
    isAuthenticated: false,
    authenticate(id_token: string, cb: Function) {
        //WRITEME: google id validation with my websocket backend
        //checks if a token is already cached, if not attempts to authenticate and caches token
    }
}
export interface backendAuthResponse{
    success: boolean,
    secure_socket: WebSocket | null
}

interface StateInterface{
    redirectToReferrer: boolean,
    loginFailed: boolean,
    error: string,
    hasLoginToken: boolean,
    wsocket: WebSocket | null
}
export default class UserHandler extends React.Component<{ location: any }, StateInterface>{
    constructor(props:any){
        super(props);
        this.state = {
            redirectToReferrer: false,
            loginFailed: false,
            error: '',
            hasLoginToken: false,
            wsocket: null
        };
    }
    

    login = (id: string) => {
        //WRITEME: get id token from localstorage
        
        BackendAuth.authenticate(id,
            (err:string, res:backendAuthResponse) => { 
                if(res.success) this.setState({ wsocket: res.secure_socket, redirectToReferrer: true });
                else this.setState({error: err, loginFailed: true, hasLoginToken: false});
            }
        );
        // on fail set login failure to send message to rendered output
    }

    componentDidMount() {
        //WRITEME: check localstorage cache for valid id_token and if possible skip user having to manually log in
        //WRITEME: useeffect when the hasLoginToken changes to true then attempt to communicate 
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };

        if (this.state.redirectToReferrer) {
            //TODO: redirect with websocket as extra prop
            return (
                <Redirect to={from} />
            )
        }

        const processGoogleResponse = (response: any) => {
            console.log(response);
            var res = response.profileObj;
            console.log(res);
            //TODO: if successful, write id_token to localstorage
        }

        //FAROFF_TODO: make userlogin pretty
        if (!this.state.hasLoginToken) return (
            <div id='google-login-panel'>
                {(this.state.loginFailed) ? <div id='google-login-failed'>that didn't seem to work, try again</div> : <div />}
                {(this.state.error) ? <div id='backend-login-error'>Encountered critical backend error while attempting to log in: {this.state.error}</div> : <div />}
                <p> You must log in to view the content at {from.pathname} </p>
                <GoogleLoginComponent processResponse={processGoogleResponse} />
            </div>
        );
        return (
            <div id='google-login-processing'>
                You must log in to view the content at {from.pathname}. You already seem to have a google_id_token stored with us, attempting to login to MOODY backend server now...
            </div>
        )
    }
}

// used to obtain id_token if one isn't cached yet
const GoogleLoginComponent = (processResponse: any) => {
    return (
        <div className="google-login-button">
            <div className="row">
                <div className="col-sm-12 btn btn-info">
                    Login With Google
                </div>
            </div>
            <div className="row">
                <div style={{ 'paddingTop': "20px" }} className="col-sm-12">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <GoogleLogin
                                    {/*FIXME: setup google project and get google clientid */}
                            clientId="788786912619-k4tb19vgofvmn97q1vsti1u8fnf8j6pa.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={processResponse}
                            onFailure={processResponse} ></GoogleLogin>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        </div>
    );
}
