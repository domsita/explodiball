<?php
    $initials = $_POST['initials'];
    $score = $_POST['score'];
    $gameMode = $_POST['mode'];


    include 'connect.php';

    $query = "INSERT INTO `scores` SET initials = '$initials', score = '$score', ts = CURRENT_TIMESTAMP, mode='$gameMode'";
    $result = $db->query($query);

    if ($result) {
        echo ("Success: Inserted " . $db->insert_id);
    } else {
        die("Error: ". $db->errno . " // " . $db->error);
    }


?>
