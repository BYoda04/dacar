<?php

include_once '../db.php';

class User extends DB{

    private $cod;
    private $sup;
    private $camp;
    private $turn;

    public function asesorExists($asesor){

        $query = $this->connect()->prepare('SELECT * FROM asesores WHERE asesor = :asesor');
        $query->execute(['asesor' => $asesor]);

        if($query->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function asesorRepit($cod,$date){

        $query = $this->connect()->prepare('SELECT * FROM ventas_camp WHERE cod_asesor= :cod AND fecha= :fecha');
        $query->execute(['cod' => $cod, 'fecha' => $date]);

        if($query->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function setAsesor($asesor){
        $query = $this->connect()->prepare('SELECT * FROM asesores WHERE asesor = :asesor');
        $query->execute(['asesor' => $asesor]);

        foreach ($query as $currentUser) {
            $this->cod = $currentUser['id_asesor'];
            $this->sup = $currentUser['cod_sup'];
            $this->camp = $currentUser['cod_camp'];
            $this->turn = $currentUser['cod_turn'];
        }
    }

    public function getCod(){
        return $this->cod;
    }

    public function getSup(){
        return $this->sup;
    }

    public function getCamp(){
        return $this->camp;
    }

    public function getTurn(){
        return $this->turn;
    }
}

?>