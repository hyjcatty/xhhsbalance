/**
 * Created by Huang Yuanjie on 2017/10/7.
 */

import React, {
    Component,
    PropTypes
} from 'react';

import classNames from 'classnames';



export default class processmodule extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:"p0",
            height:70,
            width:1000,
            reverse:false,
            hide:"block",
        }
        this.processlist_free = [];
        this.processlist_run = [];
    }
    update_size(width,height){
        this.setState({height:height,width:width});
    }
    initialize(id){
        this.setState({id:"p"+id});
        for(var i=1;i<11;i++){
            this.processlist_free.push(i);
        }
    }
    removefromlist(dom){
        let id = dom.attr('id');
        //console.log("prepare to move ["+id+"]");
        let number = id.split("animationprocess")[1];
        //console.log("prepare to move ["+number+"]");
        for(let i=0;i<this.processlist_run.length;i++){
            if(this.processlist_run[i] == parseInt(number)){
                this.processlist_run.splice(i,1);
                this.processlist_free.push(parseInt(number));
            }
        }
    }
    throwbox(target){
        //console.log(this.processlist_free.length);
        if(this.processlist_free.length <= 0) return;
        var temp = this.processlist_free.shift();
        //console.log("select number:"+temp);
        $('#'+this.state.id+'animationprocess'+temp).attr("display","block");

        this.processlist_run.push(temp);
        //console.log("processlist_run size:"+this.processlist_run.length);
        //console.log("RunRight"+target);
        $('#'+this.state.id+'animationprocess'+temp).removeClass().addClass('RunRight'+target+' linear').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this,function(event){
            $(this).removeClass();
            $(this).attr("display","none");
            event.data.removefromlist($(this));
        });
    }
    render() {
        return(
        <div  style={{marginTop:10,marginBottom:10,display: "block",width:"100%",height:this.state.height-20,background: "#00FF00 url(./resource/image/timg.png) repeat fixed center"}}>
            <span id={this.state.id+"animationprocess1"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                </i></a>
            </span>
            <span id={this.state.id+"animationprocess2"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                <a ><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                </i></a>
            </span>
            <span id={this.state.id+"animationprocess3"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                </i></a>
            </span>
            <span id={this.state.id+"animationprocess4"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                </i></a>
            </span>
            <span id={this.state.id+"animationprocess5"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                </i></a>
            </span>
            <span id={this.state.id+"animationprocess6"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                </i></a>
            </span>
            <span id={this.state.id+"animationprocess7"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                <a ><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                </i></a>
            </span>
            <span id={this.state.id+"animationprocess8"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                </i></a>
            </span>
            <span id={this.state.id+"animationprocess9"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                </i></a>
            </span>
            <span id={this.state.id+"animationprocess10"} style={{marginTop:"5px",position:'absolute',display: 'block',width:this.state.width,transitionTimingFunction: 'linear',WebkitTransitionTimingFunction: 'linear'}} >
                <a><i className = "fa fa-gift" style={{fontSize:'40px'}}>
                </i></a>
            </span>
        </div>
        );

    }
}