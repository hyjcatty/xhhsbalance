/**
 * Created by hyj on 2017/4/6.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
export default class Calibrationunit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            note:"From last Count",
            location:"left",
            colorbrick: "#73879c",
            colornote:"#73879c",
            colorcircle:"#73879c",
            colorbrickname:"GRAY",
            colornotename:"GRAY",
            colorcirclename:"GRAY",
            blingbrick: false,
            blingnote:false,
            blingcircle:false,
            title:"#Balance",
            width:100,
            height:100,
            status:0,
            lockdisabled:"",
            disabled:"disabled",
            balanceNo:0,
            callbackzero:null,
            callbackcountweight:null,
            debugmsg:"",
            language:{
                "title":"#Balance:",
                "statusempty":"keep empty",
                "statuserror":"error"
            }
        };
        this.colorlist={
            RED:"#d95349",
            ORANGE:"#f0ad4e",
            BLUE:"#3498db",
            GREEN:"#26b99a",
            GRAY:"#73879c",
            PURPLE:"#9B59B6",
            LBLUE:"#5bc0de",
            LGREEN:"#5cb85c",
            LGRAY:"#2a3f54",
            DBLUE:"#34495e"
        };
    }
    updatelanguage(language){
        this.setState({language:language});
    }
    updateprop(note,colorbrick,colornote,colorcircle,blingbrick,blingnote,blingcircle,colorbrickname,colornotename,colorcirclename){
        this.setState({note:note,colorbrick:colorbrick,colornote:colornote,colorcircle:colorcircle,blingbrick:blingbrick,blingnote:blingnote,blingcircle:blingcircle,colorbrickname:colorbrickname,colornotename:colornotename,colorcirclename:colorcirclename});
    }
    updatebalance(balanceNo){
        this.setState({balanceNo:balanceNo,title:(this.state.language.title+"_"+(balanceNo)+"_")});
        this.setstatus(0);
    }
    updatecallback(callbackzero,callbackcountweight){
        this.setState({callbackzero:callbackzero,callbackcountweight:callbackcountweight});
    }
    initialize(location,width,height){
        this.setState({location:location,width:width,height:height});
    }
    lockall(bool){
        if(bool){
            this.setstatus(0,"---");
            this.setState({lockdisabled:"disabled"});
        }else{
            this.setstatus(0,"---");
            this.setState({lockdisabled:""});
        }
    }

    setstatus(status,weight,msg){
        if(this.state.lockdisabled == "disabled"){
            //if system is locked, we will not receive any update
            return;
        }
        this.setState({status:status,debugmsg:msg});
        if(status == 1){
            this.setState({note:weight,disabled:"",colornote: "#9B59B6",colornotename:"PURPLE",blingnote:true});
        }else if(status == 2){
            this.setState({note:weight,disabled:"disabled",colornote: "#26b99a",colornotename:"GREEN",blingnote:false});
        }else if(status == 3){
            this.setState({note:this.state.language.statuserror,disabled:"disabled",colornote: "#d95349",colornotename:"RED",blingnote:true});
        }else{
            this.setState({note:this.state.language.statusempty,disabled:"disabled",colornote: "#73879c",colornotename:"GRAY",blingnote:false});
        }
    }
    handle_click_back1(){
        this.state.callbackzero(this.state.balanceNo);
        this.props.calilockall();
        //this.setstatus(1);
    }
    handle_click_back2(){
        this.state.callbackcountweight(this.state.balanceNo);
        this.props.calireleaseall();
    }
    render() {
        let light=[];
        let lightbrick1="btn pull-right btn-primary btn-sm";
        let lightnote1="alert alert-success";
        let lightcircle1="btn btn-primary btn-sm ";
        if(this.state.blingbrick)  lightbrick1 = "btn pull-right btn-primary btn-sm blingbling-"+this.state.colorbrickname;
        if(this.state.blingnote)  lightnote1 = "alert alert-success blingbling-"+this.state.colornotename;
        if(this.state.blingcircle)  lightcircle1 = "btn btn-primary btn-sm  blingbling-"+this.state.colorcirclename;
        light.push(
            <div key="light" style={{width:"100%",float: "left",position:"relative",marginTop:this.state.width*0.00,display:'table'}}>
                <div style={{marginTop:"10px",position:"relative",float:"left",width:"100%",display:'table'}}>
                    <h3 style={{width:"100%",fontSize:15,marginTop:"6px",marginLeft:5,marginBottom:"3px",textAlign:"center"}} className="pull-left">{this.state.title}</h3>
                    <div style={{width:"100%",float: "left",position:"relative",display:'table'}}>

                        <div className={lightnote1} role="alert" style={{textAlign:"center",float: "right",position:"relative",backgroundColor:this.state.colornote,borderColor:this.state.colornote,padding:10,marginBottom:0,top: "50%",
                        width:"100%",height:(this.state.height*5),verticalAlign:'middle',display:'table-cell'}}>
                            <p style={{fontSize:"45px",paddingTop:this.state.height*1.5,color:"#ffffff",fontWeight:700}}> {this.state.note}</p>
                        </div>
                        <div style={{float: "left",position:"relative",marginRight:"5px",marginTop:"15px",height:(this.state.height-10),width:(this.state.height-10)*3,display:this.state.hideBack}}>
                            <button  type="button" className={lightcircle1} style={{height:(this.state.height-10),width:(this.state.height-10)*3,display:this.state.hideBack}} disabled={this.state.lockdisabled} onClick={this.handle_click_back1.bind(this)}>
                                <i className="fa fa-upload" style={{fontSize:"24px"}}> </i>
                            </button>
                        </div>
                        <div style={{float: "right",position:"relative",marginLeft:"5px",marginTop:"15px",height:(this.state.height-10),width:(this.state.height-10)*3,display:this.state.hideBack}}>
                            <button  type="button" className={lightbrick1} style={{height:(this.state.height-10),width:(this.state.height-10)*3,display:this.state.hideBack,marginRight:0}} disabled={this.state.disabled} onClick={this.handle_click_back2.bind(this)}>
                                <i className="fa fa-download" style={{fontSize:"24px"}}> </i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="tile-stats"  style={{marginTop:"15px",height:"200px"}}>
                    <a>{this.state.debugmsg}</a>
                </div>
            </div>);

        return (
            <div>{light}</div>

        );
    }
}