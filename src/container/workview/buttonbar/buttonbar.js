/**
 * Created by hyj on 2017/3/10.
 */

import React, {
    Component,
    PropTypes
    } from 'react';

import classNames from 'classnames';
import '../../../../resource/css/font-awesome.min.css';
import './buttonbar.css';



export default class buttonbar extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            hide:"block",
            configuration:null,
            buttonnumber:2,
            brickwidth:100,
            brickheight:100,
            marginleft:5,
            margintop:5,
            status:0,
            button:["","","",""],
            language:{
                "run_configure":{
                    "button1":"START",
                    "button2":"MODIFY",
                    "button3":"DELETE",
                    "button4":"ToZero"
                },
                "calibration_configure":{
                    "button1":"TO_ZERO",
                    "button2":"CALIBRATION"
                },
                "modify_configure":{
                    "button1":"SAVE",
                    "button2":"ABORT"
                },
                "new_configure":{
                    "button1":"SAVE",
                    "button2":"ABORT"
                },
                "running_configure":{
                    "button1":"PAUSE",
                    "button2":"STOP"
                },
                "pause_configure":{
                    "button1":"RESUME",
                    "button2":"STOP"
                }
            }
        }
    }
    update_language(language){
        this.setState({language:language});
    }
    update_size(width,height){
        this.setState({height:height,width:width},this.calculatesize);
        //console.log("button bar width:"+width+",height:"+height);
    }
    calculatesize(){
        let Bheight =(this.state.height/this.state.buttonnumber)*0.8;
        let Bwidth  =(this.state.width)*0.8;
        if(Bheight>Bwidth) Bheight=Bwidth;
        let TopMargin = (this.state.height-Bheight*this.state.buttonnumber)/(this.state.buttonnumber+1);
        let LeftMargin = this.state.width*0.1;
        this.setState({brickwidth:Bwidth,brickheight:Bheight,marginleft:LeftMargin,margintop:TopMargin});
    }
    run_configure(){
        //this.showbutton2();
        this.setState({button:[this.state.language.run_configure.button1,
            this.state.language.run_configure.button2,
            this.state.language.run_configure.button3,
            this.state.language.run_configure.button4
        ],status:0,buttonnumber:3},this.calculatesize);

    }
    calibration_configure(){
        //this.showbutton2();
        this.setState({button:[this.state.language.calibration_configure.button1,
            this.state.language.calibration_configure.button2
        ],status:0,buttonnumber:2},this.calculatesize);
    }
    modify_configure(){
        this.setState({button:[this.state.language.modify_configure.button1,
            this.state.language.modify_configure.button2
        ],status:0,buttonnumber:2},this.calculatesize);
    }
    new_configure(){
        this.setState({button:[this.state.language.new_configure.button1,
            this.state.language.new_configure.button2
        ],status:0,buttonnumber:2},this.calculatesize);
    }
    running_configure(){
        this.setState({button:[this.state.language.running_configure.button1,
            this.state.language.running_configure.button2
        ],status:0,buttonnumber:2},this.calculatesize);
    }
    pause_configure(){
        this.setState({button:[this.state.language.pause_configure.button1,
            this.state.language.pause_configure.button2
        ],status:0,buttonnumber:2},this.calculatesize);
    }
    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"});
    }
    handle_click(e){
        let i = e.target.getAttribute('data-buttonnumber');
        //console.log("button series :"+i);
        if(i===null)return;
        this.props.buttonclick(parseInt(i));
    }
    render() {
        let buttonlist =[];
        for(let i=0;i<this.state.buttonnumber;i++){
            let temp =
                <div key={"buttonkey"+i} style={{marginTop:this.state.margintop,marginLeft:this.state.marginleft,width:this.state.brickwidth,height:this.state.brickheight,float: "left",position:"relative"}}>
                    <button type="button" className="btn" data-buttonnumber={''+(i)} style={{width:this.state.brickwidth,height:this.state.brickheight,verticalAlign:"middle"}} onClick={this.handle_click.bind(this)}>
                        <i data-buttonnumber={''+(i)}>
                            <a data-buttonnumber={''+(i)} style={{position:"relative",height:this.state.brickheight*0.3,display:'table-cell',verticalAlign:'middle'}}>
                                <span data-buttonnumber={''+(i)} className="framelabel"  style={{fontSize:this.state.brickheight*0.2,marginLeft:0}}>
                                    {this.state.button[i]}
                                </span>
                            </a>

                        </i>
                    </button>
                </div>;
            buttonlist.push(temp);
        }

        return (
            <div style={{position:"relative",background:"#73839c",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflowY:'hidden',overflowX:'hidden'}}>
                {buttonlist}
            </div>
        );
    }
}