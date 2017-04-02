<?php
include '../admin/config/db.php';
header("Content-Type: text/html;charset=UTF-8");
$db = new DB();
$visitors = $db->visitors();
echo json_encode(intval($visitors[0]['s_value']));
