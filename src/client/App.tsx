import React from 'react';
import './css/App.css';
import InputInterface from './InputInterface';
import {InputCard, testCard} from './InputInterface';

//import db api

const getCardsTest = async () => {
  //TEMPORARY TEST CODE, real func will use db
  var testCards:InputCard[] = require('../tests/testCards.json')['cards'] as InputCard[];
  return testCards;
}

//FIXME: implement routes in master app
enum UserInterfaceState {
  UserLogin_t,
  InputInterface_t,
  AnalInterface_t,
  loading,
  err
}
interface StateInterface{

  istate: UserInterfaceState
  uid: string
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
      istate: UserInterfaceState.InputInterface_t, // TEMP, future will start with user login
      uid: ''
    };
  }

  render(){
    switch(this.state.istate){
      case UserInterfaceState.InputInterface_t:
        return (
          <div className="App">
            <header className="App-header">
            </header>
            <InputInterface cards = {this.state.cards} onComplete = {(userData:object)=>console.log('userData recorded: ', userData)}/>
          </div>
        );
      case UserInterfaceState.loading:
        return (
          <div className="App">
            <header className="App-header">
            </header>
            {/*TODO: custom loading component*/}
            <div className = "loading-screen">Loading...</div>
          </div>
        );
      

    
    }
  }
}

