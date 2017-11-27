/**
 * Created by Huang Yuanjie on 2017/11/27.
 */
/**
 * Created by hyj on 2017/3/10.
 */

import React, {
    Component,
    PropTypes
} from 'react';

import classNames from 'classnames';
import '../../../../resource/css/font-awesome.min.css';



export default class dynamiccalibrationunit extends Component {
    constructor(props) {
        super(props);

        this.colorlist = {
            RED: "#880000",
            ORANGE: "#bb5500",
            BLUE: "#000088",
            GREEN: "#227700",
            GRAY: "#878787",
            PURPLE: "#4b0082",
            LBLUE: "#003377",
            LGREEN: "#008800",
            LGRAY: "#696969",
            DBLUE: "#191970"
        };
        let showlist = {

            balance: 1,
            status: false,
            value: [{
                name: '---',
                value: "----",
            }, {
                name: '---',
                value: "----",
            }, {
                name: "---",
                value: "----",
            }]
        };

        this.state = {
            height: 700,
            width: 600,
            showlist: showlist,
            configuration: null,
            hide: "block",
            language: {
                title:"balance"
            }
        };


    }

    updatelanguage(language) {
        this.setState({language: language});
    }

    update_size(width, height) {
        this.setState({height: height, width: width});

    }

    update_status(status) {
        this.setState({showlist: status});
    }

    clear() {
        this.update_status(this.state.defaultshow);
    }

    hide() {
        this.setState({hide: "none"});
    }

    show() {
        this.setState({hide: "block"});
    }

    render() {
        let color ="#000000";
        if(this.state.showlist.status) color="#227700";
        let param=[];
        for(let i=0;i<this.state.showlist.value.length;i++){
            param.push(
                <div className="tile-stats" key={"keydynamic"+i} style={{borderStyle:"none none solid none",borderRadius:"0px"}}>
                    <h3 style={{paddingTop:10,color:"#000000",fontWeight:"bold"}}>{this.state.showlist.value[i].name}</h3>
                    <div key="statuspanel" className="count" style={{color:color,fontSize:72,marginTop:-10,marginBottom:-10,textAlign:"center",fontWeight:900}}>{this.state.showlist.value[i].value}</div>
                </div>
            );

        }

        return (
            <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" >
                <div className="tile-stats" key={"Balance"+this.state.showlist.balance} style={{marginTop:"15px",border:"0px"}}>
                    <div key="statuspanel" className="count" style={{fontSize:24}}>{this.state.language.title+this.state.showlist.balance}</div>
                    <div className="col-xs-12 col-md-12 col-sm-12 col-lg-12" >
                        {param}
                    </div>
                </div>
            </div>



        );
    }

}
