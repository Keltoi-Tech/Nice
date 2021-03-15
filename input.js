import { Component } from "../../cthulhu/call.js";

class InputNiceComponent extends Component{
    constructor(){
        super({
            fieldset:{
                class:'nice',
                field:'',
                children:[
                    {
                        label:{
                            style:{
                                display:'none'
                            }
                        }
                    },
                    {
                        input:{
                            scope:'',
                            type:'text'
                        }
                    },
                    {
                        span:{
                            class:'error'
                        }
                    }
                ]

            }
        });
    }

    validate=(view,validation)=>new Promise((resolve,reject)=>{
        let i = view.query('input');
        
        let result = validation(i.value);
        
        if (result===true)resolve();
        else{
            view.query('span.error').textContent=result;
            i.focus();
            reject(result);
        }
    });


    clean=(view)=>view.query('input').value='';

    setFocus=(view)=>view.query('input').focus();

    getValue=(view)=>view.query('input').value;

    build=param=>{
        let thisView = !!param?
                        super.build({
                            style:!!param.style?param.style:undefined,
                                css:()=>'nice' + (!!param.size?' ' + param.size:'') + (!!param.shape?' ' + param.shape:'')
                        }):
                        super.build();

        if (!!param.label){
            thisView.setStyle({
                q:'label',
                content:{
                    display:'inline'
                }
            });

            thisView.addTextContent({
                q:'label',
                content:param.label                
            })
        }

        if (!!param.input){
            if (!!param.input.type){
                thisView.setAttribute({
                    q:'input',
                    name:'type',
                    value:param.input.type
                });
            }

            if (!!param.input.placeholder){
                thisView.setAttribute({
                    q:'input',
                    name:'placeholder',
                    value:param.input.placeholder
                });
            }

            if (!!param.input.shape){
                thisView.setAttribute({
                    q:'input',
                    name:'class',
                    value:param.input.shape
                });
            }
        }

        thisView.validate=(validation)=>this.validate(thisView,validation);
        thisView.clean=()=>this.clean(thisView);
        thisView.setFocus=()=>this.setFocus(thisView);
        thisView.getValue=()=>this.getValue(thisView);

        return thisView;
    }
}

let InputNiceComponentInstance= new InputNiceComponent();
export {InputNiceComponentInstance}