import * as React from "react";
import { InputTypes, InputCard } from "./InputInterface";
import {Button, InputGroup, FormControl} from 'react-bootstrap';


export interface PropInterface{
    cardParams: InputCard
    onComplete: Function
}
interface StateInterface{
    input: string | number
}
export default class InputComponent extends React.Component<PropInterface, StateInterface>{

    constructor(props: PropInterface){
        super(props);
        this.state = {
            input:0
        }
    }
    componentDidMount = () =>{
        switch(this.props.cardParams.inputType) {
            case InputTypes.string_i:
                this.setState({input: ''});
                break;
            case InputTypes.number_i:
                this.setState({input: ''});
                break;
            case InputTypes.rating_i:
                this.setState({input: this.props.cardParams.example});
                break;
            default:
                console.log('inputType not properly parsed')
        }
    }

    error_comp = () => {
        return (<div id = 'input-error'>
            ERROR!
        </div>);
    }
    
    string_comp = () => {
        return (
            <div id = 'inputcomponent-str'>
                <div id = 'question' color = 'black'>{this.props.cardParams.question}? {this.props.cardParams.emojis[0]}</div>
                <InputGroup className="mb-3">
                    <FormControl
                    type = 'text'
                    placeholder={this.props.cardParams.example}
                    id="input-str"
                    value = {this.state.input}
                    onChange = {(evt)=>this.setState({input: evt.target.value})}
                    />
                    <InputGroup.Append>
                    <Button variant="outline-success" onClick={() => {this.props.onComplete(this.state.input);}}> {'->'} </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
    
    num_comp = () => {
        return (
            <div id = 'inputcomponent-num'>
                <div id = 'question' color = 'black'>{this.props.cardParams.question}? {this.props.cardParams.emojis[0]}</div>
                <InputGroup className="mb-3">
                    <FormControl type = "number"
                    placeholder={this.props.cardParams.example}
                    id="input-str"
                    value = {this.state.input}
                    onChange = {(evt) => this.setState({input: evt.target.value})}
                    />
                    <InputGroup.Append>
                    <Button variant="outline-success" onClick={()=>{this.props.onComplete(Number(this.state.input));}}> {'->'} </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
    
    rating_comp = () => {
        return (
            <div id = 'inputcomponent-rating'>
                <div id = 'question'>{this.props.cardParams.question}?</div>
                {this.props.cardParams.emojis.map((emoji, i) => 
                    <span 
                        key = {i} 
                        id = {i<=this.state.input?'rating-emoji-on':'rating-emoji-off'} 
                        onClick = {() => {
                            this.setState({input:i}, ()=>{
                                this.props.onComplete(this.state.input as number + 1);
                            }); }}>
                    {emoji}
                    </span>)}
            </div>
        ); 
    }

    render(){
        let comp;
        switch(this.props.cardParams.inputType){
            case InputTypes.string_i:
                comp = this.string_comp();
                break;
            case InputTypes.number_i:
                comp = this.num_comp();
                break;
            case InputTypes.rating_i:
                comp = this.rating_comp();
                break;
            default:
                comp = this.error_comp();
        }
        return (
        <div className = 'input-component'> {comp} </div>
        );
    }
}