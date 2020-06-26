import * as React from 'react';

const catagories = {
    "medication": "string",
    "dose-mg": "number",
    "mood": "rating",
    "energy": "rating",
    "motivation": "rating",
    "sleep-quality": "rating",
    "sleep-hours": "number",
    "naps": "number"
}

interface PropInterface{

}

//TODO: randomize order of Qs
export default class InputInterface extends React.Component<PropInterface>{

    constructor(props: PropInterface){
        super(props);
    }

    render(){
        return();
    }
}