<?php require_once './pages/layout/nav-top.php' ?>

<?php require_once './pages/layout/nav-left.php' ?>

</section>

    <section class="form" id="form">
        
        <div class="save-data">
            <div class="input-data" id="input-data">
                <div class="title">
                    <h2>Datos de ventas</h2>
                </div>
                <form id="cantidad" method="POST">
                    <select name="sup" id="search-sup">
    
                    </select>
                    <input type="date" name="date" id="date">
                    <button id="search-asr">buscar</button>
                </form>
            </div>
        </div> 
            
        <div class="data-container" id="data-container">
            
        </div>

    </section>

<?php require_once './pages/layout/footer.php' ?>