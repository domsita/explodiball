<?php
    $db_host = "localhost";
    $db_username = "dom";
    $db_pass = "pass";
    $db_name = "test_database";

    $db = new mysqli($db_host, $db_username, $db_pass, $db_name);
    if ($db->connect_error) {
        die('Error: ' . $db->connect_errno);
    }
    

?>
