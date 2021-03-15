import { Component } from "../../cthulhu/call.js";

class MessageComponent extends Component{
    constructor(){
        super({
            span:{
               class:'message mistake' 
            }
        })
    }

    setMessage=(view,message)=>view.node.textContent=message;
    

    build=(param)=>{
        let thisView = !!param?
                            super.build({
                                style:(!!param.style?param.style:undefined),
                                css:()=>'message ' + param.type
                            }):
                            super.build();

        thisView.setMessage=(message)=>this.setMessage(thisView,message);

        return thisView;
    }
}

let MessageComponentInstance = new MessageComponent();
export {MessageComponentInstance};