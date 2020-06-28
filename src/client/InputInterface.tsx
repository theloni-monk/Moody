import * as React from 'react';
import InputComponent from './InputComponent';
import {Card} from 'react-bootstrap';
import './css/InputInterface.css';

export enum InputTypes{
    string_i,
    number_i,
    rating_i
}

// the fundemental information type needed to construct a card - unwrapped when passed to inputcomponent
export interface cardInterface{
    question: string,
    example: string,
    inputType: InputTypes,
    emojis: string[]
}
export const testCard: cardInterface = {
    question: 'Is this a rating input test',
    example: '3',
    inputType: InputTypes.rating_i,
    emojis: ['😵','😭','😷','😡','😖']
}

interface PropInterface{
    cards: cardInterface[]
}
interface StateInterface{
    cardIndex: number
}
//TODO: randomize order of Qs
export default class InputInterface extends React.Component<PropInterface,StateInterface>{

    constructor(props: PropInterface){
        super(props);
        this.state = {
            cardIndex:  0
        };
    }

    advance = (inputResult: string|number) => {
        //TODO: process inputResult e.g. submit add to json before sending to db
        this.setState({cardIndex: this.state.cardIndex+1});
    }

    render(){
        return(
            <Card
            bg = 'primary'
            text = 'white'
            margin-bottom = '.5rem'>
                <InputComponent 
                question = 'Is this a rating input test'
                example = '3'
                inputType = {InputTypes.rating_i}
                emojis = {['😵','😭','😷','😡','😖']}
                callback = {(input:string)=> testcb(input)}
                />
            </Card>
        );
    }
}
var testcb = (input:string) => console.log('input submitted: ' + input);