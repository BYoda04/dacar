<?php

    $servidor = "localhost";
    $nombreusuario = "root";
    $password = "";
    $db = "dbprueba";

    $name = $_POST['id-asesor'];
    $plan1 = $_POST['plan1'];
    $plan2 = $_POST['plan2'];
    $plan3 = $_POST['plan3'];
    $meta = $_POST['meta'];
    $date = $_POST['date-send'];


    $conexion = new mysqli($servidor, $nombreusuario, $password,$db);

    if($conexion-> connect_error){
        die("Conexión fallida: " . $conexion-> connect_error);
    } 

    include_once './validate-update-data.php';

    $account = new User();

    if ($account->searchAsesor($name,$date)) {
        
        $account->setCamp($name);
        $camp = $account->getCamp();

        if ($camp == 1) {
            $val1 = $plan1*1;
            $val2 = $plan2*2;
            $val3 = $plan3*3;

            $product1 = 1;
            $product2 = 2;
            $product3 = 3;

            $ugi = $val1 + $val2 + $val3;
        } else if ($camp == 2) {
            $ugi = 0; 
            $product1 = 4;
            $product2 = 5;
            $product3 = 6;
        } 

        $sqlUno = "UPDATE ventas_camp SET ventas = $plan1, meta = $meta, UGI = $ugi WHERE cod_asesor = $name AND product = $product1 AND fecha = '$date'";
        $sqlDos = "UPDATE ventas_camp SET ventas = $plan2, meta = $meta, UGI = $ugi WHERE cod_asesor = $name AND product = $product2 AND fecha = '$date'";
        $sqlTres = "UPDATE ventas_camp SET ventas = $plan3, meta = $meta, UGI = $ugi WHERE cod_asesor = $name AND product = $product3 AND fecha = '$date'";

        $queryUno = mysqli_query($conexion,$sqlUno);
        $queryDos = mysqli_query($conexion,$sqlDos);
        $queryTres = mysqli_query($conexion,$sqlTres);

        if (($queryUno && $queryDos) && $queryTres) {
            echo "enviado";
        } else {
            echo "error";
        }

    }
?>