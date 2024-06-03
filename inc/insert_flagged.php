<?php 
require('key2time_travel.php');

$imgSource = $_POST['img_source'];
$imgFlag = $_POST['flag'];

$favImgQuery = "INSERT INTO flagged (img_source, flag) VALUES ('$imgSource', '$imgFlag')";
$favImgInsert = mysqli_query($dbConnector, $favImgQuery);
$lastID = $mysqli->insert_id; 

if ($favImgInsert) {
	echo "done";
}		
else {
	echo "error";
}
?>