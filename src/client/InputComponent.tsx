import * as React from "react";

function error(){
    return (<div id = 'input-component-error'>
        ERROR!
    </div>);
}

function str(){
    return ();
}

function num(){
    return ();
}

function rating(){
    return ();
}


interface PropInterface{
    name: string,
    inputType: string,
    emoji: string, 
    onComplete: Function
}

export default class InputComponent extends React.Component<PropInterface>{

    constructor(props: PropInterface){
        super(props);
    }

    render(){
        let comp;
        switch(this.props.inputType){
            case "string":

                break;
            case "number":

                break;
            case "rating":

                break;
            default:
                comp = error();
        }
        return comp;
    }
}