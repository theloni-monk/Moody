
import React,{useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';

import './css/App.css';

import RequireLogin from './RequireLogin';
import HomePage from './Homepage';
import UserHandler from './UserHandler';
import InputInterface,{InputCard} from './InputInterface';
import AnalInterface from './AnalInterface';

import { useLocalStorage, deleteFromStorage } from '@rehooks/local-storage';

import { AuthContext } from "./context/auth";
const secrets = require('../secrets.json'); // stores google clientid

const https = require('https');
const axios = require('axios').default;
const backend = axios.create({
  baseURL: 'http://localhost:5000', //TODO: migrate backend to https
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

// all keys must have expiration field
export interface token_format{
  id_token:string,
  expiration:number
}

export async function removeExpiredTokens(){
  console.log('Checking keys and removing expired')
  for (var i = 0; i < localStorage.length; i++){
    console.log('Checking', i, 'key')
    let item:token_format = JSON.parse(localStorage.getItem(localStorage.key(i) as string) as string);
    console.log("localstorage['"+localStorage.key(i)?.toString()+"'] = ", item);
    if(item.expiration < Date.now()) deleteFromStorage(localStorage.key(i) as string);
  }
  if(localStorage.length < 1) console.log('No keys found')
} // remove auth token from local cache if expired

export const App = () => { //Functional Component
  const [authToken] = useLocalStorage<token_format>('google_token'); // authtoken is a json string with internal token_format
  const [loggedIn, setLoggedIn] = useState(false);

  //remove expired keys on component did mount
  useEffect(()=>{
    async function waitForRemove(){
      await removeExpiredTokens();
    }
    waitForRemove();
  },[])
 
  useEffect(()=> { 
    try{
      if(authToken && !loggedIn){
        console.log('authToken useEffect called');
        console.log('authToken', authToken)
        let tk = authToken.id_token;

        backend.post('/auth',{
          id_token: tk
        }).then((response:Response)=>{
          if(response.status === 200) { // response 200 ok - we successfully logged in and have a signed session
            setLoggedIn(true);
            //TODO: set user in the state to the google profileobj returned
          }
          else if(response.status === 401){ // response 401 unauthorized - our token was invalid
            throw Error('Token Invalid');
          }
          else{
            throw Error('Illegal backend response');
          }
        }) // on login success set loggedin context
        .catch((error:Error) => console.log(error)); // backend failure
      }
    }
    catch(e){
      console.log('Token not found: ', e);
    }
  }, [authToken, loggedIn])


  //WRITEME: make inputInterface get its own cards
  {/*FAROFF: custom loading component*/}
  return (
        <Switch>
          <AuthContext.Provider value={{loggedIn: loggedIn}}>

          <Route exact path = '/' component = {HomePage}/>
        
          <Route exact path = '/login' component = {UserHandler}/>
          
          <RequireLogin component = {InputInterface} isAuth = {loggedIn} exact path = '/input'/>
          <RequireLogin component = {AnalInterface} isAuth = {loggedIn} extact path = '/tracker'/>

          </AuthContext.Provider>
        </Switch>
  );
}




//TEMPORARY TEST CODE, real func will use db
const getCardsTest = async () => {
  var testCards:InputCard[] = require('../tests/testCards.json')['cards'] as InputCard[];
  return testCards;
}

export default App;