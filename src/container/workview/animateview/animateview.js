/**
 * Created by hyj on 2017/3/10.
 */

import React, {
    Component,
    PropTypes
} from 'react';

import classNames from 'classnames';
import '../../../../resource/css/font-awesome.min.css';
import Label1 from "../billboardview/billlabel/label1.js"
import Labelbig from "../billboardview/billlabel/labelbig.js"
import Chamber from "./chambermodule/chambermodule.js"
import Process from "./processmodule/processmodule.js"



export default class animateview extends Component {
    constructor(props) {
        super(props);

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

        this.state={
            height:700,
            width:600,
            configuration:null,
            hide:"block",
            language:{}
        };


    }
    update_configuration(configuration){
        this.setState({configuration:configuration});
    }
    update_language(language){
        //console.log(language);
        this.setState({language:language});
    }
    update_size(width,height){
        this.setState({height:height,width:width});
        for(let i=1;i<31;i++){
            this.refs["Chamber2x"+i].update_reverse(true);
        }
        this.refs.Process1.update_size(width*0.98,70);
        this.refs.Process2.update_size(width*0.98,70);
        this.refs.Process1.initialize("1");
        this.refs.Process2.initialize("2");
        for(let i=1;i<31;i++){
            this.refs["Chamber1x"+i].update_id("1x"+i);
            this.refs["Chamber2x"+i].update_id("2x"+i);
        }
    }
    update_statistics(data){
        this.refs.Labelbigboard.updateprop(data.biglabel.status);
        this.refs.Labelbigboard.initialize(data.biglabel.title,data.biglabel.note);
        for(let i=1;i<7;i++){
            this.refs['Label'+i].updateprop(this.colorlist[data.labellist[i-1].color],data.labellist[i-1].value);
            this.refs['Label'+i].initialize(data.labellist[i-1].title,data.labellist[i-1].note);
        }
    }
    initialize_chamber(data){
        for(let i=0;i<data.array1.length;i++){
            if(data.array1[i].id >0 && data.array1[i].id<31){
                //console.log(data.array1[i]);
                this.update_chamber(data.array1[i]);
            }
        }

        for(let i=0;i<data.array2.length;i++){
            if(data.array2[i].id >0 && data.array2[i].id<31){
                //console.log(data.array1[i]);
                this.update_chamber(data.array2[i]);
            }
        }
    }
    update_chamber(data){
        this.refs["Chamber"+data.process+"x"+data.id].update_status(data);
    }
    update_package(data){
        this.refs["Process"+data.process].throwbox(data.target);
    }

    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    render() {
        let chamberlist1=[];
        for(let i=1;i<31;i++){
            chamberlist1.push(
                <div style={{width:this.state.width*0.032,float: "left",position:"relative"}} key={"Chamber1x"+i}>
                    <Chamber ref={"Chamber1x"+i} />
                </div>
            );
        }
        let chamberlist2=[];
        for(let i=1;i<31;i++){
            chamberlist2.push(
                <div style={{width:this.state.width*0.032,float: "left",position:"relative"}}  key={"Chamber2x"+i}>
                <Chamber ref={"Chamber2x"+i} /></div>);
        }
        let labellist=[];
        for(let i=1;i<7;i++){
            labellist.push(
                <div key = {"Label"+i}  style={{width:"30%",float: "left",position:"relative",marginLeft:this.state.width*0.02}}>
                    <Label1 ref={"Label"+i}/>
                </div>);
        }
        return (
            <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                <div key = "leftpanel" style={{width:this.state.width*0.98,height:this.state.height,float: "left",position:"relative",marginLeft:this.state.width*0.01,marginTop:this.state.width*0.01}}>
                    <div style={{marginLeft:this.state.width*0.02,width:this.state.width*0.98,float: "left",position:"relative"}}>
                        {chamberlist1}
                    </div>
                    <div style={{width:this.state.width*0.98,float: "left",position:"relative"}}>
                        <Process ref={"Process1"}/>
                    </div>
                    <div style={{width:this.state.width*0.98,float: "left",position:"relative"}}>
                        <Process ref={"Process2"}/>
                    </div>
                    <div style={{marginLeft:this.state.width*0.02,width:this.state.width*0.98,float: "left",position:"relative"}}>
                        {chamberlist2}
                    </div>
                    <div style={{width:this.state.width*0.24,float: "left",position:"relative"}}>
                        <Labelbig ref="Labelbigboard"/>
                    </div>
                    <div style={{width:this.state.width*0.74,float: "left",position:"relative"}}>
                        {labellist}
                    </div>
                </div>
            </div>
        );

    }
}