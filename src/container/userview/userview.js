/**
 * Created by Huang Yuanjie on 2017/11/24.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import classNames from 'classnames';
//import Rodal    from './rodal/rodal';
import '../../../resource/css/font-awesome.min.css';
import './userview.css';

export default class brickview extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:700,
            width:600,
            userlist:["user1","user1","user11","user111","user1111","user111111","user2","user22","user222","user2222","user22222","user3"],
            localuser:"",
            hide:"block",
            margintop:150,
            drag:null,
            language:{
                "title":"Password change",
                "oldpassword":"oldpassword",
                "newpassword":"newpassword",
                "renewpassword":"renewpassword",
                "confirm":"Confirm",
                "titleadmin":"Admin Tools",
                "titlenewuser":"Create New User",
                "newuser":"new user name",
                "new":"create",
                "userlist":"userlist",
                "tippasswordnowsame":"Password is not same",
                "tipusernametoolong":"user name max length 10"
            }
        }
    }
    update_language(language){
        this.setState({language:language});
    }
    update_size(width,height){
        this.setState({height:height,width:width});

    }
    update_drag(drag){
        this.setState({drag:drag});
    }
    update_user_list(userlist){
        this.setState({userlist:userlist});
    }
    Initialize(user) {
        this.setState({localuser: user}, this.flushuserlist);
    }

    hide(){
        this.setState({hide:"none"});
    }
    show(){
        this.setState({hide:"block"},this.handdrag);
        this.resetshow();
    }
    flushuserlist(){
        this.props.listusercallback();
    }
    newuser(){
        let newusername = $("#NewUsername_Input").val();
        if(newusername.length ==0) return;
        if(newusername.length>10){
            $("#NewUsername_Input").val("");
            $("#NewUsername_Input").attr("placeholder",this.state.language.tipusernametoolong);
            return;
        }
        this.props.newusercallback(newusername);
    }
    deluser(e){
        //console.log(e.target);
        //console.log("attribute:"+e.target.getAttribute("data-username"));
        this.props.delusercallback(e.target.getAttribute("data-username"));
    }
    resetuser(e){
        //this.props.resetusercallback();
        this.props.resetusercallback(e.target.getAttribute("data-username"));
    }
    resetshow(){
        $("#OldPassword_Input").val("");
        $("#NewPassword_Input").val("");
        $("#ReNewPassword_Input").val("");
        $("#NewUsername_Input").val("");
        $("#NewPassword_Input").attr("placeholder",this.state.language.newpassword);
        $("#ReNewPassword_Input").attr("placeholder",this.state.language.renewpassword);
        $("#NewUsername_Input").attr("placeholder",this.state.language.newuser);
    }
    changepassword(){
        let oldpassword = $("#OldPassword_Input").val();
        let newpassword = $("#NewPassword_Input").val();
        let renewpassword = $("#ReNewPassword_Input").val();
        if(newpassword.length==0||oldpassword.length ==0||renewpassword.length==0){
            return;
        }
        if(newpassword!=renewpassword){
            $("#NewPassword_Input").val("");
            $("#ReNewPassword_Input").val("");
            $("#NewPassword_Input").attr("placeholder",this.state.language.tippasswordnowsame);
            $("#ReNewPassword_Input").attr("placeholder",this.state.language.tippasswordnowsame);
            return;
        }
        this.props.changepasswordcallback(this.state.localuser,oldpassword,newpassword);
    }
    handdrag(){

        this.state.drag("userview");
    }
    componentDidMount(){
        //this.keyboard_initialize();
        //$("#Password").blur();
    }
    componentDidUpdate(){
        //this.switchery_initialize();
        this.keyboard_initialize();
    }
    keyboard_initialize(){
        //console.log("user manager keyboard_initialize");
        $.extend( $.keyboard.altKeys, {
            1   : '\u2460 \u2474 \u2488 \u2776 \u278a \u2780',
            '!' : '\u00a1 \u2762 \u2763', // adding two more exclamation points!
            2   : '\u2461 \u2475 \u2489 \u2777 \u278b \u2781',
            3   : '\u2462 \u2476 \u248a \u2778 \u278c \u2782',
            4   : '\u2463 \u2477 \u248b \u2779 \u278d \u2783',
            5   : '\u2464 \u2478 \u248c \u277a \u278e \u2784',
            6   : '\u2465 \u2479 \u248d \u277b \u278f \u2785',
            7   : '\u2466 \u247a \u248e \u277c \u2790 \u2786',
            8   : '\u2467 \u247b \u248f \u277d \u2791 \u2787',
            9   : '\u2468 \u247c \u2490 \u277e \u2792 \u2788',
            0   : '\u2469 \u247d \u2491 \u277f \u2793 \u2789',
            '[' : '\u25c0 \u25c1 \u25c2 \u25c3 \u25c4 \u25c5 \u261a \u261c', // left arrows
            ']' : '\u25b6 \u25b7 \u25b8 \u25b9 \u25ba \u25bb \u261b \u261e', // right arrows
            // action keys the "!!" makes the button get the "ui-state-active" (set by the css.buttonActive option)
            'enter' : '{!!clear} {!!a} {!!c}',
            // smileys, card suits, & other symbols
            '\u263a' : '\u2639 \u263b \u2660 \u2661 \u2662 \u2663 \u2664 \u2665 \u2666 \u2667 \u2766 \u2767 \u263c \u263d \u263e \u2605 \u2606',
            // symbols with 4+ arms
            '\u2719' : '\u271a \u271b \u271c \u271d \u271e \u271f \u2720 \u2721 \u2722 \u2723 \u2724 \u2725 \u2726 \u2727 \u2729 \u272a \u272b \u272c \u272d \u272e \u272f \u2730 \u2731 \u2732 \u2733 \u2734 \u2735 \u2736 \u2737 \u2738 \u2739 \u273a \u273b \u273c \u273d \u273e \u273f \u2740 \u2741 \u2742 \u2743 \u2744 \u2745 \u2746 \u2747 \u2748 \u2749 \u274a \u274b \u2756'
        });

        $(function(){
            $('.user_password').keyboard({
                display: {
                    'bksp': "\u2190",
                    'accept': 'accept',
                    'normal': 'ABC',
                    'meta1': '.?123',
                    'meta2': '#+='
                },
                layout: 'custom',
                usePreview: false,
                css: {
                    // input & preview
                    input: 'form-control input-sm',
                    // keyboard container
                    container: 'center-block dropdown-menu', // jumbotron
                    // default state
                    buttonDefault: 'btn btn-default',
                    // hovered button
                    buttonHover: 'btn-primary',
                    // Action keys (e.g. Accept, Cancel, Tab, etc);
                    // this replaces "actionClass" option
                    buttonAction: 'active',
                    // used when disabling the decimal button {dec}
                    // when a decimal exists in the input area
                    buttonDisabled: 'disabled'
                },
                customLayout: {
                    'normal': [
                        'q w e r t y u i o p {bksp}',
                        'a s d f g h j k l {enter}',
                        '{s} z x c v b n m , . {s}',
                        '{meta1} {space} {meta1} {accept}'
                    ],
                    'shift': [
                        'Q W E R T Y U I O P {bksp}',
                        'A S D F G H J K L {enter}',
                        '{s} Z X C V B N M ! ? {s}',
                        '{meta1} {space} {meta1} {accept}'
                    ],
                    'meta1': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        '- / : ; ( ) \u20ac & @ {enter}',
                        '{meta2} . , ? ! \' " {meta2}',
                        '{normal} {space} {normal} {accept}'
                    ],
                    'meta2': [
                        '[ ] { } # % ^ * + = {bksp}',
                        '_ \\ | ~ &lt; &gt; $ \u00a3 \u00a5 {enter}',
                        '{meta1} . , ? ! \' " {meta1}',
                        '{normal} {space} {normal} {accept}'
                    ]
                },
                visible: function(e, keyboard, el) {
                    //console.log(keyboard.$preview);
                    keyboard.$preview.val("");
                }
            });
            $('.new_user').keyboard({
                display: {
                    'bksp': "\u2190",
                    'accept': 'accept',
                    'normal': 'ABC',
                    'meta1': '.?123',
                    'meta2': '#+='
                },
                layout: 'custom',
                usePreview: false,
                css: {
                    // input & preview
                    input: 'form-control input-sm',
                    // keyboard container
                    container: 'center-block dropdown-menu', // jumbotron
                    // default state
                    buttonDefault: 'btn btn-default',
                    // hovered button
                    buttonHover: 'btn-primary',
                    // Action keys (e.g. Accept, Cancel, Tab, etc);
                    // this replaces "actionClass" option
                    buttonAction: 'active',
                    // used when disabling the decimal button {dec}
                    // when a decimal exists in the input area
                    buttonDisabled: 'disabled'
                },
                customLayout: {
                    'normal': [
                        'q w e r t y u i o p {bksp}',
                        'a s d f g h j k l {enter}',
                        '{s} z x c v b n m , . {s}',
                        '{meta1} {space} {meta1} {accept}'
                    ],
                    'shift': [
                        'Q W E R T Y U I O P {bksp}',
                        'A S D F G H J K L {enter}',
                        '{s} Z X C V B N M ! ? {s}',
                        '{meta1} {space} {meta1} {accept}'
                    ],
                    'meta1': [
                        '1 2 3 4 5 6 7 8 9 0 {bksp}',
                        '- / : ; ( ) \u20ac & @ {enter}',
                        '{meta2} . , ? ! \' " {meta2}',
                        '{normal} {space} {normal} {accept}'
                    ],
                    'meta2': [
                        '[ ] { } # % ^ * + = {bksp}',
                        '_ \\ | ~ &lt; &gt; $ \u00a3 \u00a5 {enter}',
                        '{meta1} . , ? ! \' " {meta1}',
                        '{normal} {space} {normal} {accept}'
                    ]
                },
                visible: function(e, keyboard, el) {
                    keyboard.$preview[0].select();
                }
            });
        });

    }
    render() {
        let output;
        if(this.state.localuser == "admin"){
            let groups1 = [];
            let groups2 = [];
            groups1.push(
                <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" key={"leftlabel"}>
                    <div className="tile-stats"  style={{marginTop:"15px"}}>
                        <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.title}</div>
                        <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} >
                            <div className="input-group">
                                <span className="input-group-addon" id="oldPassword" style={{minWidth: "140px",fontSize:"15px",color:"#000000",fontWeight:700}}>{this.state.language.oldpassword}</span>
                                <input type="password" className="form-control user_password" placeholder={this.state.language.oldpassword} aria-describedby="basic-addon1" id="OldPassword_Input"/>
                            </div>
                            <p></p>
                            <div className="input-group">
                                <span className="input-group-addon" id="newPassword" style={{minWidth: "140px",fontSize:"15px",color:"#000000",fontWeight:700}}>{this.state.language.newpassword}</span>
                                <input type="password" className="form-control user_password" placeholder={this.state.language.newpassword} aria-describedby="basic-addon1" id="NewPassword_Input"/>
                            </div>
                            <p></p>
                            <div className="input-group">
                                <span className="input-group-addon" id="renewPassword" style={{minWidth: "140px",fontSize:"15px",color:"#000000",fontWeight:700}}>{this.state.language.renewpassword}</span>
                                <input type="password" className="form-control user_password" placeholder={this.state.language.renewpassword} aria-describedby="basic-addon1" id="ReNewPassword_Input"/>
                            </div>
                            <p></p>
                            <button type="button" id="changepassword_Confirm" data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{minWidth: "150px",color:"#ffffff",fontWeight:700,background:"#000000"}} onClick={this.changepassword.bind(this)} >
                                {this.state.language.confirm}
                            </button>
                        </div>
                    </div>
                    <div className="tile-stats" style={{marginTop:"15px"}}>
                        <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.titlenewuser}</div>
                        <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} >
                            <div className="input-group">
                                <span className="input-group-addon" id="NewUsername" style={{minWidth: "140px",fontSize:"15px",color:"#000000",fontWeight:700}}>{this.state.language.newuser}</span>
                                <input type="text" className="form-control new_user" placeholder={this.state.language.newuser} aria-describedby="basic-addon1" id="NewUsername_Input"/>
                            </div>
                            <p></p>
                            <button type="button" id="NewUser_Confirm" data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{minWidth: "150px",color:"#ffffff",fontWeight:700,background:"#000000"}} onClick={this.newuser.bind(this)} >
                                {this.state.language.new}
                            </button>
                        </div>
                    </div>
                </div>
            );
            let userlist=[];
            for(let i=0;i<this.state.userlist.length;i++){
                userlist.push(
                    <tr key={"userlistline"+i} style={{height:70}}>
                        <td>
                            <button type='button' className='btn btn-default' data-username={this.state.userlist[i]} style={{width:80,height:70}} onClick={this.deluser.bind(this)}><i className="fa fa-trash" style={{fontSize:30}} data-username={this.state.userlist[i]}> </i></button>
                        </td>
                        <td>
                            <button type='button' className='btn btn-default' data-username={this.state.userlist[i]} style={{width:80,height:70}} onClick={this.resetuser.bind(this)}><i className="fa fa-retweet" style={{fontSize:30}} data-username={this.state.userlist[i]}> </i></button>
                        </td>
                        <td style={{display:"table-cell",verticalAlign: "middle"}}>
                            {this.state.userlist[i]}
                        </td>
                    </tr>
                );

            }
            groups2.push(
                <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" key={"rightlabel"}>
                    <div className="tile-stats" style={{marginTop:"15px"}}>
                        <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.titleadmin}</div>
                        <div className="count" style={{fontSize:20,marginTop:15,verticalAlign:'bottom',width:"90%"}} >
                            <div className="row clearfix">
                                <table data-toggle="table" className="table table-hover" id="Table_user" data-click-to-select="true" style={{marginLeft:10}}>
                                    <tbody>
                                        {userlist}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
            return (
             <div id='userview' style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden'}}>
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
        }else{
            return (
             <div style={{position:"relative",background:"#FFFFFF",height:this.state.height,maxHeight:this.state.height,width:'100%',display:this.state.hide,overflow:'scroll',overflowX:'hidden',overflowY:'hidden',backgroundImage: "url(./resource/image/ctw_black.png)"}}>
                    <div className="container">
                        <div className="leaderboard" style={{marginTop: this.state.margintop}}>
                            <div className="panel panel-default" id="kuang" >
                                <div className="panel-heading">
                                    <h3 className="panel-title" style={{color:"#000000",fontWeight:700}}>{this.state.language.title}</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="input-group">
                                        <span className="input-group-addon" id="oldPassword" style={{minWidth: "140px",fontSize:"15px",color:"#000000",fontWeight:700}}>{this.state.language.oldpassword}</span>
                                        <input type="password" className="form-control user_password" placeholder={this.state.language.oldpassword} aria-describedby="basic-addon1" id="OldPassword_Input"/>
                                    </div>
                                    <p></p>
                                    <div className="input-group">
                                        <span className="input-group-addon" id="newPassword" style={{minWidth: "140px",fontSize:"15px",color:"#000000",fontWeight:700}}>{this.state.language.newpassword}</span>
                                        <input type="password" className="form-control user_password" placeholder={this.state.language.newpassword} aria-describedby="basic-addon1" id="NewPassword_Input"/>
                                    </div>
                                    <p></p>
                                    <div className="input-group">
                                        <span className="input-group-addon" id="renewPassword" style={{minWidth: "140px",fontSize:"15px",color:"#000000",fontWeight:700}}>{this.state.language.renewpassword}</span>
                                        <input type="password" className="form-control user_password" placeholder={this.state.language.renewpassword} aria-describedby="basic-addon1" id="ReNewPassword_Input"/>
                                    </div>
                                    <p></p>
                                    <button type="button" id="changepassword_Confirm" data-loading-text="Loading..." className="btn btn-primary" autoComplete="off" style={{minWidth: "150px",color:"#ffffff",fontWeight:700,background:"#000000"}} onClick={this.changepassword.bind(this)} >
                                        {this.state.language.confirm}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}