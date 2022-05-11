<?php

    $servidor = "localhost";
    $nombreusuario = "root";
    $password = "";
    $db = "dbprueba";

    $conexion = new mysqli($servidor, $nombreusuario, $password,$db);

    if($conexion-> connect_error){
        die("Conexión fallida: " . $conexion-> connect_error);
    }

    $date = $_POST['date'];
    $nom = $_POST['name'];
    $rol = $_POST['rol'];

    echo $date;
    echo $nom;
    echo $rol;

    $insertar = "INSERT INTO ventas(fecha_vnt,cant_vnt,met_vnt) VALUES('$date','$sales','$goal')";

    $query = mysqli_query($conexion,$insertar);

    if ($query) {
        header("location:../../index-data.php");
    } else {
        echo "error";
    }

?>