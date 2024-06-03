<?php
require('./inc/key2time_travel.php');

$imageArray = [];

function getDirContents($dir, &$results = array()) {
   $files = scandir($dir);

   foreach ($files as $key => $value) {
       $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
       if (!is_dir($path)) {
           $results[] = $path;
       } else if ($value != "." && $value != "..") {
           getDirContents($path, $results);
           $results[] = $path;
       }
   }

   return $results;
}

function getRandomImage($imageArray) {
    $arraySize = rand(0, count($imageArray) - 1);
    $chosenImage = str_replace('/home/dns/hddrives/wd320/dev/timetravel/', 'img/', $imageArray[$arraySize]);
    $extension = pathinfo($chosenImage, PATHINFO_EXTENSION);

    if ($extension == 'mp4' || $extension == 'avi' || $extension == '3gp') {
        return getRandomImage($imageArray); 
    }

    return $chosenImage;
}

$imageArray = getDirContents('img/Pictures');
$chosenImage = getRandomImage($imageArray);

$query = "SELECT * FROM flagged WHERE img_source = '$chosenImage'";
$result = mysqli_query($dbConnector, $query); 

if (mysqli_num_rows($result) > 0) {
    $chosenImage = getRandomImage($imageArray);
}

echo $chosenImage;

?>