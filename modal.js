import { CharType, Component } from "../../cthulhu/call.js";

class ModalButtonComponent extends Component{
    constructor(){
        super({
            button:{
                
            }
        });
    }

    build=param=>{
        let thisView = super.build({
            css:()=>param.type
        });

        thisView.bindEvent({
            event:'click',
            callback:()=>param.ans(param.type)
        });

        return thisView;
    }
}


class ModalComponent extends Component{
    constructor(modalButton){
        super({
            div:{
                class:'modal-cover',
                children:[
                    {
                        div:{
                            class:'modal',
                            children:[
                                {
                                    header:{
                                        children:[
                                            {
                                                strong:{}
                                            }
                                        ]
                                    }
                                },
                                {
                                    article:{
                                        children:[
                                            {
                                                span:{}
                                            }
                                        ]
                                    }
                                },
                                {
                                    footer:{
    
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        });
        this.modalButton = modalButton;
    }

    build=param=>{
        let thisView = super.build();

        thisView.addTextContent({
            q:'div.modal header strong',
            content:param.heading
        });

        thisView.addTextContent({
            q:'div.modal article span',
            content:param.content
        });

        thisView.showModal=()=>thisView.setStyle({
            content:{
                display:'flex'
            }
        });

        let footer = thisView.query('div.modal footer');

        if (!!param.actions)
            param.actions.forEach(a=>{
                this.modalButton.build({
                    type:a,
                    ans:type=>{
                        thisView.setStyle({
                            content:{
                                display:'none'
                            }
                        });

                        if (type=='no' && !!param.onNo)param.onNo();
                        if (type=='yes' && !!param.onYes)param.onYes();
                        if (type=='ok' && !!param.onOk)param.onOk();
                    }
                }).into(footer);
            });
        else
            this.modalButton.build({
                type:'ok',
                ans:()=>{
                    thisView.setStyle({
                        content:{
                            display:'none'
                        }
                    });
                }
            }).into(footer);

        return thisView;
    }
}

let ModalComponentInstance = new ModalComponent(new ModalButtonComponent());
export {ModalComponentInstance}