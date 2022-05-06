
<?php require_once './pages/layout/nav-top.php' ?>

<?php require_once './pages/layout/nav-left.php' ?>

</section>

        <!-- <section class="container">
            
            <div class="search-section">
                <div>
                    <h2>Porcentajes de ventas</h2>
                </div>
                <div>
                    <p>Fecha desde:</p>
                    <input type="date" id="date-uno-campaña">
                </div>
                <div>
                    <p>hasta:</p>
                    <input type="date" id="date-dos-campaña">
                    <form id="search">
                        <button>search</button>
                    </form>
                </div>
            </div>

            <div class="measurer">
                <div>
                    <p>Datos de venta</p>
                    <div>
                        <h3 id="data-venta">0</h3>
                        <p>Venta</p>
                    </div>
                    <div>
                        <h3 id="data-meta">0</h3>
                        <p>Meta</p>
                    </div>
                </div>
                <div class="measurer">
                    <div class="card">
                        <div class="box">
                            <div class="percent" id="measurer">
                                <svg>
                                    <circle cx="70" cy="70" r="70"></circle>
                                    <circle cx="70" cy="70" r="70" style="--i:0;"></circle>
                                </svg>
                                <div class="number">
                                    <h2>0<span>%</span></h2>
                                </div>
                            </div>
                            <h2 class="text">Porcentaje</h2>
                        </div>
                    </div>
                </div>
            </div>

        </section> -->

        <section class="form">

            <div class="save-data">
                <div class="input-data" id="input-data">
                    <h2>Datos de venta</h2>
                    <form id="cantidad" method="POST">
                        <input type="date" name="date" id="date">
                        <input type="number" name="sales" id="number" required placeholder="NUMERO DE VENTAS">
                        <input type="number" name="goal" id="meta" required placeholder="META">
                        <button type="submit">enviar</button>
                    </form>
                </div>
            </div>  
        
            <div class="date-data" id="form-data">
                <div class="header-form">
                    <p>Fecha</p>
                </div>
                <div class="header-form">
                    <p>Ventas</p>
                </div>
                <div class="header-form">
                    <p>Meta</p>
                </div>
                <div class="header-form">
                    <p>Editar</p>
                </div>

                <?php

                    $servidor = "localhost";
                    $nombreusuario = "root";
                    $password = "";
                    $db = "dbprueba";

                    $conexion = new mysqli($servidor, $nombreusuario, $password,$db);

                    if($conexion-> connect_error){
                        die("Conexión fallida: " . $conexion-> connect_error);
                    }

                    if (isset($_POST['sales']) && isset($_POST['goal'])) {

                        $date = $_POST['date'];
                        $sales = $_POST['sales'];
                        $goal = $_POST['goal'];
                        
                        $sql = "INSERT INTO ventas(fecha_vnt,cant_vnt,met_vnt)
                                            VALUES (NOW(),$sales,$goal)";

                        /* if ($conexion->query($sql) === true) {
                            echo   '<div class="formularios">
                                        <p>' . $date . '</p>
                                    </div>
                                    <div class="formularios">
                                        <p>' . $sales . '</p>
                                    </div>
                                    <div class="formularios">
                                        <p>' . $goal . '</p>
                                    </div>
                                    <div class="formularios edit">
                                        <ion-icon name="pencil-outline"></ion-icon>
                                    </div>';
                        } else {
                            die("error al insertar datos: " . $conexion->error);
                        } */
                        
                    }

                ?>

            </div>
        
        
        </section>

<?php require_once './pages/layout/footer.php' ?>
