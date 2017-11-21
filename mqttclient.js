/**
 * Created by hyj on 2017/8/7.
 */
var mqtt  = require('mqtt');
//var client  = mqtt.connect('mqtt://test.mosca.io');
//var client  = mqtt.connect('mqtt://192.168.103.237');
//var client  = mqtt.connect('mqtt://m2m.vicbang.com',{
//    username:'13800000000',
//    password:'123456',
//    clientId:'app_13800000000'
//});

var start = false;

var client  = mqtt.connect('mqtt://127.0.0.1',{
    username:'username',
    password:'password',
    clientId:'MQTT_XH_High_Speed_Balance_HCU'
});

client.on('connect', function () {
    console.log('connected.....');
    client.subscribe('MQTT_XH_High_Speed_Balance_HCU');

    setInterval(function(){
        if(!start) return;
        client.publish('MQTT_XH_High_Speed_Balance_UI', buildstatisticsinfo());
    },600);

    setInterval(function(){
        if(!start) return;
        client.publish('MQTT_XH_High_Speed_Balance_UI', buildalarminfo());
    },60000);
    setInterval(function(){
        client.publish('MQTT_XH_High_Speed_Balance_UI', buildversioninfo());
    },6000);
    setInterval(function(){
        client.publish('MQTT_XH_High_Speed_Balance_UI', builddebuginfo());
    },6000);
    //client.publish('MQTT_TOPIC_UI_TO_HCU', 'Hello mqtt['+i+']');
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    var msg = JSON.parse(message.toString());
     /* var message = {
     action:"XH_Double_Line_Balance_config_start"
     };* */

     if(msg.action== "XH_High_Speed_Balance_config_start") {
         client.publish('MQTT_XH_High_Speed_Balance_UI', buildstatisticsinfo());

         start = true;

     }else if(msg.action== "XH_High_Speed_Balance_config_stop"){
         start = false;
     }

});
function buildstatisticsinfo(){
    var biglabel= {
        title: "Test BIG Title",
        unit: "Status Report",
        value: GetRandomNum(1,3000)+"g"
    };
    var colorlist=[
        "RED",
        "ORANGE",
        "BLUE",
        "GREEN",
        "GRAY",
        "PURPLE",
        "LBLUE",
        "LGRAY",
        "DBLUE"];
    var smalllabellist=[];
    for(var i=0;i<9;i++){
        var templabel={
            title:"test title",
            unit:"note",
            color:colorlist[GetRandomNum(0,8)],
            value:GetRandomNum(0,300)+"kg"
        }
        smalllabellist.push(templabel);
    }
    var ret={
        action:"XH_High_Speed_Balance_statistics_status",
        data:{
            currentweight:biglabel,
            mainvalue:smalllabellist
        }
    }
    return JSON.stringify(ret);
}
function buildversioninfo(){
    var number = GetRandomNum(1,10);
    var ret;
    if(number >7){
        ret={
            'Alarm':true,
            'Title':'New version',
            'HCU':"yyHCU-SW-R3.V243.DB11.PATCH xxHCU-SW-R3.V243.DB11.PATCH",
            'IHU':"IHU-SW-R3.V243.DB11.PATCH"
        }
    }else{
        ret={
            'Alarm':false,
            'Title':'Versoin number',
            'HCU':"yyHCU-SW-R3.V243.DB11.PATCH xxHCU-SW-R3.V243.DB11.PATCH",
            'IHU':"IHU-SW-R3.V243.DB11.PATCH"
        }
    }

    var version = {
        action:"XH_High_Speed_Balance_version_status",
        data:ret
    }
    return JSON.stringify(version);
}
function buildalarminfo(){
    var number = GetRandomNum(1,5);
    var sta='true';
    if(number == 2) sta='false';
        ret={
            'status':sta,
            'auth':'true',
            'msg':'error msg:1234567890;1234567890;1234567890'
        }


    var version = {
        action:"XH_High_Speed_Balance_alarm_status",
        data:ret
    }
    return JSON.stringify(version);
}
function builddebuginfo(){
    var number = GetRandomNum(1,50);
    var msg = "return msg:";
    for(var i=0;i<number;i++){
        msg = msg+" x"+i;
    }


    var version = {
        action:"XH_High_Speed_Balance_debug_status",
        data:msg
    }
    return JSON.stringify(version);
}

function GetRandomNum(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}