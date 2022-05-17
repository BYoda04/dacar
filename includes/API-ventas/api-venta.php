<?php

    include_once 'get-ventas.php';

    class apiData{


        function getAll(){
            $data = new Datos();
            $datos = array();
            $datos["items"] = array();

            $res = $data->obtenerData();

            if ($res->rowCount()) {
                
                while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
                    $item = array(
                        'id_vent' => $row['id_vent'],
                        'cod_camp' => $row['cod_camp'],
                        'cod_turno' => $row['cod_turno'],
                        'cod_sup' => $row['cod_sup'],
                        'cod_asesor' => $row['cod_asesor'],
                        'ventas' => $row['ventas'],
                        'meta' => $row['meta'],
                        'product' => $row['product'],
                        'UGI' => $row['UGI'],
                        'fecha' => $row['fecha']
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