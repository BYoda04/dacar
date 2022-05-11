<?php

include_once '../../db.php';

class Account extends DB{

    private $idcamp;
    private $idturn;
    private $coduser;

    public function campExists($camp){

        $query = $this->connect()->prepare('SELECT * FROM campañas WHERE campaña = :camp');
        $query->execute(['camp' => $camp]);

        if($query->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function setCamp($camp){
        $query = $this->connect()->prepare('SELECT * FROM campañas WHERE campaña = :camp');
        $query->execute(['camp' => $camp]);

        foreach ($query as $currentCamp) {
            $this->idcamp = $currentCamp['id_camp'];
        }
    }

    public function getCamp(){
        return $this->idcamp;
    }

    public function turnExists($turn){

        $query = $this->connect()->prepare('SELECT * FROM turno WHERE turno = :turn');
        $query->execute(['turn' => $turn]);

        if($query->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function setTurn($turn){
        $query = $this->connect()->prepare('SELECT * FROM turno WHERE turno = :turn');
        $query->execute(['turn' => $turn]);

        foreach ($query as $currentTurn) {
            $this->idturn = $currentTurn['id_turn'];
        }
    }

    public function getTurn(){
        return $this->idturn;
    }

    public function setUserid($user){
        $query = $this->connect()->prepare('SELECT * FROM usuarios WHERE nom_user = :nom');
        $query->execute(['nom' => $user]);

        foreach ($query as $currentTurn) {
            $this->coduser = $currentTurn['cod_user'];
        }
    }

    public function getCodUser(){
        return $this->coduser;
    }

}

?>