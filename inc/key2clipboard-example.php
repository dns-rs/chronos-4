<?php
$clip_servername = "server";
$clip_username = "user";
$clip_password = "password";
$clip_dbname = "schema";

$clip_connector = new mysqli($clip_servername, $clip_username, $clip_password, $clip_dbname);

if ($clip_connector->connect_error) {
   die("Connection failed: " . $clip_connector->connect_error);
 } 

?>