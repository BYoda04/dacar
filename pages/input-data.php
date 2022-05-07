<?php require_once './pages/layout/nav-top.php' ?>

<?php require_once './pages/layout/nav-left.php' ?>

</section>

    <section class="form">

        <div class="save-data">
            <div class="input-data" id="input-data">
                <h2>Datos de venta</h2>
                <form id="cantidad" method="POST" action="./includes/input-data/guardar.php">
                    <input type="date" name="date" id="date">
                    <input type="number" name="sales" required placeholder="NUMERO DE VENTAS">
                    <input type="number" name="goal" required placeholder="META">
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

            <?php include_once './includes/input-data/obtener-input-data.php'?>

        </div>


    </section>

<?php require_once './pages/layout/footer.php' ?>