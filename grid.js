import { Component, View} from "../../cthulhu/call.js";

class FAItemComponent extends Component{
    constructor(fa){
        super({
            i:{
                class:fa
            }
        });
    }

    build=event=>{
        let thisView = super.build();
        thisView.bindEvent({
            event:'click',
            callback:event
        });

        return thisView;
    }
}


class DataGridComponent extends Component{
    constructor(){
        super({
            div:{}
        });
        this.headingComponent= new Component({
            div:{
                class:'header black',
                children:[
                    {
                        span:{}
                    }
                ]
            }
        });
        this.rowComponent = new Component({
            div:{
            }
        });
    }

    getTemplateColumns=(templateColumns,hasUpdate,hasDelete)=>{
        if (hasUpdate)templateColumns.push(5);
        if (hasDelete)templateColumns.push(5);
        return templateColumns.join('% ') + '%';
    }

    getPlusHeading=plus=>{
        let result = this.headingComponent.build({
            style:{
                gridColumn:plus.begin.toString() + '/ span ' + plus.end.toString(),
                textAlign:'center'
            }
        });

        result.setStyle({
            q:'span',
            content:{
                color:'white'
            }
        });

        new FAItemComponent('fas fa-user-plus')
        .build(()=>plus.go(plus.link))
        .into(result.query('span'));

        return result;
    }

    getHeading=(heading)=>{
        let result = this.headingComponent.build();

        result.addTextContent({
            q:'span',
            content:heading
        });

        return result;
    }

    getRow=(row)=>{
        let rowView = this.rowComponent.build(row.facade);
        if (row.source instanceof View)
            row.source.asChildOf(rowView);
        else{
            let span = new Component({span:{}}).build();
            span.addTextContent({
                content:row.source}
            );
            span.asChildOf(rowView);
        }
            
        return rowView;
    }


    build=param=>{
        let headingNames = Object.keys(param.heading);
        let templateColumns=[];
        headingNames.forEach(h=>templateColumns.push(param.heading[h]));
        let hasDelete = !!param.delete;
        let hasUpdate = !!param.update;        

        let thisView = super.build(
            {
                style:{
                    gridTemplateColumns:this.getTemplateColumns(templateColumns,hasUpdate,hasDelete),
                    gridGap:!!param.gap?param.gap:'1px 0px'
                },
                css:()=>'grid ' + (!!param.cssGrid?param.cssGrid:'')
            }
        );

        /*HEADER */
        headingNames.forEach(h=>this.getHeading(h).asChildOf(thisView));
        if (!!param.new){
            this.getPlusHeading({
                begin:(headingNames.length + 1),
                end:1+((hasDelete || hasUpdate)?1:0),
                go:param.go,
                link:param.new.link
            }).asChildOf(thisView);
        }

        /*BODY */
        param.body.forEach((data,i)=>{
            let facade = {
                style:!!param.cssStyle?param.cssStyle:undefined,
                css:param.stripesOn?
                        ()=>(!!param.cssBody?param.cssBody:'') + ((i%2==0)?' black':''):
                        ()=>!!param.cssBody?param.cssBody:''
            };

            headingNames.forEach(h=>{
                this.getRow({
                    facade:facade,
                    source:data[h]
                }).asChildOf(thisView);
            });

            if (hasUpdate)this.getRow({
                facade:{
                    css:param.stripesOn?
                            ()=>((i%2==0)?'icon black':'icon'):
                            ()=>'icon'
                },
                source:new FAItemComponent('far fa-edit')
                .build(()=>param.go(param.update.link,data))
            }).asChildOf(thisView);

            if (hasDelete)this.getRow({
                facade:{
                    css:param.stripesOn?
                            ()=>((i%2==0)?'icon black':'icon'):
                            ()=>'icon'
                },
                source:new FAItemComponent('far fa-trash-alt')
                .build(()=>param.delete.event(data))
            }).asChildOf(thisView);
        });

        return thisView;
    }
}

let DataGridComponentInstance = new DataGridComponent();
export {DataGridComponentInstance}