<?php

    include_once 'get-sup.php';

    class apiData{


        function getAll(){
            $data = new Datos();
            $datos = array();
            $datos["items"] = array();

            $res = $data->obtenerData();

            if ($res->rowCount()) {
                
                while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
                    $item = array(
                        'id_sup' => $row['id_sup'],
                        'nom_sup' => $row['nom_sup'],
                        'asesores' => $row['asesores'],
                        'cod_camp' => $row['cod_camp'],
                        'cod_turn' => $row['cod_turn']
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