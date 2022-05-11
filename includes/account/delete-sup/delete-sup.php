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
    $newsup = $_POST['new-sup']; 


    include_once './validate-delete-sup.php';

    $account = new Account();

    if ($account->supExists($sup) && $account->newSupExists($newsup)) {
        $account->setSup($sup);
        $account->setCampTurn($newsup);
    }

    $nomuser = $account->getUser();
    $num = $account->getNum();
    $camp = $account->getCamp();
    $turn = $account->getTurn();

    $account->setId($nomuser);
    $iduser = $account->getId();

    $changeSup = "UPDATE asesores SET cod_sup = $newsup WHERE cod_sup = $sup";
    $queryUno = mysqli_query($conexion,$changeSup);

    if ($queryUno) {
        $updateCamp = "UPDATE asesores SET cod_camp = $camp WHERE cod_sup = $newsup";
        $queryDos = mysqli_query($conexion,$updateCamp);

        if ($queryDos) {
            $updateTurn = "UPDATE asesores SET cod_turn = $turn WHERE cod_sup = $newsup";
            $queryTres = mysqli_query($conexion,$updateTurn);

            if ($queryTres) {
                $updateNum = "UPDATE supervisores SET asesores = $num WHERE id_sup = $newsup";
                $queryCuatro = mysqli_query($conexion,$updateNum);

                if ($queryCuatro) {
                    $deleteUser = "DELETE FROM usuarios WHERE cod_user = $iduser";
                    $queryCinco = mysqli_query($conexion,$deleteUser);

                    if ($queryCinco) {
                        $deleteSup = "DELETE FROM supervisores WHERE id_sup = $sup";
                        $querySeis = mysqli_query($conexion,$deleteSup);

                        if ($querySeis) {
                            header("location:../../../index-account.php");
                        } else {
                            echo "error 6";
                        }
                    } else {
                        echo "error 5";
                    }
                    
                } else {
                    echo "error 4";
                }
                
            } else {
                echo "error 3";
            }
            
        } else {
            echo "error 2";
        }
        
    } else {
        echo "error 1";
    }
    
    

?>