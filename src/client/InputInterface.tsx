import * as React from 'react';
export const enum InputTypes{
    string_i,
    number_i,
    rating_i
}
export interface catagories {
    "medication": InputTypes.string_i,
    "dose-mg": InputTypes.number_i,
    "mood": InputTypes.rating_i,
    "energy": InputTypes.rating_i,
    "motivation": InputTypes.rating_i,
    "sleep-quality": InputTypes.rating_i,
    "sleep-hours": InputTypes.number_i,
    "naps": InputTypes.number_i
 }

interface PropInterface{

}

//TODO: randomize order of Qs
export default class InputInterface extends React.Component<PropInterface>{

    constructor(props: PropInterface){
        super(props);
    }

    render(){
        return(); //WRITEME
    }
}