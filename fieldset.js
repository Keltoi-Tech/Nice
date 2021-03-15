import { Component } from "../../cthulhu/call.js";

export class FieldsetNiceComponent extends Component{
    constructor(){
        super({
            fieldset:{
                class:'panel nice',
                children:[
                    {
                        legend:{
                            content:''
                        }
                    }
                ]
            }
        });
    }

    build=legend=>{
        let thisView = super.build();
        
        if (!!legend){
            if (!!legend.content){
                thisView.addTextContent({
                    q:'legend',
                    content:legend.content
                });
            }
    
            if (!!legend.position){
                thisView.setStyle({
                    q:'legend',
                    content:{
                        textAlign:legend.position
                    }
                });
            }
        }

        thisView.setStyle({
            content:legend.style
        });

        return thisView;
    }
}