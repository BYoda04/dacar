<?php

include_once 'db.php';

class User extends DB{

    private $rol;
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
            $this->rol = $currentUser['rol_user'];
            $this->username = $currentUser['nom_user'];
        }
    }

    public function getRol(){
        return $this->rol;
    }

    public function getUserName(){
        return $this->username;
    }
}

?>