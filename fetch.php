<?php

    require_once('config.php');
    $db_link = mysqli_connect(
        
        MYSQL_HOST, 
        MYSQL_USER, 
        MYSQL_PASSWORD, 
        MYSQL_DATABASE

    );

    $table = $_GET['table'];

    // $result = mysqli_query($db_link, "SELECT * FROM $table WHERE world='world' ORDER BY time DESC LIMIT $limit");
    $result = mysqli_query($db_link, "WITH RankedData AS (SELECT *, RANK() OVER (ORDER BY time DESC) AS time_rank FROM $table) SELECT * FROM RankedData WHERE time_rank = 1");
    /* The limit must be adapted to the expected number of players on the map. */

    $j = -1;                  
    while($row = mysqli_fetch_array($result))
    {
        $j = $j + 1;
        $d1[$j] = $row['time'];
        $d2[$j] = $row['username'];
        $d3[$j] = $row['x'];
        $d4[$j] = $row['y'];
        $d5[$j] = $row['z'];
        $d6[$j] = $row['gamemode'];
    }
    echo json_encode(array($d1,$d2,$d3,$d4,$d5,$d6));

?>