/**
 * Created by hyj on 2017/5/15.
 */
import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../resource/css/font-awesome.min.css';
import './calibrationview.css';
import CaliUnit from './calibrationunit/calibrationunit.js';
import DynamicUnit from './dynamiccalibrationunit/dynamiccalibrationunit.js';
import Smallbrickbutton from '../brickview/smallbrickbutton/smallbrickbutton';


export default class calibrationview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            footheight:100,
            bricksize:100,
            marginsize:5,
            hide:"block",
            key:"calibrationbutton",
            key2:"calibrationlight",
            disabled:"",
            zeroorfull:false,
            running:false,
            configuration:null,
            buttonlist:[],
            configurationname:"--",
            selectdisable:"",
            language:{
                buttontitlestart:"Zero Calibration",
                buttontitlestop:"Full Calibration",
                titlestatic:"Static Calibration",
                titledynamic:"Dynamic Calibration",
                modaltitle:"Please select a configuration",
                tipstitle:"Current",
                modalcancel:"Cancel",
                buttonselect:"Select Conf"
            }
        }
        //this.keyboard_initialize();
        this._calilockall=this.calilockall.bind(this);
        this._calireleaseall=this.calireleaseall.bind(this);
        this._smalliconclick=this.choiceconfiguration.bind(this);
    }
    update_language(language){
        this.setState({language:language});
        for(let i=0;i<1;i++){
            this.refs['Light'+(i+1)].updatelanguage(language.calibrationunit);
        }
        for(let i=0;i<1;i++){
            this.refs['dynamic'+(i+1)].updatelanguage(language.dynamiccalibrationunit);
        }
    }
    update_buttonlist(buttonlist){
        this.setState({buttonlist:buttonlist},this.updateprop);
    }
    update_size(width,height,footheight){
        let size = (width-50)/4;
        let marginsize = size*0.05;
        let bricksize = size-marginsize*2;
        this.setState({height:height,width:width,footheight:footheight,marginsize:marginsize,bricksize:bricksize});
        this.refs['Light1'].initialize("left",width,footheight);
        /*
        for(let i=1;i<9;i++){
            this.refs['Light'+(2*i-1)].initialize("left",width,footheight);
            this.refs['Light'+(2*i)].initialize("right",width,footheight);
        }*/

    }
    updateprop(){
        for(let i=0;i<this.state.buttonlist.length;i++) {
            this.refs["selectconfbutton"+ i].updateprop(this.state.buttonlist[i],"configure",this.state.bricksize);
            //console.log(this.state.Framelist[i]);
        }
    }
    calilockall(){
        this.props.workcontrolhead(false);
        this.props.workcontrolfoot(false,false,false);
        this.lockbutton();
    }
    calireleaseall(){
        this.props.workcontrolhead(true);
        this.props.workcontrolfoot(false,true,false);
        this.releasebutton();
    }
    update_callback(callbackzero,callbackcountweight){
        for(let i=0;i<1;i++){
            this.refs['Light'+(i+1)].updatecallback(callbackzero,callbackcountweight);
        }
    }
    update_balance_status(balanceNo,status,weight,msg){
        this.refs['Light'+(parseInt(balanceNo))].setstatus(status,weight,msg);
    }
    update_dynamic_status(status){
            this.refs['dynamic'+(parseInt(status.balance))].update_status(status);
    }
    hide(){
        this.setState({hide:"none",configuration:null,configurationname:"--"});

    }
    show(){
        this.setState({hide:"block"});
        for(let i=0;i<1;i++){
            this.refs['Light'+(i+1)].updatebalance(i+1);
        }
    }
    dynamic_action(){
        /*
        if(this.state.running){
            this.props.calistopcase();
            this.setState({running:false});
            this.lockall(false);
            this.props.workcontrolhead(true);
            this.props.workcontrolfoot(false,true,false);
        }else{

            this.props.calistartcase();
            this.setState({running:true});
            this.lockall(true);
            this.props.workcontrolhead(false);
            this.props.workcontrolfoot(false,false,false);
        }*/
        if(this.state.zeroorfull){
            this.props.calistopcase(this.state.configuration);
            this.setState({running:true});
            this.lockall(true);
            this.props.workcontrolhead(false);
            this.props.workcontrolfoot(false,false,false);
            this.lockbutton();
        }else{
            this.props.calistartcase(this.state.configuration);
            this.setState({running:true});
            this.lockall(true);
            this.props.workcontrolhead(false);
            this.props.workcontrolfoot(false,false,false);
            this.lockbutton()
        }
        this.setState({selectdisable:"disabled"});
    }
    zero_finish(){
        this.setState({zeroorfull:true});
        this.releasebutton();
    }
    full_finish(){
        this.setState({zeroorfull:false});
        this.setState({running:false});
        this.lockall(false);
        this.props.workcontrolhead(true);
        this.props.workcontrolfoot(false,true,false);
        this.releasebutton();
        this.setState({selectdisable:""});
    }
    lockall(bool){
        for(let i=0;i<1;i++){
            this.refs['Light'+(i+1)].lockall(bool);
        }
    }
    lockbutton(){
        this.setState({disabled:"disabled"});
    }
    choiceconfiguration(configuration,type){
        this.setState({configuration:configuration,configurationname:configuration.name});
        //HYJ: need to dismiss the module here

        $('#SelectConfigureModel').modal('hide');
    }
    showmodule(){
        $('#SelectConfigureModel').modal('show');
    }

    releasebutton(){
        this.setState({disabled:""})
    }
    render() {

        let unitlist = [];
        for (let i = 1; i < 2; i++) {
            let key = "Light" + i;
            unitlist.push(<div key={key}>
                <CaliUnit ref={key}
                          calilockall={this._calilockall}
                          calireleaseall={this._calireleaseall}
                />
            </div>);
        }
        let dynamiclist = [];
        for (let j = 1; j < 2; j++) {
            let key = "dynamic" + j;
            dynamiclist.push(<div key={key}>
                <DynamicUnit ref={key}/>
            </div>);
        }

        let title_info = this.state.language.buttontitlestart;
        //if(this.state.running) title_info= this.state.language.buttontitlestop;
        if(this.state.zeroorfull) title_info= this.state.language.buttontitlestop;

        let conficons=[];
        for(let i=0;i<this.state.buttonlist.length;i++){
            let tempkey = "confbutton"+i;
            let icon = "./svg/"+this.state.buttonlist[i].icon;
            conficons.push(
                <div key={"selectconfbutton"+i} style={{marginTop:this.state.marginsize/2,marginLeft:this.state.marginsize/2,marginRight:this.state.marginsize/2,marginBottom:this.state.marginsize/2,width:this.state.bricksize/2,height:this.state.bricksize/2,float: "left",position:"relative"}}>
                    <Smallbrickbutton  ref={"selectconfbutton"+i} smalliconclick={this._smalliconclick}/>

                </div>
            );
        }
        let button_display = "none";
        if(this.state.configuration!= null)button_display = "block";
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
                <div className="container">
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="tile-stats"  style={{marginTop:"15px"}}>
                            <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.titlestatic}</div>
                            <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" >
                                <div key="rightpanel"
                                     style={{width:"90%",height:575,float: "left",position:"relative",marginLeft:this.state.width*0.02}}>

                                    <div key="Lightboard"
                                         style={{width:"100%",float: "left",position:"relative"}}>
                                        {unitlist}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6 col-lg-6">
                        <div className="tile-stats"  style={{marginTop:"15px",minHeight: "621.5px"}}>
                            <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.titledynamic}</div>
                            <div className="col-xs-12 col-md-8 col-sm-8 col-lg-8" >
                                <button type="button" id="calibration_select" data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{minWidth: "150px",height:"50px",color:"#ffffff",fontWeight:700,background:"#000000"}} disabled={this.state.selectdisable} onClick={this.showmodule.bind(this)} >
                                    {this.state.language.buttonselect}
                                </button>
                                <label>{this.state.language.tipstitle+":"+this.state.configurationname}</label>
                            </div>
                            <div className="col-xs-12 col-md-4 col-sm-4 col-lg-4" style={{display:button_display}}>
                                <button type="button" id="calibration_start" data-loading-text="Loading..." className="btn btn-primary pull-right" autoComplete="off" style={{minWidth: "150px",height:"50px",color:"#ffffff",fontWeight:700,background:"#000000"}} disabled={this.state.disabled} onClick={this.dynamic_action.bind(this)} >
                                    {title_info}
                                </button>
                            </div>
                            <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" style={{display:button_display}}>

                                {dynamiclist}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="modal fade" id="SelectConfigureModel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{width:'100%'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" >{this.state.language.modaltitle}</h4>
                            </div>
                            <div id="SelectConfigureModelContentBody" className="modal-body" style={{height:this.state.height*0.75,maxHeight:this.state.height*0.75,overflow:"scroll",overflowX:"hidden"}}>

                                <div className="col-md-12">
                                    <div style={{position:"relative",background:"#FFFFFF",width:'100%',display:this.state.hide}}>
                                        {conficons}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">{this.state.language.modalcancel}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}