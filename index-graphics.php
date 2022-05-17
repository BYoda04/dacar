
<?php

include_once 'includes/user.php';
include_once 'includes/user_session.php';

$userSession = new UserSession();
$user = new User();

if(isset($_SESSION['user'])){
    //echo "Hay sesión";
    $user->setUser($userSession->getCurrentUser());
    /* header("location:pages/graphics.php"); */
    if ($user->getRol() === 1) {

        include_once 'pages/graphics.php';
        
    } else if ($user->getRol() === 2){
        
        include_once 'pages/graphics-sup.php';

    }
} else{
    //echo "Login";
    include_once 'pages/login.php';
}


?>