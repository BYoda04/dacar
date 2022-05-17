<?php

include_once 'includes/user.php';
include_once 'includes/user_session.php';

$userSession = new UserSession();
$user = new User();


if(isset($_SESSION['user'])){
    //echo "Hay sesión";
    $user->setUser($userSession->getCurrentUser());

    if ($user->getRol() === 1) {

        include_once 'pages/create-account.php';
        
    } else if ($user->getRol() === 2){
        
        include_once 'index.php';

    }
    
    
    /* header("location:pages/graphics.php"); */
} else{
    //echo "Login";
    include_once 'pages/login.php';
}


?>