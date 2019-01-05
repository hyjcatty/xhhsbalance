/**
 * Created by hyj on 2016/12/22.
 */

/**
 * Created by hyj on 2016/9/29.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../resource/css/font-awesome.min.css';
import './sysdebug.css';



export default class sysdebug extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            footheight:100,
            hide:"block",
            callback:null,
            margintop:20,
            configure:null,
            key:"sys_debug_key",
            key2:"sys_debug_input",
            retmsg:"message return:",
            language:{
                "consoletitle":"Output",
                "sendbutton":"send",
                "retmsg":"message return:"
            },
        }
        //this.keyboard_initialize();
    }
    update_language(language){
        this.setState({language:language,retmsg:language.retmsg});
    }
    update_size(width,height,footheight){
        this.setState({height:height,width:width,footheight:footheight});
    }
    update_callback(callback){
        this.setState({callback:callback});
    }
    update_config(configure){
        this.setState({configure:configure});
    }
    update_msg(msg){
        $("#screen").prepend("<p style='width:100%'>"+msg+"</p><p style='width:100%'>----------------</p>");
        while($("#screen").children('p').length>20){
            $("#screen").children('p')[$("#screen").children('p').length-1].remove();
        }
        /*
        let msgtemp =msg+" ------------------------------------- &nbsp;"+this.state.retmsg;
        if(msgtemp.length>2000){
            msgtemp = msgtemp.substring(0,2000);
        }
        this.setState({retmsg:msgtemp});*/
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    componentDidMount(){
        //this.keyboard_initialize();
    }
    componentDidUpdate(){
    }
    handleChange(){

    }
    handleBlur(){

    }
    handleSave(){

    }
    handle_click_send(event){
        let i = parseInt(event.target.getAttribute("data-i-series"));
        let j = parseInt(event.target.getAttribute("data-j-series"));
        this.state.callback(this.state.configure.parameter.groups[i].list[j].action);
    }
    render() {
        let groups1 = [];
        let grougs1size=0;
        let groups2 = [];
        let groups2size=0;
        if(this.state.configure!= null){

            for(let i=0;i<1;i++){
                let param = [];
                for(let j=0;j<this.state.configure.parameter.groups[i].list.length;j++){
                    if(this.state.configure.parameter.groups[i].list[j].type === "button"){
                        param.push(
                            <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6" key={"button"+i+""+j}>
                                <button  type="button" className="btn btn-warning btn-sm pull-left" style={{marginLeft:"5px",marginTop:"5px",height:(this.state.height*0.1),width:"90%"}}
                                         data-i-series={""+i} data-j-series={""+j} onClick={this.handle_click_send.bind(this)}>
                                    <i data-i-series={""+i} data-j-series={""+j} style={{color:"#ffffff",fontSize:"15px",fontWeight:"bold"}}> {this.state.configure.parameter.groups[i].list[j].paraname}</i>
                                </button>
                            </div>
                            );
                    }
                }
                    groups1.push(
                        <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" key={this.state.key+i+"p"}>
                            <div className="tile-stats" key={"debug_group_"+this.state.configure.parameter.groups[i].groupname} style={{marginTop:"15px"}}>
                                <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.configure.parameter.groups[i].groupname}</div>
                                {param}
                            </div>
                        </div>
                    );
                    grougs1size = grougs1size+this.state.configure.parameter.groups[i].list.length;
                


            }
            groups2.push(
            <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" key={this.state.key+"output"}>
                <div className="tile-stats" key={"debug_group_right"} style={{marginTop:"15px"}}>
                    <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.consoletitle}</div>
                    <div  id="screen" style={{width:"90%",height:this.state.height*0.65,marginLeft:"15px",overflow:'scroll',overflowX:'hidden'}}>

                    </div>
                </div>
            </div>
            );

        }

        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
                <div className="container">
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        {groups1}
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        {groups2}
                    </div>
                </div>
            </div>
        );
    }
}