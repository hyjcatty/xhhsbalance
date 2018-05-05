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
import './syserror.css';



export default class syserror extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            footheight:100,
            hide:"block",
            callback:null,
            margintop:20,
            key:"syserror",
            configure:{
                errorcode:"",
                errortime:"",
                contract:"",
                tips:"",
                message:""
            },
            retmsg:"message return:",
            language:{
                "title":"Fetal Error",
                "button":"reset",
                "tips":"We are very sorry for the error. Please send the snapshot to cantact for further support!",
                "codetip":"Error Code:",
                "timetip":"Time Stamp:",
                "contacttip":"Support Mail:",
                "tipstip":"Tips:",
                "msgtip":"Detail info:"
            },
        }
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
        if(this.state.hide === "block") return;
        this.setState({configure:configure});
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        if(this.state.hide === "block") return;
        this.setState({hide:"block"});
    }
    handle_click_send(){
        this.state.callback();
    }
    render() {
        let groups1 = [];
        let groups2 = [];
        if(this.state.configure!=null){
            let localtips = this.state.configure.tips;
            if(localtips === "" || localtips === null || localtips === undefined) localtips = this.state.language.tips;
            groups1.push(
                <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" key={this.state.key+"format"}>
                    <div className="tile-stats" style={{borderStyle:"none none solid none",borderRadius:"0px"}}>
                        <h3 style={{paddingTop:10,marginTop:50,marginBottom:40,color:"#000000",fontWeight:"bold",fontSize:36}}><i className="fa fa-warning" style={{marginRight:25}}></i>{this.state.language.title}</h3>

                        <div key="statuspanel1" className="count" style={{fontSize:18,marginTop:10,marginBottom:20,textAlign:"left",fontWeight:900}}>{this.state.language.codetip+this.state.configure.errorcode}</div>

                        <div key="statuspanel2" className="count" style={{fontSize:18,marginTop:10,marginBottom:20,textAlign:"left",fontWeight:900}}>{this.state.language.timetip+this.state.configure.errortime}</div>

                        <div key="statuspanel3" className="count" style={{fontSize:18,marginTop:10,marginBottom:20,textAlign:"left",fontWeight:900}}>{this.state.language.contacttip+this.state.configure.contract}</div>

                        <div key="statuspanel4" className="count" style={{fontSize:18,marginTop:10,marginBottom:20,textAlign:"left",fontWeight:900}}>{this.state.language.msgtip+localtips}</div>
                    </div>
                </div>
            );
            groups2.push(
                <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" key={this.state.key+"output"}>
                    <div className="tile-stats" key={"debug_group_right"} style={{marginTop:"15px"}}>
                        <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.consoletitle}</div>
                        <div style={{width:"100%",height:this.state.height*0.65,marginLeft:"15px",overflow:'hidden',overflowX:'hidden'}}>
                            {this.state.configure.message}
                        </div>
                    </div>
                </div>
            );
        }




        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',paddingTop:50,display:this.state.hide,overflow:'hidden',overflowX:'hidden'}}>
                <div className="container">
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        {groups1}
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        {groups2}
                    </div>
                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12">
                        <button  type="button" className="btn btn-warning btn-sm pull-left" style={{position:"relative",left:"50%",marginLeft:this.state.height*0.15/(-2),marginTop:"5px",height:(this.state.height*0.1),width:(this.state.height*0.15)}} onClick={this.handle_click_send.bind(this)}>
                            <i style={{color:"#ffffff",fontSize:"15px",fontWeight:"bold"}}> {this.state.language.button}</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}