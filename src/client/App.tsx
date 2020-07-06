import React,{useState, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import './css/App.css';

import HomePage from './Homepage';
import UserHandler from './UserHandler';
import InputInterface,{InputCard} from './InputInterface';
import AnalInterface from './AnalInterface';


import { AuthContext, useAuth } from "./context/auth";
const secrets = require('../secrets.json'); // stores google clientid

const store = require('store');
var expirePlugin = require('store/plugins/expire');
store.addPlugin(expirePlugin);



//import db api
//FIXME: use context to determine authentication and user data
//FIXME: implement routes in master app


// All the required log in things are based on the BackendAuth object, it only updates 
//HACK making requirelogin any type
const RequireLogin:any = (component: React.Component, ...rest :any[]) =>{
  
    const {loggedIn} = useAuth();
    return (<Route {...rest} render={props => (
      loggedIn
        ? 
        (<React.Component {...props}/>)
        :
        (<Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
    )}/>);
  
}

export interface token_format{
  id_token:string,
  expiration:number
}

store.removeExpiredKeys() // remove auth token from local cache if expired
export const App: React.FC = ({}) => { //Functional Component
  const existingToken:string = store.get("token") as string;
  const [authToken, setAuthToken] = useState(existingToken);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=> {
     if(authToken){
      //ping backend server and if we get a logged in session then save it
     }
    
  }, [authToken])
  

  const setToken = (token:token_format) => {
    console.log('saved id_token to store');
    store.set("token", token.id_token, token.expiration);
    setAuthToken(token.id_token);
  }

  //FIXME: make inputInterface get its own cards
    {/*FAROFF: custom loading component*/}
  return (
      <AuthContext.Provider value={loggedIn}>
        <Switch>
          <Route exact path = '/' component = {HomePage}/>
          <Route exact path = '/login' component = {UserHandler} setAuth = {setToken}/>
          
          <RequireLogin component = {InputInterface} path = '/input'/>
          <RequireLogin component = {AnalInterface} path = '/tracker'/>

        </Switch>
      </AuthContext.Provider>
  );
}




//TEMPORARY TEST CODE, real func will use db
const getCardsTest = async () => {
  var testCards:InputCard[] = require('../tests/testCards.json')['cards'] as InputCard[];
  return testCards;
}

export default App;