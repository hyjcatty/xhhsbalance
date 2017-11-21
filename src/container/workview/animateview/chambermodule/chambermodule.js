/**
 * Created by Huang Yuanjie on 2017/10/7.
 */

import React, {
    Component,
    PropTypes
} from 'react';

import classNames from 'classnames';



export default class chambermodule extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:70,
            width:30,
            reverse:false,
            hide:"block",
            configuration:null,
            bricksize:100,
            marginsize:5,
            margintop:5,
            status:true,
            error:false,
            volume:0,
            reject:0,
            id:0

        }
    }
    update_reverse(reverse){
        this.setState({reverse:reverse});
    }
    update_id(id){
        this.setState({id:id});
    }
    update_status(chamberstatus){
        if(chamberstatus.status !=this.state.status){
            console.log("status change!");
            this.setState({status:chamberstatus.status,error:false,volume:0,reject:0});
            this.chamberremoveerror();
            return;
        }else if(this.state.status == false){
            return;
        }else{
           if (chamberstatus.error == true){
               //console.log("get error!");
               this.setState({error:true,volume:chamberstatus.volume,reject:chamberstatus.reject},this.chambererror);
               return;
           }else{
               this.setState({error:false,volume:chamberstatus.volume,reject:chamberstatus.reject});
               this.chamberremoveerror();
               if(chamberstatus.package == true){
                   this.chamberclean();
               }else if(chamberstatus.fillin == true){
                   this.chamberfill();
               }
           }
        }

    }
    chambererror(){
        $('#animationpackage'+this.state.id).attr("display","block");
        //$('#changetopackage').removeClass().addClass("fa fa-archive");
        $('#animationpackage'+this.state.id).removeClass().addClass('shake animated infinite pull-right');
        $('#changetopackage'+this.state.id).removeClass().addClass("fa fa-inbox");
    }
    chamberremoveerror(){
        $('#animationpackage'+this.state.id).removeClass().addClass("pull-right");
        $('#changetopackage'+this.state.id).removeClass().addClass("fa fa-inbox");
    }
    chamberclean(){
        $('#animationpackage'+this.state.id).attr("display","block");
        $('#changetopackage'+this.state.id).removeClass().addClass("fa fa-archive");
        $('#animationpackage'+this.state.id).removeClass().addClass('fadeOutUp animated pull-right').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass().addClass("pull-right");
            $(this).attr("display","block");
            let name = $(this).attr("id").replace(/animationpackage/, "changetopackage");
            $('#'+name).removeClass().addClass("fa fa-inbox");
        });
    }
    chamberfill(){
        $('#animationSandbox'+this.state.id).attr("display","block");
        $('#animationSandbox'+this.state.id).removeClass().addClass('fadeOutDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
            $(this).attr("display","block");
        });
    }
    render() {
        let temp;
        if(this.state.volume == 100 || this.state.error ){
            temp=<span id={"animationpackage"+this.state.id} className="pull-right" >
                    <a >
                        <i className = "fa fa-inbox" id={"changetopackage"+this.state.id} style={{fontSize: "30px",marginTop: "-10px", color:"#CC0000"}}/>
                    </a>
                </span>;
        }else{
            if(this.state.status){

                temp=<span id={"animationpackage"+this.state.id}   className="pull-right">
                    <a >
                        <i className = "fa fa-inbox" id={"changetopackage"+this.state.id}  style={{fontSize:"30px",marginTop: "-10px"}}/>
                    </a>
                </span>;
            }else{
                temp=<span id={"animationpackage"+this.state.id}   className="pull-right">
                    <a >
                        <i className = "fa fa-inbox" id={"changetopackage"+this.state.id}  style={{fontSize:"30px",marginTop: "-10px", color:"#DDDDDD"}}/>
                    </a>
                </span>;
            }
        }
        let volume=
        <div style={{position:"relative",width:"auto"}}>
        <span className="pull-right" style={{marginRight:"5px"}}>
            <a >
                <i style={{fontSize:"10px",color:"#5599ff"}}>
                    {this.state.volume}
                </i>
            </a>
		</span></div>;
        let reject = <div style={{position:"relative",width:"auto"}}>
        <span  className="pull-right" style={{marginRight:"5px"}}>
            <a >
            <i style={{fontSize:"10px", color:"#b94fff"}}>
                {this.state.reject}
        </i>
        </a>
        </span></div>;
        let maininfo = <span id={"animationSandbox"+this.state.id} key={this.state.id} style={{display: "block",opacity: 0}} className="pull-right">
                    <a  style={{marginLeft:"17px"}}>
                        <i className = "fa fa-gift" style={{fontSize:"15px"}}/>
                    </a>
                </span>;

        if(this.state.reverse){
            return (
                <div style={{position:"relative",width:"auto"}}>
                    <div style={{position:"relative",width:"auto"}}>
                    {maininfo}
                    {temp}
                    </div>
                    <div className="clearfix"></div>
                    {reject}
                    <div className="clearfix"></div>
                    {volume}
                    <div className="clearfix"></div>
                </div>
            );
        }else{
            return (
                <div style={{position:"relative",width:"auto"}}>
                    {volume}
                    <div className="clearfix"></div>
                    {reject}
                    <div className="clearfix"></div>
                    <div style={{position:"relative",width:"auto"}}>
                    {maininfo}
                    {temp}
                    </div>
                    <div className="clearfix"></div>
                </div>
            );
        }

    }
}