import * as React from "react";
import { InputTypes } from "./InputInterface";
import {Button, InputGroup, FormControl} from 'react-bootstrap';




interface PropInterface{
    question: string,
    example: string,
    inputType: InputTypes,
    emoji: string, 
    onComplete: Function
}
interface StateInterface{
    input: string | number
}
export default class InputComponent extends React.Component<PropInterface,StateInterface>{

    constructor(props: PropInterface){
        super(props);
    }

    error = () => {
        return (<div id = 'input-error'>
            ERROR!
        </div>);
    }
    
    str = () => {
        return (
            <div id = 'inputcomponent-str'>
                <div id = 'question'>{this.props.question}? {this.props.emoji}</div>
                <InputGroup className="mb-3">
                    <input
                    placeholder={this.props.example}
                    id="input-str"
                    value = {this.state.input}
                    onChange = {(evt)=>this.setState({input: evt.target.value})}
                    />
                    <InputGroup.Append>
                    <Button variant="outline-success" onClick={this.props.onComplete(this.state.input)}> {'->'} </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
    
    num = () => {
        return (
            <div id = 'inputcomponent-num'>
                <div id = 'question'>{this.props.question}? {this.props.emoji}</div>
                <InputGroup className="mb-3">
                    <input type = "number"
                    placeholder={this.props.example}
                    id="input-str"
                    value = {this.state.input}
                    onChange = {(evt)=>this.setState({input: evt.target.value})}
                    />
                    <InputGroup.Append>
                    <Button variant="outline-success" onClick={this.props.onComplete(input)}> {'->'} </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
    
    rating = () => {
        return (); //TODO: rating input
    }

    render(){
        let comp;
        switch(this.this.props.inputType){
            case InputTypes.string_i:

                break;
            case InputTypes.number_i:

                break;
            case InputTypes.rating_i:

                break;
            default:
                comp = this.error();
        }
        return (
            <div className = 'input-component'>comp</div>
        );
    }
}