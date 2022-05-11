<?php

    $servidor = "localhost";
    $nombreusuario = "root";
    $password = "";
    $db = "dbprueba";

    $conexion = new mysqli($servidor, $nombreusuario, $password,$db);

    if($conexion-> connect_error){
        die("Conexión fallida: " . $conexion-> connect_error);
    } 
    $user = $_POST['username'];
    $sup = $_POST['sup']; 

    include_once './validate-asesor.php';

    $account = new Account();

    if ($account->supExists($sup)) {
        $account->setAsesor($sup);
    }

    $camp = $account->getCamp();
    $turn = $account->getTurn();
    $num = $account->getNum();

    $insertarAsesor = "INSERT INTO asesores(asesor,cod_sup,cod_camp,cod_turn,state) VALUES('$user','$sup','$camp','$turn','1')";
    $updateNumAsesor = "UPDATE supervisores SET asesores = $num + 1 WHERE id_sup = $sup";

    $queryUno = mysqli_query($conexion,$insertarAsesor);
    $queryDos = mysqli_query($conexion,$updateNumAsesor);

    if ($queryUno && $queryDos) {
        header("location:../../../index-account.php");
    } else {
        echo "error";
    }


    

?>