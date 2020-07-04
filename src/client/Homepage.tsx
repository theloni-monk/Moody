import React, { Component } from 'react'
import { Link } from 'react-router-dom';
interface StateInterface{
    isAuthenticated:boolean
}
export class Homepage extends Component<{},StateInterface> {
    state = {
        isAuthenticated:false
    }
    //TODO: draw pretty homepage
    render() {
        return (
            <div className= 'homepage'>
            
                <h1>MOODY Hompage, ik... its pretty sparse</h1>
                <div id='toolbar'>Login: <Link to = '/login'/></div>
            </div>
        )
    }
}

export default Homepage;

