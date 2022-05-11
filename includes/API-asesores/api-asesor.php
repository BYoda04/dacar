<?php

    include_once 'get-asesores.php';

    class apiData{


        function getAll(){
            $data = new Datos();
            $datos = array();
            $datos["items"] = array();

            $res = $data->obtenerData();

            if ($res->rowCount()) {
                
                while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
                    $item = array(
                        'id_asesor' => $row['id_asesor'],
                        'asesor' => $row['asesor'],
                        'ventas' => $row['ventas'],
                        'cod_sup' => $row['cod_sup'],
                        'cod_camp' => $row['cod_camp'],
                        'cod_turn' => $row['cod_turn'],
                        'sate' => $row['state']
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