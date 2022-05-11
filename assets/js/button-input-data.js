
const form = document.getElementById('form')
const movil = document.getElementById('movil')
const hogar = document.getElementById('hogar')
const nameUser = document.getElementById('name')
const rolUser = document.getElementById('rol')

let urlSupAsesor = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-sup/API-sup.php"
let urlAsesor = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-asesores/API-asesores.php"

let supervisorAsesor
let asesor


fetch(urlSupAsesor)
.then(r=>r.json())
.then(r=>{

    supervisorAsesor = r

})

fetch(urlAsesor)
.then(r=>r.json())
.then(r=>{

    asesor = r

})

setTimeout(() => {

    console.log(supervisorAsesor);
    console.log(asesor);
    
}, 2000);

movil.addEventListener("click",()=>{
    console.log(nameUser);
    console.log(rolUser);

    form.innerHTML = `<div class="save-data">
            <div class="input-data" id="input-data">
                <div class="title">
                    <div class="back" id="back">
                        <a href="./index-data.php"><ion-icon name="arrow-back-outline"></ion-icon></a>
                    </div>
                    <h2>Datos de venta Movil</h2>
                </div>
                <form id="cantidad" method="POST" action="./includes/input-data/guardar.php">
                    <input type="text" name="date" id="date">
                    <input type="date" name="date" id="date">
                    <button type="submit">enviar</button>
                </form>
            </div>
        </div> 
        
        <div class="date-data movil" id="form-data">

            <div class="header-form">
                <p></p>
            </div>
            <div class="header-form">
                <p>plan 1</p>
            </div>
            <div class="header-form">
                <p>plan 2</p>
            </div>
            <div class="header-form">
                <p>plan 3</p>
            </div>
            <div class="header-form">
                <p>total</p>
            </div>
            <div class="header-form">
                <p>editar</p>
            </div>

            <div class="formularios">
                <p>asesor 1</p>
            </div>
            <div class="formularios">
                <input type="number">
            </div>
            <div class="formularios" width="10px">
                <input type="number">
            </div>
            <div class="formularios edit">
                <input type="number">
            </div>
            <div class="formularios">
                <p>0</p>
            </div>
            <div class="formularios edit">
                <ion-icon name="pencil-outline"></ion-icon>
            </div>

            <div class="formularios">
                <p>asesor 2</p>
            </div>
            <div class="formularios">
                <input type="number">
            </div>
            <div class="formularios" width="10px">
                <input type="number">
            </div>
            <div class="formularios edit">
                <input type="number">
            </div>
            <div class="formularios">
                <p>0</p>
            </div>
            <div class="formularios edit">
                <ion-icon name="pencil-outline"></ion-icon>
            </div>

            <div class="formularios">
                <p>asesor 3</p>
            </div>
            <div class="formularios">
                <input type="number">
            </div>
            <div class="formularios" width="10px">
                <input type="number">
            </div>
            <div class="formularios edit">
                <input type="number">
            </div>
            <div class="formularios">
                <p>0</p>
            </div>
            <div class="formularios edit">
                <ion-icon name="pencil-outline"></ion-icon>
            </div>

            <!-- <?php include_once './includes/input-data/obtener-input-data.php'?> -->

            <div class="header-form">
                <p>Total</p>
            </div>
            <div class="header-form">
                <p>Total plan 1</p>
            </div>
            <div class="header-form">
                <p>Total plan 2</p>
            </div>
            <div class="header-form">
                <p>Total plan 3</p>
            </div>
            <div class="header-form">
                <p>total ventas</p>
            </div>
            <div class="header-form">
                <p></p>
            </div>

        </div>`
})

hogar.addEventListener("click",()=>{
    form.innerHTML = `        
        <div class="save-data">
            <div class="input-data" id="input-data">
                <div class="title">
                    <div class="back">
                        <a href="./index-data.php"><ion-icon name="arrow-back-outline"></ion-icon></a>
                    </div>
                    <h2>Datos de venta Hogar</h2>
                </div>
                <form id="cantidad" method="POST" action="./includes/input-data/guardar.php">
                    <input type="date" name="date" id="date">
                    <button type="submit">enviar</button>
                </form>
            </div>
        </div> 
        
        <div class="date-data hogar" id="form-data">

            <div class="header-form">
                <p></p>
            </div>
            <div class="header-form">
                <p>plan 1</p>
            </div>
            <div class="header-form">
                <p>plan 2</p>
            </div>
            <div class="header-form">
                <p>plan 3</p>
            </div>
            <div class="header-form">
                <p>total</p>
            </div>
            <div class="header-form">
                <p>UGI</p>
            </div>
            <div class="header-form">
                <p>editar</p>
            </div>

            <div class="formularios">
                <p>asesor 1</p>
            </div>
            <div class="formularios">
                <input type="number">
            </div>
            <div class="formularios" width="10px">
                <input type="number">
            </div>
            <div class="formularios edit">
                <input type="number">
            </div>
            <div class="formularios">
                <p>0</p>
            </div>
            <div class="formularios">
                <p>0</p>
            </div>
            <div class="formularios edit">
                <ion-icon name="pencil-outline"></ion-icon>
            </div>

            <div class="formularios">
                <p>asesor 2</p>
            </div>
            <div class="formularios">
                <input type="number">
            </div>
            <div class="formularios" width="10px">
                <input type="number">
            </div>
            <div class="formularios edit">
                <input type="number">
            </div>
            <div class="formularios">
                <p>0</p>
            </div>
            <div class="formularios">
                <p>0</p>
            </div>
            <div class="formularios edit">
                <ion-icon name="pencil-outline"></ion-icon>
            </div>

            <div class="formularios">
                <p>asesor 3</p>
            </div>
            <div class="formularios">
                <input type="number">
            </div>
            <div class="formularios" width="10px">
                <input type="number">
            </div>
            <div class="formularios edit">
                <input type="number">
            </div>
            <div class="formularios">
                <p>0</p>
            </div>
            <div class="formularios">
                <p>0</p>
            </div>
            <div class="formularios edit">
                <ion-icon name="pencil-outline"></ion-icon>
            </div>

            <?php include_once './includes/input-data/obtener-input-data.php'?>

            <div class="header-form">
                <p>Total</p>
            </div>
            <div class="header-form">
                <p>Total plan 1</p>
            </div>
            <div class="header-form">
                <p>Total plan 2</p>
            </div>
            <div class="header-form">
                <p>Total plan 3</p>
            </div>
            <div class="header-form">
                <p>total ventas</p>
            </div>
            <div class="header-form">
                <p>UGI general</p>
            </div>
            <div class="header-form">
                <p></p>
            </div>

        </div>`
})
