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


export default class calibrationview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            footheight:100,
            hide:"block",
            key:"calibrationbutton",
            key2:"calibrationlight",
            disabled:"",
            zeroorfull:false,
            running:false,
            language:{
                buttontitlestart:"Zero Calibration",
                buttontitlestop:"Full Calibration",
                titlestatic:"Static Calibration",
                titledynamic:"Dynamic Calibration"
            }
        }
        //this.keyboard_initialize();
        this._calilockall=this.calilockall.bind(this);
        this._calireleaseall=this.calireleaseall.bind(this);
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
    update_size(width,height,footheight){
        this.setState({height:height,width:width,footheight:footheight});
        this.refs['Light1'].initialize("left",width,footheight);
        /*
        for(let i=1;i<9;i++){
            this.refs['Light'+(2*i-1)].initialize("left",width,footheight);
            this.refs['Light'+(2*i)].initialize("right",width,footheight);
        }*/

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
        this.setState({hide:"none"});
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
            this.props.calistopcase();
            this.setState({running:true});
            this.lockall(true);
            this.props.workcontrolhead(false);
            this.props.workcontrolfoot(false,false,false);
            this.lockbutton();
        }else{
            this.props.calistartcase();
            this.setState({running:true});
            this.lockall(true);
            this.props.workcontrolhead(false);
            this.props.workcontrolfoot(false,false,false);
            this.lockbutton()
        }
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
    }
    lockall(bool){
        for(let i=0;i<1;i++){
            this.refs['Light'+(i+1)].lockall(bool);
        }
    }
    lockbutton(){
        this.setState({disabled:"disabled"});
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
                            <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" >
                                <button type="button" id="calibration_start" data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{minWidth: "150px",color:"#ffffff",fontWeight:700,background:"#000000"}} disabled={this.state.disabled} onClick={this.dynamic_action.bind(this)} >
                                    {title_info}
                                </button>
                                {dynamiclist}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}