<?php
    include 'connect.php';
    $gameMode = $_POST['mode'];


    $results = $db->query("SELECT * FROM scores WHERE mode='$gameMode' ORDER BY `score` DESC, 'ts' ASC LIMIT 10");

    $rank = 1;

    if ($gameMode == '3') {
        $tableHead = $gameMode . " Bombs Rankings";
    } elseif ($gameMode == '1') {
        $tableHead = $gameMode . " Bomb Rankings";
    } else {
        $tableHead = "Timed Rankings";
    }

    echo "<tr><th colspan='3'>" . $tableHead . "</th></tr>";

    while ($row = $results->fetch_array()) {
        echo "<tr><td>" . $rank . "</td><td>" . $row[1] . "</td><td>" . $row[2] . "</td></tr>";
        $rank++;
    }

    $results->free();


?>
