<?php

    $servidor = "localhost";
    $nombreusuario = "root";
    $password = "";
    $db = "dbprueba";

    $conexion = new mysqli($servidor, $nombreusuario, $password,$db);

    if($conexion-> connect_error){
        die("Conexión fallida: " . $conexion-> connect_error);
    } 
    $sup = $_POST['sup'];
    $asesor = $_POST['asesor']; 

    include_once './validate-delete-asesor.php';

    $account = new Account();

    if ($account->asesorExists($asesor)) {
        $account->setNum($sup);
    }

    $num = $account->getNum()-1;

    $updateNumAsesor = "UPDATE supervisores SET asesores = $num WHERE id_sup = $sup";
    
    $updateStateAsesor = "UPDATE asesores SET state = 2 WHERE id_asesor = $asesor";
    
    $queryUno = mysqli_query($conexion,$updateNumAsesor);
    $queryDos = mysqli_query($conexion,$updateStateAsesor);

    if ($queryUno && $queryDos) {
        header("location:../../../index-account.php");
    } else {
        echo "error";
    }

?>