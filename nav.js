import { Component, View } from "../../cthulhu/call.js";
import {LiComponentInstance } from "../basic/li.js";

class NavNiceComponent extends Component{
    constructor(){
        super({
            nav:{
                class:'nice'
            }
        });
    }

    build=param=>super.build({
            style:param.style,
            css:()=>'nice ' + (!!param.css?param.css:'')
        });
}



class NavNiceHamburgerComponent extends Component{
    constructor(){
        super({
            div:{
                class:'hamburger',
                children:[
                    {
                        div:{
                            class:'icon',
                            children:[
                                {hr:{}},
                                {hr:{}},
                                {hr:{}}
                            ]
                        }
                    },
                    {
                        div:{
                            class:'menu fadeIn',
                            children:[
                                {
                                    ul:{}
                                }
                            ]
                        }
                    }
                ]
            }
        });
    }

    build=param=>{
        let thisView = super.build({
            style:param.style,
            css:()=>{
                let styleSheet = 'hamburger';
                styleSheet+= (param.isLarge?' large':'');
                styleSheet+= (param.isTransparent?' transparent':'');
                return styleSheet;
            }
        });

        if(!!param.colors){
            thisView.setStyle({
                q:'div.icon',
                content:{
                    color:param.colors.color,
                    background:param.isTransparent?'transparent':param.colors.background
                }
            });
        }

        let ul = thisView.query('div.hamburger div.menu ul');
        param.route.items.forEach(i=>{
            let p = (i instanceof View)?i:{
                route:{
                    go:param.route.go,
                    link:i.link
                },
                content:i.content
            }
            LiComponentInstance.build(p).into(ul);
        });

        return thisView;
    }
}

class NavNiceAnchorComponent extends Component{
    constructor(){
        super({
            a:{
                class:'any'
            }
        });
    }

    build=param=>{
        let thisView = super.build({
            style:param.style,
            css:()=>'any' + (!!param.position?' to-' + param.position:'') +  (!!param.css?' ' + param.css:'')
        });

        param.child.asChildOf(thisView);

        return thisView;
    }
}

class NavNiceLogoComponent extends Component{
    constructor(format=undefined){
        super({
            a:{
                class:'logo',
                event:'menu-route',
                children:[
                    {
                        img:{
                            src:'/img/logo.' + ((!!format)?format:'jpg'),
                            alt:'Logo'
                        }
                    }
                ]
            }
        });
    }

    build=param=>{
        let thisView = !!param?
                        super.build({
                            style:param.style,
                            css:()=>{
                                let styleSheet = 'logo';
                                styleSheet += (!!param.size)?' ' + param.size:'';
                                styleSheet += (!!param.position)?' to-' + param.position:''; 
                                return styleSheet;
                            }
                        }):
                        super.build();

        thisView.bindEvent({
            event:'click',
            callback:()=>{
                param.route.go(param.route.link);
            }
        })

        return thisView;
    }
}

let NavNiceComponentInstance = new NavNiceComponent();
let NavNiceAnchorComponentInstance =new NavNiceAnchorComponent(); 
let NavNiceLogoComponentInstance =new NavNiceLogoComponent();
let NavNiceLogoPngComponentInstance = new NavNiceLogoComponent('png');
let NavNiceHamburgerComponentInstance = new NavNiceHamburgerComponent();

export {
    NavNiceComponentInstance,
    NavNiceAnchorComponentInstance,
    NavNiceLogoComponentInstance,
    NavNiceLogoPngComponentInstance,
    NavNiceHamburgerComponentInstance
}