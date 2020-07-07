import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {AuthContext} from './context/auth';

export class Homepage extends Component<{},{}> {
    static contextType = AuthContext;
    //TODO: make homepage pretty
    render() {
        let loggedIn = this.context.loggedIn;

        return (
            <div className= 'homepage'>
                <h1>MOODY Hompage, ik... its pretty sparse</h1>
                <div id='toolbar'> <Link to = '/login'>Login: </Link> </div>
                {loggedIn? <p>You are logged in</p>:<p>You are not logged in</p>}
            </div>
        )
    }
}

export default Homepage;

