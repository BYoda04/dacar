<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--NORMALIZE CSS-->
    <link rel="stylesheet" href="./assets/styles/normalize.css">
    <!--STYLES PAGES-->
    <link rel="stylesheet" href="./assets/styles/styles-plataform.css">
    <!--STYLES HOGAR && MOVIL-->
    <link rel="stylesheet" href="./assets/styles/styles-hogar.css">
    <link rel="stylesheet" href="./assets/styles/styles-movil.css">
    <!--ROl-->
    <?php include_once 'includes/user.php'; ?>
    <title>DACARTELECOM</title>
</head>
<body>

    <nav>

        <div class="nav-top">

            <div class="logo">

                <img src="./assets/img/dacartelecom-logo.webp">
    
            </div>
    
            <div class="user">
    
                <div class="user-settings">
                        <div class="toggle" id="toggle"><ion-icon name="person-circle-outline"></ion-icon></div>
                        <ul class="settings-description" id="settings-description">
                        <li><p id="name"><?php echo $user->getUserName();  ?></p><ion-icon name="person-outline"></ion-icon></li>
                        <li><p id="rol"><?php echo $user->getRol();  ?></p><ion-icon name="checkmark-outline"></ion-icon></li>
                        <li><a href="">Ajustes</a><ion-icon name="settings-outline"></ion-icon></li>
                        </ul>
                </div>
    
                <div class="log-out">
                    <a href="./includes/logout.php"><ion-icon name="log-out-outline"></ion-icon></a>
                </div>
    
            </div>
            
        </div>
        
    