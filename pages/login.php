<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--STYLES LOGIN DACARTELECOM-->
    <link rel="stylesheet" href="./assets/styles/styles-login.css">
    <title>Sesiones</title>
</head>
<body>
    <div class="father">
        <form action="" method="POST">
        <?php

                if(isset($errorLogin)){
                    echo $errorLogin;
                }

        ?>
            <div>
                <img src="./assets/img/dacartelecom-logo.webp" alt="dacartelecom">
                <div>
                    <h2>Iniciar sesión</h2>
                    <p>Nombre de usuario: <br>
                    <input type="text" name="username"></p>
                    <p>Password: <br>
                    <input type="password" name="password"></p>
                    <p class="center"><input type="submit" value="Iniciar Sesión"></p>
                </div>
            </div>
        </form>
    </div>
</body>
</html>