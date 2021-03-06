<?php
header("Content-type:text/html;charset=utf-8");
function _encode($arr)
{
  $na = array();
  foreach ( $arr as $k => $value ) {
    $na[_urlencode($k)] = _urlencode ($value);
  }
  return addcslashes(urldecode(json_encode($na)),"\r\n");
}

function _urlencode($elem)
{
  if(is_array($elem)&&(!(empty($elem)))){
    foreach($elem as $k=>$v){
      $na[_urlencode($k)] = _urlencode($v);
    }
    return $na;
  }
  if(is_array($elem)&&empty($elem)){
	  return $elem;
  }
  return urlencode($elem);
}
function filenew($name,$content){
    $newfile=fopen("./json/".$name.".json","w");
    fwrite($newfile,$content);
    fclose($newfile);
}
function filemod($name,$content){
    $modfile=fopen("./json/".$name.".json","w+") ;
    fwrite($modfile,$content);
    fclose($modfile);
}
function confmod($content){
    $modfile=fopen("./sysconf/configure.json","w+") ;
    fwrite($modfile,$content);
    fclose($modfile);
}
function languagemod($content){
    $modfile=fopen("./sysconf/supportlanguage.json","w+") ;
    fwrite($modfile,$content);
    fclose($modfile);
}
function getfiles($path,$type){
    $ret = array();
    if(!file_exists($path)) return $ret;
    foreach(glob($path."/*".$type) as $afile){
        if(is_dir($afile))
        {
            //getfiles($afile.'/*.'.$type);
        } else {
            //echo $afile.'<br />';
            $json_string = file_get_contents($afile);
            //echo print_r($json_string,true);            //��ӡ�ļ�������
            //echo "<br>";

            $obj=json_decode($json_string,true);
            //print_r($obj);
            //echo '<br>'.$obj['name'];
            //echo '<br>'.$obj['icon'];
            //echo '<br>'.$obj['owner'];
            //echo '<br>'.$obj['description'];

            $map= array(
                'index'=>'123',
                'name'=>$obj['name'],
                'icon'=>$obj['icon'],
                'owner'=>$obj['owner'],
                'description'=>$obj['description']
            );
            array_push($ret,$map);
        }
    }
    return $ret;
}
function geticonlist(){
    $path="./svg/";
    $type=".svg";
    $ret = array();
    if(!file_exists($path)) return $ret;
    foreach(glob($path."/*".$type) as $afile){
        if(is_dir($afile))
        {
            //getfiles($afile.'/*.'.$type);
        } else {
            array_push($ret,basename($afile));
        }
    }
    return $ret;
}
function getfiledetail($path){
    $ret = "";
    if(!file_exists($path)) {
        //echo $path." is not exist!";
        return "";
    }
    $afile=$path;
    $json_string = file_get_contents($afile);
    return $json_string;
}
function deletefile($path){
    $ret = "";
    if(!file_exists($path)) {
        //echo $path." is not exist!";
        return false;
    }
    $afile=$path;
    $result = unlink ($path);
    return $result;
}
function get_file_list($dir,$type){
    $ret = array();
    if(!file_exists($ff)) $ret;
    $handle = opendir($ff);
    $i=0;
    while(false !== $file=(readdir($handle))){
        if($file !== "." && $file!=".."){
            $i++;
        }
    }
    return $i;
}
$request_body = file_get_contents('php://input');
//echo $request_body;
$payload = json_decode($request_body,true);
//echo $payload;
$key=$payload["action"];
//echo $key;
switch ($key){
    case "XH_Balance_Login": //Use Wechat to login the Server, response is the userID in system.
    /*
         var body = {
                        username:username,
                        password:password};
         var map={
         action:"HCU_Wechat_Bonding",
         type:"query",
         body: body,
         user:"null"
         };
        * */
            $body=$payload["body"];

            $user=array(
                'username'=> $body["username"],
                'userid'=>'123123123'
            );
            $sta='true';
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'ret'=>$user,
                'msg'=>'12345'
            );

            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "XH_Balance_test": //Query How many lock is autherized to user,response is a list of StatCode and Name and Location and so on

        $retarray = getfiles("./json",".json");
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'ret'=>$retarray,
            'msg'=>''
        );

        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "XH_Balance_config_list": //Query How many lock is autherized to user,response is a list of StatCode and Name and Location and so on

        $retarray = getfiles("./json",".json");
        $basearray = getfiles("./json/base",".json");
        $ret=array(
            'configure'=>$retarray,
            'base'=>$basearray
        );
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'ret'=>$ret,
            'msg'=>''
        );

        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "XH_Balance_config_detail":
        $body=$payload["body"];
        $file_name=$body["file"];
        $type=$body["type"];
        $retarray;
        if($type!="base"){
            $retarray = getfiledetail("./json/".$file_name.".json");}
        else{
            $retarray = getfiledetail("./json/base/".$file_name.".json");
        }
         $obj=json_decode($retarray,true);
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'ret'=>$obj,
            'msg'=>''
        );

        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "XH_Balance_config_delete":
            $body=$payload["body"];
            $file_name=$body["file"];
            $retbool = deletefile("./json/".$file_name.".json");
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>''
            );

            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "XH_Balance_get_svg_list":
        /*
             var map={
             action:"XH_Balance_get_svg_list",
             type:"query",
             user:"null"
             };
            * */
        $retarray = geticonlist();
        //$obj=json_decode($retarray,true);
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'ret'=>$retarray,
            'msg'=>''
        );

        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "XH_Balance_Run": //Use Wechat to login the Server, response is the userID in system.
        /*
         var body = {
                        action:"start" // or stop
         };
         var map={
            action:"XH_Balance_Run",
            type:"query",
            body: body,
            user:"null"
         };
        * */
            $body=$payload["body"];
            $sta='true';
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>'12345'
            );
            //send mqtt message
            $action = $body["action"];

            $server = "127.0.0.1";     // change if necessary
            $port = 1883;                     // change if necessary
            $username = "";                   // set your username
            $password = "";                   // set your password
            $client_id = "MQTT_XH_High_Speed_Balance_PHP"; // make sure this is unique for connecting to sever - you could use uniqid()
            $mqtt = new phpMQTT($server, $port, $client_id);
            if(!$mqtt->connect(true, NULL, $username, $password)) {
                exit(1);
            }
            $topics['MQTT_XH_High_Speed_Balance_PHP'] = array("qos" => 0, "function" => "procmsg");
            //$mqtt->subscribe($topics, 0);
            $retval;
            if($action == "start"){
                $retval=array(
                    'action'=>'XH_High_Speed_Balance_config_start'
                );
            }else{
                $retval=array(
                    'action'=>'XH_High_Speed_Balance_config_stop'
                );
            }
            $mqtt->publish('MQTT_XH_High_Speed_Balance_HCU', _encode($retval));

            $mqtt->close();
            //send mqtt msg end
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "XH_Balance_Pause": //Use Wechat to login the Server, response is the userID in system.
        /*
         var body = {
                        action:"pause" // or resume
         };
         var map={
            action:"XH_Balance_Pause",
            type:"query",
            body: body,
            user:"null"
         };
        * */
            $body=$payload["body"];
            $sta='true';
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>'12345'
            );
            //send mqtt message
            $action = $body["action"];

            $server = "127.0.0.1";     // change if necessary
            $port = 1883;                     // change if necessary
            $username = "";                   // set your username
            $password = "";                   // set your password
            $client_id = "MQTT_XH_High_Speed_Balance_PHP"; // make sure this is unique for connecting to sever - you could use uniqid()
            $mqtt = new phpMQTT($server, $port, $client_id);
            if(!$mqtt->connect(true, NULL, $username, $password)) {
                exit(1);
            }
            $topics['MQTT_XH_High_Speed_Balance_PHP'] = array("qos" => 0, "function" => "procmsg");
            //$mqtt->subscribe($topics, 0);
            $retval;
            if($action == "pause"){
                $retval=array(
                    'action'=>'XH_High_Speed_Balance_config_pause'
                );
            }else{
                $retval=array(
                    'action'=>'XH_High_Speed_Balance_config_resume'
                );
            }




            $mqtt->publish('MQTT_XH_High_Speed_Balance_HCU', _encode($retval));

            $mqtt->close();
            //send mqtt msg end
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "XH_Balance_to_zero_shortcut": //Use Wechat to login the Server, response is the userID in system.
        /*
        body={
                configure:configure
            };
         var map={
            action:"XH_Balance_to_zero_shortcut",
            type:"query",
            user:"null"
         };
        * */
            //$body=$payload["body"];
            $sta='true';
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>'12345'
            );

            $jsonencode = _encode($retval);
            //flushUI();
            echo $jsonencode; break;
    case "XH_Balance_status": //Use Wechat to login the Server, response is the userID in system.
            /*
             var map={
                action:"XH_Balance_status",
                type:"query",
                user:"null"
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
                         let showlist= {
                             statusdetail: {
                                 status: "123",
                                 warning: "123",
                                 error: "123"
                             },
                             mainvalue: [{value: 179, color: "RED"}, {value: 179, color: "RED"}, {value: 179, color: "RED"}, {
                                 value: 179,
                                 color: "RED"
                             }, {value: 179, color: "RED"}, {value: 179, color: "RED"}],
                             detailvalue: [{value: 179, color: "RED", subvalue: "3%", subcolor: "RED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"}
                             ],
                             lightboard: [
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "RED", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true}
                             ]
                         };
            * */
            /*
            $colorlist= array('RED','ORANGE','BLUE','GREEN','GRAY','PURPLE','LBLUE','LGREEN','LGRAY','DBLUE');
            $statusdetail=array(
                'status'=>(string)rand(0,999),
                'warning'=>(string)rand(0,999),
                'error'=>(string)rand(0,999)
            );
            $mainvalue=array();
            for($i=0;$i<9;$i++){
                $temp=array(
                    'title'=>'title'.(string)($i+1),
                    'unit'=>'unit'.(string)($i+1),
                    'value'=>(string)rand(0,250),
                    'color'=>$colorlist[rand(0,9)]
                );
                array_push($mainvalue,$temp);
            }
            $detailvalue=array();
            for($i=0;$i<8;$i++){
                $temp=array(
                    'value'=>(string)rand(0,250),
                    'color'=>$colorlist[rand(0,9)],
                    'subvalue'=>(string)rand(0,100)."%",
                    'subcolor'=>$colorlist[rand(0,9)]
                );
                array_push($detailvalue,$temp);
            }
            $currentweight=array(
            'title'=>'Current Weight',
            'unit'=>'g',
            'value'=>(string)rand(0,250)
            );
            $ret=array(
                'statusdetail'=>$statusdetail,
                'mainvalue'=>$mainvalue,
                'detailvalue'=>$detailvalue,
                'currentweight'=>$currentweight
            );*/
            $sta='true';
            $retval=array(
                //'ret'=>$ret,
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>'12345'
            );

            $jsonencode = _encode($retval);
            flushUI();
            echo $jsonencode; break;
    case "XH_Balance_light": //Use Wechat to login the Server, response is the userID in system.
                /*
                 var map={
                    action:"XH_Balance_status",
                    type:"query",
                    user:"null"
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
                             let showlist= {
                                 statusdetail: {
                                     status: "123",
                                     warning: "123",
                                     error: "123"
                                 },
                                 mainvalue: [{value: 179, color: "RED"}, {value: 179, color: "RED"}, {value: 179, color: "RED"}, {
                                     value: 179,
                                     color: "RED"
                                 }, {value: 179, color: "RED"}, {value: 179, color: "RED"}],
                                 detailvalue: [{value: 179, color: "RED", subvalue: "3%", subcolor: "RED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"}
                                 ],
                                 lightboard: [
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "RED", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true}
                                 ]
                             };
                * */
                $colorlist= array('RED','ORANGE','BLUE','GREEN','GRAY','PURPLE','LBLUE','LGREEN','LGRAY','DBLUE');

                $lightboard=array();
                for($i=0;$i<16;$i++){
                    $blingbrick = false;
                    if(rand(0,1) == 1 )$blingbrick = true;
                    $blingnote = false;
                    if(rand(0,1) == 1 )$blingnote = true;
                    $blingcircle = false;
                    if(rand(0,1) == 1 )$blingcircle = true;
                    $temp=array(
                        'note'=>(string)rand(0,1)." ERROR",
                        'colorbrick'=>$colorlist[rand(0,9)],
                        'blingbrick'=>$blingbrick,
                        'colornote'=>$colorlist[rand(0,9)],
                        'blingnote'=>$blingnote,
                        'colorcircle'=>$colorlist[rand(0,9)],
                        'blingcircle'=>$blingcircle
                    );
                    array_push($lightboard,$temp);
                }
                $ret=array(
                    'lightboard'=>$lightboard
                );
                $sta='true';
                $retval=array(
                    'ret'=>$ret,
                    'status'=>$sta,
                    'auth'=>'true',
                    'msg'=>'12345'
                );

                $jsonencode = _encode($retval);
                echo $jsonencode; break;
    case "XH_Balance_save_new_conf": //Use Wechat to login the Server, response is the userID in system.
        /*
         var map={
            action:"XH_Balance_save_new_conf",
            type:"query",
            body: conf,
            user:"null"
         };
        * */
            $body=$payload["body"];
            $sta='true';
            filenew($body["name"],_encode($body));
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'ret'=>$body,
                'msg'=>'12345'
            );

            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_save_mod_conf": //Use Wechat to login the Server, response is the userID in system.
            /*
             var map={
                action:"XH_Balance_save_mod_conf",
                type:"query",
                body: conf,
                user:"null"
             };
            * */
            $body=$payload["body"];
            $sta='true';
            filemod($body["name"],_encode($body));
                $retval=array(
                    'status'=>$sta,
                    'ret'=>$body,
                    'auth'=>'true',
                    'msg'=>'12345'
                );

                $jsonencode = _encode($retval);
                echo $jsonencode; break;
        case "XH_Balance_sys_config":
            $retarray;
            $retarray = getfiledetail("./sysconf/configure.json");
            //echo "file content".$retarray;
            $obj=json_decode($retarray,true);
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'ret'=>$obj,
                'msg'=>''
            );

            $jsonencode = _encode($retval);

            echo $jsonencode; break;
        case "XH_Balance_sys_debug":
            $retarray;
            $retarray = getfiledetail("./sysconf/debug.json");
            //echo "file content".$retarray;
            $obj=json_decode($retarray,true);
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'ret'=>$obj,
                'msg'=>''
            );

            $jsonencode = _encode($retval);

            echo $jsonencode; break;
        case "XH_Balance_export":
            $retarray;
            $retarray = getfiledetail("./sysconf/export.json");
            //echo "file content".$retarray;
            $obj=json_decode($retarray,true);
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'ret'=>$obj,
                'msg'=>''
            );

            $jsonencode = _encode($retval);

            echo $jsonencode; break;
        case "XH_Balance_sys_config_save":
            $body=$payload["body"];
            $sta='true';
            confmod(_encode($body));
                $retval=array(
                    'status'=>$sta,
                    'auth'=>'true',
                    'msg'=>'12345'
                );

                $jsonencode = _encode($retval);
                echo $jsonencode; break;
        case "XH_Balance_sys_debug_run":
            $body=$payload["body"];
            $sta='true';
            $retlen = rand(20,100);
            $msg="return msg:";
            for($i=0;$i<$retlen;$i++)$msg=$msg."x";
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>$msg
            );

            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_export_run":
            $body=$payload["body"];
            $sta='true';
            $retlen = rand(20,100);
            $msg="return msg:";
            for($i=0;$i<$retlen;$i++)$msg=$msg."x";
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>$msg
            );

            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_cali_run":
            $body=$payload["body"];
            $sta='true';
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>'12345'
            );
            //send mqtt message
            $action = $body["action"];
            $bool = false;
            if($action == "start") $bool=true;
            calidynamic($bool);
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_cali_to_zero":
            $body=$payload["body"];
            $balance = $body["balance"];
            $sta='true';
            $ret=array(
                'balance'=>$balance
            );
            $retval=array(
                'status'=>$sta,
                //'ret'=>$ret,
                'auth'=>'true',
                'msg'=>'12345'
            );
            calizero();
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_cali_to_countweight":
            $body=$payload["body"];
            $balance = $body["balance"];
            $sta='true';
            $returnweight = rand(10,100);

            $ret=array(
                'balance'=>$balance
            );
            $retval=array(
                'status'=>$sta,
               // 'ret'=>$ret,
                'auth'=>'true',
                'msg'=>(string)$returnweight
            );
            caliweight();
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "XH_Balance_get_alarm": //Use Wechat to login the Server, response is the userID in system.
        /*
         var map={
            action:"XH_Balance_get_alarm",
            type:"query",
            user:"null"
         };
        */
            $number = rand(1,5);
            $sta='true';
            if($number == 2) $sta='false';
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>'error msg:1234567890;1234567890;1234567890'
            );

            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_clear_alarm": //Use Wechat to login the Server, response is the userID in system.
            /*
             var map={
                action:"XH_Balance_clear_alarm",
                type:"query",
                user:"null"
             };
            */
                $sta='true';
                $retval=array(
                    'status'=>$sta,
                    'auth'=>'true',
                    'msg'=>'msg0'
                );

                $jsonencode = _encode($retval);
                echo $jsonencode; break;
        case "XH_Balance_sys_language":
            $body=$payload["body"];
            $defaultlanguage = $body["default"];
            languagemod(_encode($body));
            $retarray = getfiledetail("./language/language_".$defaultlanguage.".json");
            //echo "file content".$retarray;
            $obj=json_decode($retarray,true);
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'ret'=>$obj,
                'msg'=>''
            );

            $jsonencode = _encode($retval);

            echo $jsonencode; break;
        case "XH_Balance_sys_language_list":
            $retarray;
            $retarray = getfiledetail("./sysconf/supportlanguage.json");
            //echo "file content".$retarray;
            $obj=json_decode($retarray,true);
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'ret'=>$obj,
                'msg'=>''
            );

            $jsonencode = _encode($retval);

            echo $jsonencode; break;
        case "XH_Balance_sys_version":
            $temp = rand(0,10);
            $ret;
            if($temp>5){
                $ret=array(
                    'HCU'=>"HCU-SW-R3.V243.DB11.PATCH",
                    'IHU'=>"IHU-SW-R3.V243.DB11.PATCH"
                );
            }else{
                $ret=array(
                    'HCU'=>"HCU-SW-R4.V244.DB12.PATCH",
                    'IHU'=>"IHU-SW-R4.V244.DB12.PATCH"
                );
            }

            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'ret'=>$ret,
                'msg'=>''
            );

            $jsonencode = _encode($retval);

            echo $jsonencode; break;
        case "XH_Balance_change_passwd":
            $body=$payload["body"];
            $username = $body["username"];
            $password = $body["password"];
            $newpassword = $body["newpassword"];
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>''
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_get_user_list":
            $userlist=array();
            for($i=0;$i<20;$i++){
                $temp="user".(string)$i;
                array_push($userlist,$temp);
            }
            $retval=array(
                'ret'=>$userlist,
                'status'=>'true',
                'auth'=>'true',
                'msg'=>''
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_del_user":
            $body=$payload["body"];
            $user = $body["username"];
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>''
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_new_user":
            $body=$payload["body"];
            $user = $body["username"];
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>''
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_reset_user":
            $body=$payload["body"];
            $user = $body["username"];
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'msg'=>''
            );
            $jsonencode = _encode($retval);
            echo $jsonencode; break;
        case "XH_Balance_mqtt_conf":
            $retarray = getfiledetail("./sysconf/mqtt.json");
            //echo "file content".$retarray;
            $obj=json_decode($retarray,true);
            $retval=array(
                'status'=>'true',
                'auth'=>'true',
                'ret'=>$obj,
                'msg'=>''
            );

            $jsonencode = _encode($retval);

            echo $jsonencode; break;
	default:

	break;
}
function calizero(){
    $server = "127.0.0.1";     // change if necessary
    $port = 1883;                     // change if necessary
    $username = "";                   // set your username
    $password = "";                   // set your password
    $client_id = "MQTT_XH_High_Speed_Balance_PHP"; // make sure this is unique for connecting to sever - you could use uniqid()
    $mqtt = new phpMQTT($server, $port, $client_id);
    if(!$mqtt->connect(true, NULL, $username, $password)) {
        exit(1);
    }
    $topics['MQTT_XH_High_Speed_Balance_PHP'] = array("qos" => 0, "function" => "procmsg");
    //$mqtt->subscribe($topics, 0);
    $retval=array(
                       'action'=>'XH_High_Speed_Balance_calibration_zero_trigger'
                   );

    $mqtt->publish('MQTT_XH_High_Speed_Balance_HCU', _encode($retval));

    $mqtt->close();
}
function caliweight(){
    $server = "127.0.0.1";     // change if necessary
    $port = 1883;                     // change if necessary
    $username = "";                   // set your username
    $password = "";                   // set your password
    $client_id = "MQTT_XH_High_Speed_Balance_PHP"; // make sure this is unique for connecting to sever - you could use uniqid()
    $mqtt = new phpMQTT($server, $port, $client_id);
    if(!$mqtt->connect(true, NULL, $username, $password)) {
        exit(1);
    }
    $topics['MQTT_XH_High_Speed_Balance_PHP'] = array("qos" => 0, "function" => "procmsg");
    //$mqtt->subscribe($topics, 0);
    $retval=array(
                       'action'=>'XH_High_Speed_Balance_calibration_weight_trigger'
                   );

    $mqtt->publish('MQTT_XH_High_Speed_Balance_HCU', _encode($retval));

    $mqtt->close();
}
function calidynamic($bool){
    $server = "127.0.0.1";     // change if necessary
    $port = 1883;                     // change if necessary
    $username = "";                   // set your username
    $password = "";                   // set your password
    $client_id = "MQTT_XH_High_Speed_Balance_PHP"; // make sure this is unique for connecting to sever - you could use uniqid()
    $mqtt = new phpMQTT($server, $port, $client_id);
    if(!$mqtt->connect(true, NULL, $username, $password)) {
        exit(1);
    }
    $topics['MQTT_XH_High_Speed_Balance_PHP'] = array("qos" => 0, "function" => "procmsg");
    //$mqtt->subscribe($topics, 0);
    $action = 'XH_High_Speed_Balance_calibration_dynamic_stop';
    if($bool) $action = 'XH_High_Speed_Balance_calibration_dynamic_start';
    $retval=array(
                       'action'=>$action
                   );

    $mqtt->publish('MQTT_XH_High_Speed_Balance_HCU', _encode($retval));

    $mqtt->close();
}
function flushUI(){
    $server = "127.0.0.1";     // change if necessary
    $port = 1883;                     // change if necessary
    $username = "";                   // set your username
    $password = "";                   // set your password
    $client_id = "MQTT_XH_High_Speed_Balance_PHP"; // make sure this is unique for connecting to sever - you could use uniqid()
    $mqtt = new phpMQTT($server, $port, $client_id);
    if(!$mqtt->connect(true, NULL, $username, $password)) {
        exit(1);
    }
    $topics['MQTT_XH_High_Speed_Balance_PHP'] = array("qos" => 0, "function" => "procmsg");
    //$mqtt->subscribe($topics, 0);
    $retval=array(
                       'action'=>'XH_High_Speed_Balance_force_flush'
                   );

    $mqtt->publish('MQTT_XH_High_Speed_Balance_HCU', _encode($retval));

    $mqtt->close();
}

function runpause(){
     $server = "127.0.0.1";     // change if necessary
     $port = 1883;                     // change if necessary
     $username = "";                   // set your username
     $password = "";                   // set your password
     $client_id = "MQTT_XH_High_Speed_Balance_PHP"; // make sure this is unique for connecting to sever - you could use uniqid()
     $mqtt = new phpMQTT($server, $port, $client_id);
     if(!$mqtt->connect(true, NULL, $username, $password)) {
         exit(1);
     }
     $topics['MQTT_XH_High_Speed_Balance_PHP'] = array("qos" => 0, "function" => "procmsg");
     //$mqtt->subscribe($topics, 0);
     $retval=array(
                        'action'=>'XH_High_Speed_Balance_pause_trigger'
                    );

     $mqtt->publish('MQTT_XH_High_Speed_Balance_HCU', _encode($retval));

     $mqtt->close();
}
function runresume(){
    $server = "127.0.0.1";     // change if necessary
    $port = 1883;                     // change if necessary
    $username = "";                   // set your username
    $password = "";                   // set your password
    $client_id = "MQTT_XH_High_Speed_Balance_PHP"; // make sure this is unique for connecting to sever - you could use uniqid()
    $mqtt = new phpMQTT($server, $port, $client_id);
    if(!$mqtt->connect(true, NULL, $username, $password)) {
        exit(1);
    }
    $topics['MQTT_XH_High_Speed_Balance_PHP'] = array("qos" => 0, "function" => "procmsg");
    //$mqtt->subscribe($topics, 0);
    $retval=array(
                       'action'=>'XH_High_Speed_Balance_resume_trigger'
                   );

    $mqtt->publish('MQTT_XH_High_Speed_Balance_HCU', _encode($retval));

    $mqtt->close();
}


class phpMQTT {
	private $socket; 			/* holds the socket	*/
	private $msgid = 1;			/* counter for message id */
	public $keepalive = 10;		/* default keepalive timmer */
	public $timesinceping;		/* host unix time, used to detect disconects */
	public $topics = array(); 	/* used to store currently subscribed topics */
	public $debug = false;		/* should output debug messages */
	public $address;			/* broker address */
	public $port;				/* broker port */
	public $clientid;			/* client id sent to brocker */
	public $will;				/* stores the will of the client */
	private $username;			/* stores username */
	private $password;			/* stores password */
	public $cafile;
	function __construct($address, $port, $clientid, $cafile = NULL){
		$this->broker($address, $port, $clientid, $cafile);
	}
	/* sets the broker details */
	function broker($address, $port, $clientid, $cafile = NULL){
		$this->address = $address;
		$this->port = $port;
		$this->clientid = $clientid;
		$this->cafile = $cafile;
	}
	function connect_auto($clean = true, $will = NULL, $username = NULL, $password = NULL){
		while($this->connect($clean, $will, $username, $password)==false){
			sleep(10);
		}
		return true;
	}
	/* connects to the broker
		inputs: $clean: should the client send a clean session flag */
	function connect($clean = true, $will = NULL, $username = NULL, $password = NULL){

		if($will) $this->will = $will;
		if($username) $this->username = $username;
		if($password) $this->password = $password;
		if ($this->cafile) {
			$socketContext = stream_context_create(["ssl" => [
				"verify_peer_name" => true,
				"cafile" => $this->cafile
				]]);
			$this->socket = stream_socket_client("tls://" . $this->address . ":" . $this->port, $errno, $errstr, 60, STREAM_CLIENT_CONNECT, $socketContext);
		} else {
			$this->socket = stream_socket_client("tcp://" . $this->address . ":" . $this->port, $errno, $errstr, 60, STREAM_CLIENT_CONNECT);
		}
		if (!$this->socket ) {
		    if($this->debug) error_log("stream_socket_create() $errno, $errstr \n");
			return false;
		}
		stream_set_timeout($this->socket, 5);
		stream_set_blocking($this->socket, 0);
		$i = 0;
		$buffer = "";
		$buffer .= chr(0x00); $i++;
		$buffer .= chr(0x06); $i++;
		$buffer .= chr(0x4d); $i++;
		$buffer .= chr(0x51); $i++;
		$buffer .= chr(0x49); $i++;
		$buffer .= chr(0x73); $i++;
		$buffer .= chr(0x64); $i++;
		$buffer .= chr(0x70); $i++;
		$buffer .= chr(0x03); $i++;
		//No Will
		$var = 0;
		if($clean) $var+=2;
		//Add will info to header
		if($this->will != NULL){
			$var += 4; // Set will flag
			$var += ($this->will['qos'] << 3); //Set will qos
			if($this->will['retain'])	$var += 32; //Set will retain
		}
		if($this->username != NULL) $var += 128;	//Add username to header
		if($this->password != NULL) $var += 64;	//Add password to header
		$buffer .= chr($var); $i++;
		//Keep alive
		$buffer .= chr($this->keepalive >> 8); $i++;
		$buffer .= chr($this->keepalive & 0xff); $i++;
		$buffer .= $this->strwritestring($this->clientid,$i);
		//Adding will to payload
		if($this->will != NULL){
			$buffer .= $this->strwritestring($this->will['topic'],$i);
			$buffer .= $this->strwritestring($this->will['content'],$i);
		}
		if($this->username) $buffer .= $this->strwritestring($this->username,$i);
		if($this->password) $buffer .= $this->strwritestring($this->password,$i);
		$head = "  ";
		$head{0} = chr(0x10);
		$head{1} = chr($i);
		fwrite($this->socket, $head, 2);
		fwrite($this->socket,  $buffer);
	 	$string = $this->read(4);
		if(ord($string{0})>>4 == 2 && $string{3} == chr(0)){
			if($this->debug) echo "Connected to Broker\n";
		}else{
			error_log(sprintf("Connection failed! (Error: 0x%02x 0x%02x)\n",
			                        ord($string{0}),ord($string{3})));
			return false;
		}
		$this->timesinceping = time();
		return true;
	}
	/* read: reads in so many bytes */
	function read($int = 8192, $nb = false){
		//	print_r(socket_get_status($this->socket));

		$string="";
		$togo = $int;

		if($nb){
			return fread($this->socket, $togo);
		}

		while (!feof($this->socket) && $togo>0) {
			$fread = fread($this->socket, $togo);
			$string .= $fread;
			$togo = $int - strlen($string);
		}




			return $string;
	}
	/* subscribe: subscribes to topics */
	function subscribe($topics, $qos = 0){
		$i = 0;
		$buffer = "";
		$id = $this->msgid;
		$buffer .= chr($id >> 8);  $i++;
		$buffer .= chr($id % 256);  $i++;
		foreach($topics as $key => $topic){
			$buffer .= $this->strwritestring($key,$i);
			$buffer .= chr($topic["qos"]);  $i++;
			$this->topics[$key] = $topic;
		}
		$cmd = 0x80;
		//$qos
		$cmd +=	($qos << 1);
		$head = chr($cmd);
		$head .= chr($i);

		fwrite($this->socket, $head, 2);
		fwrite($this->socket, $buffer, $i);
		$string = $this->read(2);

		$bytes = ord(substr($string,1,1));
		$string = $this->read($bytes);
	}
	/* ping: sends a keep alive ping */
	function ping(){
			$head = " ";
			$head = chr(0xc0);
			$head .= chr(0x00);
			fwrite($this->socket, $head, 2);
			if($this->debug) echo "ping sent\n";
	}
	/* disconnect: sends a proper disconect cmd */
	function disconnect(){
			$head = " ";
			$head{0} = chr(0xe0);
			$head{1} = chr(0x00);
			fwrite($this->socket, $head, 2);
	}
	/* close: sends a proper disconect, then closes the socket */
	function close(){
	 	$this->disconnect();
		stream_socket_shutdown($this->socket, STREAM_SHUT_WR);
	}
	/* publish: publishes $content on a $topic */
	function publish($topic, $content, $qos = 0, $retain = 0){
		$i = 0;
		$buffer = "";
		$buffer .= $this->strwritestring($topic,$i);
		//$buffer .= $this->strwritestring($content,$i);
		if($qos){
			$id = $this->msgid++;
			$buffer .= chr($id >> 8);  $i++;
		 	$buffer .= chr($id % 256);  $i++;
		}
		$buffer .= $content;
		$i+=strlen($content);
		$head = " ";
		$cmd = 0x30;
		if($qos) $cmd += $qos << 1;
		if($retain) $cmd += 1;
		$head{0} = chr($cmd);
		$head .= $this->setmsglength($i);
		fwrite($this->socket, $head, strlen($head));
		fwrite($this->socket, $buffer, $i);
	}
	/* message: processes a recieved topic */
	function message($msg){
		 	$tlen = (ord($msg{0})<<8) + ord($msg{1});
			$topic = substr($msg,2,$tlen);
			$msg = substr($msg,($tlen+2));
			$found = 0;
			foreach($this->topics as $key=>$top){
				if( preg_match("/^".str_replace("#",".*",
						str_replace("+","[^\/]*",
							str_replace("/","\/",
								str_replace("$",'\$',
									$key))))."$/",$topic) ){
					if(is_callable($top['function'])){
						call_user_func($top['function'],$topic,$msg);
						$found = 1;
					}
				}
			}
			if($this->debug && !$found) echo "msg recieved but no match in subscriptions\n";
	}
	/* proc: the processing loop for an "allways on" client
		set true when you are doing other stuff in the loop good for watching something else at the same time */
	function proc( $loop = true){
		if(1){
			$sockets = array($this->socket);
			$w = $e = NULL;
			$cmd = 0;

				//$byte = fgetc($this->socket);
			if(feof($this->socket)){
				if($this->debug) echo "eof receive going to reconnect for good measure\n";
				fclose($this->socket);
				$this->connect_auto(false);
				if(count($this->topics))
					$this->subscribe($this->topics);
			}

			$byte = $this->read(1, true);

			if(!strlen($byte)){
				if($loop){
					usleep(100000);
				}

			}else{

				$cmd = (int)(ord($byte)/16);
				if($this->debug) echo "Recevid: $cmd\n";
				$multiplier = 1;
				$value = 0;
				do{
					$digit = ord($this->read(1));
					$value += ($digit & 127) * $multiplier;
					$multiplier *= 128;
					}while (($digit & 128) != 0);
				if($this->debug) echo "Fetching: $value\n";

				if($value)
					$string = $this->read($value);

				if($cmd){
					switch($cmd){
						case 3:
							$this->message($string);
						break;
					}
					$this->timesinceping = time();
				}
			}
			if($this->timesinceping < (time() - $this->keepalive )){
				if($this->debug) echo "not found something so ping\n";
				$this->ping();
			}

			if($this->timesinceping<(time()-($this->keepalive*2))){
				if($this->debug) echo "not seen a package in a while, disconnecting\n";
				fclose($this->socket);
				$this->connect_auto(false);
				if(count($this->topics))
					$this->subscribe($this->topics);
			}
		}
		return 1;
	}
	/* getmsglength: */
	function getmsglength(&$msg, &$i){
		$multiplier = 1;
		$value = 0 ;
		do{
		  $digit = ord($msg{$i});
		  $value += ($digit & 127) * $multiplier;
		  $multiplier *= 128;
		  $i++;
		}while (($digit & 128) != 0);
		return $value;
	}
	/* setmsglength: */
	function setmsglength($len){
		$string = "";
		do{
		  $digit = $len % 128;
		  $len = $len >> 7;
		  // if there are more digits to encode, set the top bit of this digit
		  if ( $len > 0 )
		    $digit = ($digit | 0x80);
		  $string .= chr($digit);
		}while ( $len > 0 );
		return $string;
	}
	/* strwritestring: writes a string to a buffer */
	function strwritestring($str, &$i){
		$ret = " ";
		$len = strlen($str);
		$msb = $len >> 8;
		$lsb = $len % 256;
		$ret = chr($msb);
		$ret .= chr($lsb);
		$ret .= $str;
		$i += ($len+2);
		return $ret;
	}
	function printstr($string){
		$strlen = strlen($string);
			for($j=0;$j<$strlen;$j++){
				$num = ord($string{$j});
				if($num > 31)
					$chr = $string{$j}; else $chr = " ";
				printf("%4d: %08b : 0x%02x : %s \n",$j,$num,$num,$chr);
			}
	}
}
?>