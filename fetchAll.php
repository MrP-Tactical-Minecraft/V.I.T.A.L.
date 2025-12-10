<?php

    require_once('config.php');
    $db_link = mysqli_connect(
        
        MYSQL_HOST, 
        MYSQL_USER, 
        MYSQL_PASSWORD, 
        MYSQL_DATABASE

    );

    $table = $_GET['table'];
    $result = mysqli_query($db_link, "SELECT * FROM $table WHERE 1 ORDER BY time ASC");

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
        $d7[$j] = $row['world'];
    }
    echo json_encode(array($d1,$d2,$d3,$d4,$d5,$d6,$d7));

?>