import React from 'react';
import './App.css';
import InputInterface from './InputInterface';
//import db api


interface StateInterface{

}
export default class App extends React.Component<{},StateInterface> {
  
  componentDidMount = () =>{

  }

  //TODO: conditional rendering: input vs tracker via api processing
  render(){
    return (
      <div className="App">
        <header className="App-header">
        </header>
        
      </div>
    );
  }
}

