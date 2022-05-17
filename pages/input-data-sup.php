<?php require_once './pages/layout/nav-top.php' ?>

<?php require_once './pages/layout/nav-left.php' ?>

</section>

    <section class="form" id="form">
        
        <div class="save-data">
            <div class="input-data" id="input-data">
                <div class="title">
                    <h2>Datos de venta Movil</h2>
                </div>
                <div id="cantidad">
                    <div>
                        <p id="supervisor">
                            Supervisor: 
                        </p>
                    </div>
                    <div>
                        <p id="campaña">
                            Campaña: 
                        </p>
                    </div>
                    <div>
                        <p id="turno">
                            Turno: 
                        </p>
                    </div>
                    <form id="meta-button">
                        <p>
                            Fecha: <input type="date" name="date" id="date-input">
                        </p>
                        <p>
                            Meta: <input type="number" name="meta-value" id="meta">
                        </p>
                        <button type="submit">Guardar</button>
                    </form >
                </div>
            </div>

            <div id="form-data">
                
            </div>
        </div>

    </section>

<?php require_once './pages/layout/footer.php' ?>