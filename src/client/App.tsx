import React from 'react';
import './css/App.css';
import InputInterface from './InputInterface';
import HomePage from './Homepage';
import UserHandler from './UserHandler';
import {InputCard, testCard} from './InputInterface';
import {Switch, Route, Redirect} from 'react-router-dom';

//import db api


//FIXME: implement routes in master app



const RequireLogin = (component: React.Component, isAuthenticated:boolean, ...rest:any[]) => (
  <Route {...rest} render={props => (
    isAuthenticated 
      ? 
      (<React.Component {...props}/>)
      :
      (<Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
  )}/>
);




interface StateInterface{
  loading: boolean
  isAuthenticated:boolean
  cards: InputCard[]
}
export default class App extends React.Component<{},StateInterface> {
  
  componentDidMount = async () =>{
    let acards = await getCardsTest();
    this.setState({cards: acards});
  }
  constructor(props:any) {
    super(props);
    
    this.state = {
      cards: [testCard],
      isAuthenticated: false,
      loading: false, // TEMP, future will start with user login
    };
  }

  render(){
    
    {/*TODO: custom loading component*/}
    return (
      <Switch>
        <Route exact path = '/' component = {HomePage}/>
        <Route exact path = '/login' component = {UserHandler}/>
        <RequireLogin path = '/input' isAuthenticated = {this.state.isAuthenticated} component = {InputInterface} cards = {this.state.cards}/>

        

      </Switch>
    );


    
    }
}



//TEMPORARY TEST CODE, real func will use db
const getCardsTest = async () => {
  var testCards:InputCard[] = require('../tests/testCards.json')['cards'] as InputCard[];
  return testCards;
}

