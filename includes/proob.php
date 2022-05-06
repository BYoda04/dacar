<?php

    include_once 'api-data.php';

    $api = new apiData();

    $api->getAll(); 

    <script> 
    let datos = [0,1,2]
    localStorage.setItem('datos', JSON.stringify(datos))
    </script>

?>