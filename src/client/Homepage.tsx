import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {AuthContext} from './context/auth';

export class Homepage extends Component<{},{}> {
    static contextType = AuthContext;
    //FAROFF: draw pretty homepage
    render() {
        let isAuthenticated = this.context;

        return (
            <div className= 'homepage'>
            
                <h1>MOODY Hompage, ik... its pretty sparse</h1>
                <div id='toolbar'> <Link to = '/login'>Login: </Link> </div>
            </div>
        )
    }
}

export default Homepage;

