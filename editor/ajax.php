<?php
    $arrayAsString = $_GET["arrayAsString"];
    file_put_contents("levels/level.json", $arrayAsString, JSON_PRETTY_PRINT);
    echo '{"response":"level exported"}';
?>