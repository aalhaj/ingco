<?php
if(!isset($_REQUEST['email'])) {echo json_encode(array('status' => 'OK', 'message' => 'Message Sent!')); exit; }
require 'class.simple_mail.php';
$fEmil = ""; $fName = ""; $fPhone = "";$sub="";$msg;
if(isset($_REQUEST['data']['email'])) $fEmil = $_REQUEST['data']['email'];
if(isset($_REQUEST['data']['name'])) $fName = $_REQUEST['data']['name'];
if(isset($_REQUEST['data']['subject'])) $sub = $_REQUEST['data']['subject'];
if(isset($_REQUEST['data']['phone'])) $fPhone = "Phone # : ".$_REQUEST['data']['phone'].'<br/>';
if(isset($_REQUEST['data']['body'])) $msg = $_REQUEST['data']['body'];

$send = SimpleMail::make()
        ->setTo($_REQUEST['email'], 'Ingco Tools')
        ->setFrom($fEmil,$fName)
        ->setSubject($sub)
        ->setMessage($fPhone.$msg)
        ->setHtml()
        ->send();

if(!$send) {
    echo json_encode(array('status' => 'NO', 'message' => 'Message Not Sent!'));
} else {
    echo json_encode(array('status' => 'OK', 'message' => 'Message Sent!'));
}
