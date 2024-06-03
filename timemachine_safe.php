<?php
require('./inc/key2time_travel.php');
$sql = "SELECT * FROM favorites ORDER BY RAND()LIMIT 1";
$result = $dbConnector->query($sql);
if ($result->num_rows > 0) {
   // output data of each row
   while($row = $result->fetch_assoc()) {

      $src = $row->img_source;
      echo json_encode($row);
      // echo "test";
   }
 } else {
   echo "0 results";
 }
 $dbConnector->close();

?>

