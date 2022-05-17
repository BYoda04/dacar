<?php

include_once '../../db.php';

class Account extends DB{

    private $num;
    

    public function asesorExists($asesor){

        $query = $this->connect()->prepare('SELECT * FROM asesores WHERE id_asesor = :id');
        $query->execute(['id' => $asesor]);

        if($query->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function setNum($sup){
        $query = $this->connect()->prepare('SELECT * FROM supervisores WHERE id_sup = :sup');
        $query->execute(['sup' => $sup]);

        foreach ($query as $currentSup) {
            $this->num = $currentSup['asesores'];
        }
    }

    public function getNum(){
        return $this->num;
    }

    

}

?>