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
    $sales = $_POST['sales'];
    $goal = $_POST['goal'];

    $insertar = "INSERT INTO ventas(fecha_vnt,cant_vnt,met_vnt) VALUES('$date','$sales','$goal')";

    $query = mysqli_query($conexion,$insertar);

    if ($query) {
        header("location:../../index-data.php");
    } else {
        echo "error";
    }

?>