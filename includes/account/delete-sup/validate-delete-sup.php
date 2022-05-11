<?php

include_once '../../db.php';

class Account extends DB{

    private $idusuario;

    private $username;
    private $num;
    private $codcamp;
    private $codturn;

    public function supExists($sup){

        $query = $this->connect()->prepare('SELECT * FROM supervisores WHERE id_sup = :sup');
        $query->execute(['sup' => $sup]);

        if($query->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function newSupExists($sup){
        $query = $this->connect()->prepare('SELECT * FROM supervisores WHERE id_sup = :sup');
        $query->execute(['sup' => $sup]);

        if($query->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function setSup($sup){
        $query = $this->connect()->prepare('SELECT * FROM supervisores WHERE id_sup = :sup');
        $query->execute(['sup' => $sup]);

        foreach ($query as $currentSup) {
            $this->username = $currentSup['nom_sup'];
            $this->num = $currentSup['asesores'];
        }
    }

    public function setCampTurn($newsup){
        $query = $this->connect()->prepare('SELECT * FROM supervisores WHERE id_sup = :sup');
        $query->execute(['sup' => $newsup]);

        foreach ($query as $currentSup) {           
            $this->codcamp = $currentSup['cod_camp'];
            $this->codturn = $currentSup['cod_turn'];
        }
    }

    public function getUser(){
        return $this->username;
    }

    public function getNum(){
        return $this->num;
    }

    public function getCamp(){
        return $this->codcamp;
    }

    public function getTurn(){
        return $this->codturn;
    }

    public function setId($sup){
        $query = $this->connect()->prepare('SELECT * FROM usuarios WHERE nom_user = :sup');
        $query->execute(['sup' => $sup]);

        foreach ($query as $currentUser){
            $this->idusuario = $currentUser['cod_user'];
        }
        
    }

    public function getId(){
        return $this->idusuario;
    }

}

?>