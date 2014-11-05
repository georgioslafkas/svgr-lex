<?php
    $json = file_get_contents("php://input");
    $file = fopen('lexikon.json', 'w+');
    fwrite($file, $json);
    fclose($file);
?>
