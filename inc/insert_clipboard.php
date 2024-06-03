<?php 
require('key2clipboard.php');

$device = $_POST['device'];
$link = $_POST['link'];
$snaptime = (int)$_POST['date'];

var_dump($device);
var_dump($link);
var_dump($snaptime);

$clip_query = "SELECT * from links";
if ($clip_result = mysqli_query($clip_connector, $clip_query)) {
	$rowcount = mysqli_num_rows( $clip_result );
	$rowcount_ori = $rowcount;
	$rowcount_inc = $rowcount+1;	
}

$clip_query = "INSERT INTO links (device, link, snaptime) VALUES ('$device', '$link', '$snaptime')";
$clip_response = "";

if (mysqli_query($clip_connector, $clip_query)) {
	echo "New record created successfully";
	$clip_response = "ok";
} else {
  echo "Error: " . $clip_query . "<br>" . mysqli_error($clip_connector);
}

if ($clip_response == "ok") {
	if ($rowcount_ori >= 10) {
		$clip_del_query = "DELETE FROM links ORDER BY id ASC LIMIT 1";
		if (mysqli_query($clip_connector, $clip_del_query )) {
			echo "Deletion completed";
		}
		else {
			echo "Deleteion error";
		}			
	}
}

$clip_connector->close();

?>