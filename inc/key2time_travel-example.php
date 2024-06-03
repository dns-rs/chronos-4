<?php
$servername = "server";
$username = "user";
$password = "password";
$dbname = "schema";

$dbConnector = new mysqli($servername, $username, $password, $dbname) or die($mysqli->error);

?>