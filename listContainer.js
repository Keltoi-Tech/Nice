import { Component } from "../../cthulhu/call.js";

class ListContainerComponent extends Component{
    constructor(){
        super({
            div:{
                class:'panel r1 list-container',
                children:[
                    {
                        header:{
                            class:'desktop-r3-4th tablet-rgold r1',
                            children:[
                                {
                                    h2:{}
                                }
                            ]
                        }
                    },
                    {
                        article:{
                            class:'desktop-r3-4th tablet-rgold r1'
                        }
                    },
                    {
                        footer:{
                            class:'desktop-r3-4th tablet-rgold r1',
                            children:[
                                {
                                    a:{
                                        class:'plus',
                                        children:[
                                            {
                                                i:{
                                                    class:'fas fa-plus'
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    a:{
                                        class:'minus',
                                        children:[
                                            {
                                                i:{
                                                    class:'fas fa-minus'
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        });
    }

    pushContent=(view)=>{
        let content = view.componentSet.method(view.componentSet.param);
        
        content.into(view.query('article'));

        view.componentSet.list.push(content);
    }


    build=param=>{
        let thisView = super.build({
            style:!!param.style?param.style:undefined,
            css:()=>'panel r1 list-container' + !!param.css?' ' + param.css:''
        });

        thisView.componentSet = param.componentSet;
        thisView.componentSet.list=[];

        thisView.pushContent=()=>this.pushContent(thisView);
    }
}

let ListContainerComponentInstance = new ListContainerComponent();
export {ListContainerComponentInstance}