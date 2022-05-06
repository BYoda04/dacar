<?php

    include_once 'obtener-graphycs.php';

    class apiData{


        function getAll(){
            $data = new Datos();
            $datos = array();
            $datos["items"] = array();

            $res = $data->obtenerData();

            if ($res->rowCount()) {
                
                while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
                    $item = array(
                        'date' => $row['fecha_vnt'],
                        'sales' => $row['cant_vnt'],
                        'goal' => $row['met_vnt']
                    );
                    array_push($datos['items'],$item);
                }

                return json_encode($datos);


            }   else {
                echo json_encode(array('mensaje' => 'No hay datos'));
            }
        }
    }

?>