<?php

include_once '../db.php';

class Datos extends DB{

    function obtenerData(){
        $query = $this->connect()->query('SELECT * FROM ventas_camp');

        return $query;
    }

}

?>