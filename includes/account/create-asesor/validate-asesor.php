<?php

include_once '../../db.php';

class Account extends DB{

    private $idcamp;
    private $idturn;
    private $numasesor;

    public function supExists($sup){

        $query = $this->connect()->prepare('SELECT * FROM supervisores WHERE id_sup = :sup');
        $query->execute(['sup' => $sup]);

        if($query->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function setAsesor($sup){
        $query = $this->connect()->prepare('SELECT * FROM supervisores WHERE id_sup = :sup');
        $query->execute(['sup' => $sup]);

        foreach ($query as $currentSup) {
            $this->idcamp = $currentSup['cod_camp'];
            $this->idturn = $currentSup['cod_turn'];
            $this->numasesor = $currentSup['asesores'];
        }
    }

    public function getCamp(){
        return $this->idcamp;
    }

    public function getTurn(){
        return $this->idturn;
    }

    public function getNum(){
        return $this->numasesor;
    }

}

?>