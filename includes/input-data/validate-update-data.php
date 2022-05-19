<?php

include_once '../db.php';

class User extends DB{

    private $camp;
    private $fecha; 

    public function searchAsesor($cod,$date){

        $query = $this->connect()->prepare('SELECT * FROM ventas_camp WHERE cod_asesor= :cod AND fecha= :fecha');
        $query->execute(['cod' => $cod, 'fecha' => $date]);

        if($query->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function setCamp($id){
        $query = $this->connect()->prepare('SELECT * FROM asesores WHERE id_asesor = :asesor');
        $query->execute(['asesor' => $id]);

        foreach ($query as $currentUser) {
            $this->camp = $currentUser['cod_camp'];
        }
    }

    public function getCamp(){
        return $this->camp;
    }
}

?>