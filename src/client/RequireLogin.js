import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";
//dont even ask, this only works in js and not in ts of any kind
const RequireLogin = ({component: Component, ...rest}) => {
const {loggedIn} = useAuth();
  return(<Route {...rest} render={props => (
    loggedIn
      ? 
      (<Component {...props}/>)
      :
      (<Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
  )}/>);
};
export default RequireLogin;