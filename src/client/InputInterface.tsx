import * as React from 'react';
import InputComponent from './InputComponent';
import {Card} from 'react-bootstrap';
import './css/InputInterface.css';
//TODO: make inputinterface css pretty

// types of input cards users can use to evaluate questions
export enum InputTypes{
    string_i,
    number_i,
    rating_i
}
//TODO: add boolean InputComponent
// the fundemental information type needed to construct a card - passed to inputcomponent with callback func
export interface InputCard{
    question: string,
    shortName:string, // what it will be saved as in json e.g. ('How depressive has your mood been?' would have shortname depression-level)
    example: string,
    inputType: InputTypes,
    emojis: string[]
}


interface PropInterface{
    cards: InputCard[]
    onComplete: Function
}
interface StateInterface{
    cardIndex: number
    userData: {[index: string]: any}
}
//TODO: randomize order of Qs
export default class InputInterface extends React.Component<PropInterface, StateInterface>{

    constructor(props: PropInterface){
        super(props);
        this.state = {
            cardIndex:  0,
            userData: {}
        };
    }

    advance = (inputResult: string|number) => {
        let sName: string  = this.props.cards[this.state.cardIndex].shortName;
        let db_pair: {[index:string]:any} = Object.create({});
        db_pair[sName] = inputResult;

        let newUserData = {...this.state.userData, ...db_pair}

        this.setState({userData: newUserData}, ()=>{
            //setState does not provide immediate mutation, anything depending on the correct new state after a setstate is executed in callback function
            //FIXME: oncomplete redirect to dashboard or tracker or thanks or whatever
            if(this.state.cardIndex + 1 >= this.props.cards.length) this.props.onComplete(this.state.userData); // run callback after all inputs recorded
            else{ this.setState({cardIndex: this.state.cardIndex+1}) }; // iterate to next input
        });
    }

    render(){
        return(
            <Card id = 'inputCard'
            bg = 'primary'
            text = 'white'
            margin-bottom = '.5rem'>
                {/*changing the key when we advance the card forces the component to reconstruct */}
                <InputComponent 
                key = {this.state.cardIndex}
                cardParams = {this.props.cards[this.state.cardIndex]}
                onComplete = {(input:string|number)=> this.advance(input)}
                />
            </Card>
        );
    }
}