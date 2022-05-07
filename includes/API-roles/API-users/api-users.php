<?php

    include_once 'obtener-users.php';

    class apiData{


        function getAll(){
            $data = new Datos();
            $datos = array();
            $datos["items"] = array();

            $res = $data->obtenerData();

            if ($res->rowCount()) {
                
                while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
                    $item = array(
                        'user' => $row['nom_user'],
                        'cargo' => $row['tip_user'],
                        'rol' => $row['rol_user']
                    );
                    array_push($datos['items'],$item);
                }

                echo json_encode($datos);


            }   else {
                echo json_encode(array('mensaje' => 'No hay datos'));
            }
        }
    }

?>