<?php require_once './pages/layout/nav-top.php' ?>

<?php require_once './pages/layout/nav-left.php' ?>

</section>

        <section class="container">
            
            <div class="search-section">
                <div>
                    <h2>Porcentajes de ventas</h2>
                </div>
                <div>
                    <p>Supervisor:</p>
                    <select name="supervisor" id="sup-graph">

                    </select>
                </div>
                <div>
                    <p>Asesor:</p>
                    <select name="asesor" id="asesor-graph">

                    </select>
                    <input type="checkbox" name="asesor-yes" id="asesor-yes">
                </div>
                <div>
                    <p>Fecha desde:</p>
                    <input type="date" id="date-uno-campaña">
                </div>
                <div>
                    <p>hasta:</p>
                    <input type="date" id="date-dos-campaña">
                </div>
                <div id="search">
                    <button>search</button>
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

            <div class="data-container" id="graphics-data-container">
            
            </div>

        </section>
        
<?php require_once './pages/layout/footer.php' ?>