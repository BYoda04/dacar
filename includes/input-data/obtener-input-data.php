<?php

$servidor = "localhost";
$nombreusuario = "root";
$password = "";
$db = "dbprueba";

$conexion = new mysqli($servidor, $nombreusuario, $password,$db);

if($conexion-> connect_error){
    die("Conexión fallida: " . $conexion-> connect_error);
}

$sql = "SELECT * FROM ventas";
$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {
    
    while ($row = $resultado->fetch_assoc()) {
        echo   '<div class="formularios">
                    <p>' . $row['fecha_vnt'] . '</p>
                </div>
                <div class="formularios">
                    <p>' . $row['cant_vnt'] . '</p>
                </div>
                <div class="formularios">
                    <p>' . $row['met_vnt'] . '</p>
                </div>
                <div class="formularios edit">
                    <ion-icon name="pencil-outline"></ion-icon>
                </div>';
    }
}

$conexion->close();

?>