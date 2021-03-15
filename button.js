import { Component } from "../../cthulhu/call.js";

class ButtonNiceComponent extends Component{
    constructor(){
        super({
            fieldset:{
                class:'nice',
                children:[
                    {
                        button:{
                            event:'click'
                        }
                    }
                ]

            }
        });
    }

    build=param=>{
        let thisView = !!param?
                        super.build({
                            style:{
                                textAlign:'center'
                            },
                            css:()=>'nice' + (!!param.size?' ' + param.size:'') + (!!param.css?' ' + param.css:'') 
                        }):
                        super.build(); 

        if (!!param.button.css){
            thisView.setAttribute({
                q:'button',
                name:'class',
                value:param.button.css
            })
        }

        if (!!param.button.style){
            thisView.setStyle({
                q:'button',
                content:param.button.style
            });
        }

        thisView.bindEvent({
            q:'click',
            callback:param.button.click,
            event:'click'
        });

        thisView.addTextContent({
            q:'button',
            content:param.button.content
        });

        return thisView;
    }
}

let ButtonNiceComponentInstance= new ButtonNiceComponent();
export {ButtonNiceComponentInstance}