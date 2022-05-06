<?php

include_once 'db.php';

class User extends DB{

    private $nombre;
    private $username;

    public function userExists($user, $pass){

        $query = $this->connect()->prepare('SELECT * FROM usuarios WHERE nom_user = :user AND password = :pass');
        $query->execute(['user' => $user, 'pass' => $pass]);

        if($query->rowCount()){
            return true;
        }else{
            return false;
        }
    }

    public function setUser($user){
        $query = $this->connect()->prepare('SELECT * FROM usuarios WHERE nom_user = :user');
        $query->execute(['user' => $user]);

        foreach ($query as $currentUser) {
            $this->cod_user = $currentUser['cod_user'];
            $this->nom_user = $currentUser['nom_user'];
        }
    }

    public function getNombre(){
        return $this->nombre;
    }
}

?>