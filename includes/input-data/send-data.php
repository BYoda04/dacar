<?php

    $servidor = "localhost";
    $nombreusuario = "root";
    $password = "";
    $db = "dbprueba";

    $name = $_POST['name-asesor'];
    $plan1 = $_POST['plan1'];
    $plan2 = $_POST['plan2'];
    $plan3 = $_POST['plan3'];
    $meta = $_POST['meta'];
    $date = $_POST['date-send'];


    $conexion = new mysqli($servidor, $nombreusuario, $password,$db);

    if($conexion-> connect_error){
        die("Conexión fallida: " . $conexion-> connect_error);
    } 

    if(($_POST['date-send'] !== "") && ($_POST['meta'] !== "")){

        include_once './validate-input-sup.php';

        $account = new User();

        if ($account->asesorExists($name)) {

            $account->setAsesor($name);
            $cod = $account->getCod();
            $sup = $account->getSup();
            $camp = $account->getCamp();
            $turn = $account->getTurn();

        }

        $total = $plan1 + $plan2 + $plan3;

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

        if ($account->asesorRepit($cod,$date)) {
            echo "ya enviaste datos de este asesor";
        } else {
            $venta1 = "INSERT INTO ventas_camp(cod_camp,cod_turno,cod_sup,cod_asesor,ventas,meta,product,UGI,fecha) VALUES('$camp','$turn','$sup','$cod','$plan1','$meta','$product1','$ugi','$date')";
            $venta2 = "INSERT INTO ventas_camp(cod_camp,cod_turno,cod_sup,cod_asesor,ventas,meta,product,UGI,fecha) VALUES('$camp','$turn','$sup','$cod','$plan2','$meta','$product2','$ugi','$date')";
            $venta3 = "INSERT INTO ventas_camp(cod_camp,cod_turno,cod_sup,cod_asesor,ventas,meta,product,UGI,fecha) VALUES('$camp','$turn','$sup','$cod','$plan3','$meta','$product3','$ugi','$date')";

            $queryUno = mysqli_query($conexion,$venta1);
            $queryDos = mysqli_query($conexion,$venta2);
            $queryTres = mysqli_query($conexion,$venta3);

            if (($queryUno && $queryDos) && $queryTres) {
                echo "enviado";
            } else {
                echo "error";
            }
        }

    } else {
        echo "falta fecha";
    }
  

?>