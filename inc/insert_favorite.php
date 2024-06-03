<?php 
require('key2time_travel.php');

$imgSource = $_POST['source'];
$imgOritentation = $_POST['orientation'];

$favImgQuery = "INSERT INTO favorites (img_source, img_orientation) VALUES ('$imgSource', '$imgOritentation')";
$favImgInsert = mysqli_query($dbConnector, $favImgQuery);
$lastID = $mysqli->insert_id; 

if ($favImgInsert) {
	echo "done";
}		
else {
	echo "error";
}
?>