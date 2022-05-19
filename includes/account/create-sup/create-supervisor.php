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
    $pass = $_POST['password'];
    $camp = $_POST['camp'];
    $turn = $_POST['turn'];  
    $md5pass = md5($pass);

    include_once './validate-sup.php';

    $account = new Account();

    if ($account->campExists($camp) && $account->turnExists($turn)) {
        $account->setCamp($camp);
        $account->setTurn($turn);
    }

    $camp = $account->getCamp();
    $turn = $account->getTurn();

    $insertarUsuario = "INSERT INTO usuarios(nom_user,password,rol_user) VALUES('$user','$md5pass', '2')";

    $insertarSupervisor = "INSERT INTO supervisores(nom_sup,cod_camp,cod_turn) VALUES('$user','$camp','$turn')";

    $queryUno = mysqli_query($conexion,$insertarUsuario);
    $queryDos = mysqli_query($conexion,$insertarSupervisor);

    if ($queryUno && $queryDos) {
        header("location:../../../index-account.php");
    } else {
        echo "error";
    }

    

?>