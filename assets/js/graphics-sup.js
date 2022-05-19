
const circulo = document.getElementById('measurer')
const searchSupG = document.getElementById('search-graphic-sup')
const nameSup = document.getElementById('name')
const asesorGS = document.getElementById('asesor-graph')
const asesorYes = document.getElementById('asesor-yes')
const dataGraphicsSup = document.getElementById('graphics-data-container-sup')
const mesesGraphics = ["01","02","03","04","05","06","07","08","09","10","11","12"]

const circuloPercent = circulo.children
const circulito = circuloPercent[0].children
const circulitoPercent = circulito[1].attributes
const textoContenido = circuloPercent[1].children
const textoValor = textoContenido[0].childNodes

let fechaDesde = document.getElementById('date-uno-campaña')
let fechaHacia = document.getElementById('date-dos-campaña')
let ventasSup = document.getElementById('data-venta')
let metaSup = document.getElementById('data-meta')
let fechaActualGS = new Date()
let asesorArray = []
let vendidoSup = 0

let urlSupG = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-sup/API-sup.php"
let urlAG = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-asesores/API-asesores.php"
let urlCGS = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-camp/API-camp.php"
let urlTGS = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-turn/API-turn.php"
let urlPGS = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-product/API-product.php"
let urlVentas = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-ventas/API-ventas.php"

let asesorGraphics
let supervisorG
let ventasGS
let campañaGS
let turnoGS
let productosGS
let Idsup
let metaSemanal
let turnoGSactual
let campañaGSactual
let arrayProductsS = []

fechaDesde.value = `${fechaActualGS.getFullYear()}-${mesesGraphics[fechaActualGS.getMonth()]}-${fechaActualGS.getDate()<10 ? "0" + fechaActualGS.getDate() : fechaActualGS.getDate()}`

fetch(urlAG)
.then(r=>r.json())
.then(r=>{
    asesorGraphics = r
})

fetch(urlSupG)
.then(r=>r.json())
.then(r=>{
    supervisorGraphics = r
})

fetch(urlVentas)
.then(r=>r.json())
.then(r=>{
    ventasGS = r
})

fetch(urlCGS)
.then(r=>r.json())
.then(r=>{
    campañaGS = r
})

fetch(urlTGS)
.then(r=>r.json())
.then(r=>{
    turnoGS = r
})

fetch(urlPGS)
.then(r=>r.json())
.then(r=>{
    productosGS = r
})

setTimeout(() => {
    for (let i = 0; i < supervisorGraphics.items.length; i++) {
        if (nameSup.textContent === supervisorGraphics.items[i].nom_sup) {
            Idsup = supervisorGraphics.items[i].id_sup
        }
    }
    for (let i = 0; i < asesorGraphics.items.length; i++) {
        if (Idsup === asesorGraphics.items[i].cod_sup) {
            asesorArray.push(asesorGraphics.items[i])
        }
    }
    for (let i = 0; i < asesorArray.length; i++) {
        asesorGS.innerHTML += `<option value="${asesorArray[i].id_asesor}">${asesorArray[i].asesor}</option>`
    }

    !function () {
            
        if (ventasGS.items !== undefined) {
            
            for (let i = 0; i < ventasGS.items.length; i++) {
                
                if ((ventasGS.items[i].fecha === fechaDesde.value)&&(ventasGS.items[i].cod_sup === Idsup)) {

                    ventasSup.innerText = parseInt(ventasSup.innerText) + ventasGS.items[i].ventas
                    metaSup.innerText = ventasGS.items[i].meta

                    vendidoSup += ventasGS.items[i].ventas
                    metaSemanal = ventasGS.items[i].meta
                }
            }
            textoValor[0].nodeValue = `${((parseInt(vendidoSup)/parseInt(metaSemanal))*100).toFixed(1)}`
            circulitoPercent[3].value = `--i:${((parseInt(vendidoSup)/parseInt(metaSemanal))*100).toFixed(1)};`
            for (let i = 0; i < supervisorGraphics.items.length; i++) {
                if (Idsup === supervisorGraphics.items[i].id_sup) {
                    if (supervisorGraphics.items[i].cod_camp === 1) {
                        
                        let asesoresList = ""
                        for (let e = 0; e < campañaGS.items.length; e++) {
                            if (supervisorGraphics.items[i].cod_camp === campañaGS.items[e].id_camp) {
                                campañaGSactual = campañaGS.items[e].camp
                            }
                        }
    
                        for (let e = 0; e < turnoGS.items.length; e++) {
                            if (supervisorGraphics.items[i].cod_turn === turnoGS.items[e].id_turn) {
                                turnoGSactual = turnoGS.items[e].turno
                            }
                        }
    
                        for (let e = 0; e < productosGS.items.length; e++) {
                            if (supervisorGraphics.items[i].cod_camp === productosGS.items[e].cod_camp) {
                                arrayProducts.push(productosGS.items[e])
                            }
                        }
    
                        for (let e = 0; e < asesorGraphics.items.length; e++) {
                            if (Idsup === asesorGraphics.items[e].cod_sup) {
                                let ventasAsesor = []
                                for (let a = 0; a < ventasGS.items.length; a++) {
                                    if ((asesorGraphics.items[e].id_asesor === ventasGS.items[a].cod_asesor) && (fechaDesde.value === ventasGS.items[a].fecha)) {
                                        ventasAsesor.push(ventasGS.items[a])
                                    }
                                }
                                if (ventasAsesor.length !== 0) {
                                    asesoresList += `<form method="POST" class="date-data movil">
                                <p class="formularios planes">${asesorGraphics.items[e].asesor}</p>
                                <p class="formularios planes">${ventasAsesor[0].ventas}</p>
                                <p class="formularios planes">${ventasAsesor[1].ventas}</p>
                                <p class="formularios planes">${ventasAsesor[2].ventas}</p>
                                <div class="formularios planes">
                                    <p class="meta">${ventasAsesor[0].meta}</p>
                                </div>
                                <div class="formularios planes">
                                    <p class="meta">${ventasAsesor[0].UGI}</p>
                                </div>
                            </form>`
                                }
                            }
                        }
    
                        dataGraphicsSup.innerHTML = `<div class="header-container graphics-title">
                        <div class="header-data">
                            <h2>${supervisorGraphics.items[i].nom_sup}</h2>
                        </div>
                        <div class="info-data">
                            <p>Campaña: ${campañaGSactual}</p>
                            <p>Turno: ${turnoGSactual}</p>
                            <p>Asesores: ${supervisorGraphics.items[i].asesores}</p>
                        </div>
                    </div>
                    <div class="date-data movil">
                            <div class="header-form">
                                <p>Asesores</p>
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
                                <p>meta</p>
                            </div>
                            <div class="header-form">
                                <p>UGI</p>
                            </div>
                        </div>
                        ${asesoresList}`
    
                    } else if (supervisorGraphics.items[i].cod_camp === 2) {
                        
                        let asesoresList = ""
                        for (let e = 0; e < campañaGS.items.length; e++) {
                            if (supervisorGraphics.items[i].cod_camp === campañaGS.items[e].id_camp) {
                                campañaGSactual = campañaGS.items[e].camp
                            }
                        }
    
                        for (let e = 0; e < turnoGS.items.length; e++) {
                            if (supervisorGraphics.items[i].cod_turn === turnoGS.items[e].id_turn) {
                                turnoGSactual = turnoGS.items[e].turno
                            }
                        }
    
                        for (let e = 0; e < productosGS.items.length; e++) {
                            if (supervisorGraphics.items[i].cod_camp === productosGS.items[e].cod_camp) {
                                arrayProductsS.push(productosGS.items[e])
                            }
                        }
    
                        for (let e = 0; e < asesorGraphics.items.length; e++) {
                            if (Idsup === asesorGraphics.items[e].cod_sup) {
                                let ventasAsesor = []
                                for (let a = 0; a < ventasGS.items.length; a++) {
                                    if ((asesorGraphics.items[e].id_asesor === ventasGS.items[a].cod_asesor) && (fechaDesde.value === ventasGS.items[a].fecha)) {
                                        ventasAsesor.push(ventasGS.items[a])
                                    }
                                }
                                if (ventasAsesor.length !== 0) {
                                    asesoresList += `<form method="POST" class="date-data graphics">
                                <p class="formularios planes">${asesorGraphics.items[e].asesor}</p>
                                <p class="formularios planes">${ventasAsesor[0].ventas}</p>
                                <p class="formularios planes">${ventasAsesor[1].ventas}</p>
                                <p class="formularios planes">${ventasAsesor[2].ventas}</p>
                                <div class="formularios planes">
                                    <p class="meta">${ventasAsesor[0].meta}</p>
                                </div>
                            </form>`
                                }
                            }
                        }
    
                        dataGraphicsSup.innerHTML = `<div class="header-container graphics-title">
                        <div class="header-data">
                            <h2>${supervisorGraphics.items[i].nom_sup}</h2>
                        </div>
                        <div class="info-data">
                            <p>Campaña: ${campañaGSactual}</p>
                            <p>Turno: ${turnoGSactual}</p>
                            <p>Asesores: ${supervisorGraphics.items[i].asesores}</p>
                        </div>
                    </div>
                    <div class="date-data graphics">
                            <div class="header-form">
                                <p>Asesores</p>
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
                                <p>meta</p>
                            </div>
                        </div>
                        ${asesoresList}
                        <div class="date-data graphics">
                            <div class="header-form">
                                <p>Total</p>
                            </div>
                            <div class="header-form">
                                <p id="p1">0</p>
                            </div>
                            <div class="header-form">
                                <p id="p2">0</p>
                            </div>
                            <div class="header-form">
                                <p id="p3">0</p>
                            </div>
                            <div class="header-form">
                                <p id="meta">0</p>
                            </div>
                        </div>`
    
                    }
                }
            }
        }

    }();
}, 2000);

searchSupG.addEventListener("click",(e)=>{
    e.preventDefault()
    vendidoSup = 0
    metaSemanal = 0
    ventasSup.innerText = 0
    for (let i = 0; i < supervisorGraphics.items.length; i++) {
        if (Idsup === supervisorGraphics.items[i].id_sup) {

            if (supervisorGraphics.items[i].cod_camp === 1) {

                if (fechaHacia.value !== "") {
                    let asesoresList = ""
                    let fechaUno = (fechaDesde.value).split('-')
                    let fechaDos = (fechaHacia.value).split('-')
                    for (let e = 0; e < campañaGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_camp === campañaGS.items[e].id_camp) {
                            campañaGSactual = campañaGS.items[e].camp
                        }
                    }

                    for (let e = 0; e < turnoGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_turn === turnoGS.items[e].id_turn) {
                            turnoGSactual = turnoGS.items[e].turno
                        }
                    }

                    for (let e = 0; e < productosGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_camp === productosGS.items[e].cod_camp) {
                            arrayProductsS.push(productosGS.items[e])
                        }
                    }

                    for (let e = 0; e < asesorGraphics.items.length; e++) {
                        if (Idsup === asesorGraphics.items[e].cod_sup) {
                            let ventasAsesor = []
                            let soldUno = 0
                            let soldDos = 0
                            let soldTres = 0
                            for (let a = 0; a < ventasGS.items.length; a++) {
                                if (asesorGraphics.items[e].id_asesor === ventasGS.items[a].cod_asesor) {
                                    let dateventasGS = (ventasGS.items[a].fecha).split('-')
                                    console.log(parseInt(dateventasGS[2]))
                                    if ((parseInt(dateventasGS[2]) >= parseInt(fechaUno[2])) &&(parseInt(dateventasGS[2]) <= parseInt(fechaDos[2]))) {
                                        ventasAsesor.push(ventasGS.items[a])
                                    }
                                }
                            }
                            if (ventasAsesor.length !== 0) {
                                for (let a = 0; a < ventasAsesor.length; a++) {
                                    if (ventasAsesor[a].product === 1) {
                                        soldUno += ventasAsesor[a].ventas
                                    } else if (ventasAsesor[a].product === 2) {
                                        soldDos += ventasAsesor[a].ventas
                                    } else {
                                        soldTres += ventasAsesor[a].ventas
                                    }
                                }
                                asesoresList += `<form method="POST" class="date-data movil">
                                    <p class="formularios planes">${asesorGraphics.items[e].asesor}</p>
                                    <p class="formularios planes">${soldUno}</p>
                                    <p class="formularios planes">${soldDos}</p>
                                    <p class="formularios planes">${soldTres}</p>
                                    <div class="formularios planes">
                                        <p class="meta">${ventasAsesor[0].meta}</p>
                                    </div>
                                    <div class="formularios planes">
                                        <p class="meta">${ventasAsesor[0].UGI}</p>
                                    </div>
                                </form>`
                            }
                            console.log(ventasAsesor)
                        }
                    }

                    dataGraphicsSup.innerHTML = `<div class="header-container graphics-title">
                    <div class="header-data">
                        <h2>${supervisorGraphics.items[i].nom_sup}</h2>
                    </div>
                    <div class="info-data">
                        <p>Campaña: ${campañaGSactual}</p>
                        <p>Turno: ${turnoGSactual}</p>
                        <p>Asesores: ${supervisorGraphics.items[i].asesores}</p>
                    </div>
                </div>
                <div class="date-data movil">
                        <div class="header-form">
                            <p>Asesores</p>
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
                            <p>meta</p>
                        </div>
                        <div class="header-form">
                            <p>UGI</p>
                        </div>
                    </div>
                    ${asesoresList}`
                } else {
                    let asesoresList = ""
                    for (let e = 0; e < campañaGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_camp === campañaGS.items[e].id_camp) {
                            campañaGSactual = campañaGS.items[e].camp
                        }
                    }

                    for (let e = 0; e < turnoGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_turn === turnoGS.items[e].id_turn) {
                            turnoGSactual = turnoGS.items[e].turno
                        }
                    }

                    for (let e = 0; e < productosGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_camp === productosGS.items[e].cod_camp) {
                            arrayProductsS.push(productosGS.items[e])
                        }
                    }

                    for (let e = 0; e < asesorGraphics.items.length; e++) {
                        if (Idsup === asesorGraphics.items[e].cod_sup) {
                            let ventasAsesor = []
                            for (let a = 0; a < ventasGS.items.length; a++) {
                                if ((asesorGraphics.items[e].id_asesor === ventasGS.items[a].cod_asesor) && (fechaDesde.value === ventasGS.items[a].fecha)) {
                                    ventasAsesor.push(ventasGS.items[a])
                                }
                            }
                            if (ventasAsesor.length !== 0) {
                                asesoresList += `<form method="POST" class="date-data movil">
                                <p class="formularios planes">${asesorGraphics.items[e].asesor}</p>
                                <p class="formularios planes">${ventasAsesor[0].ventas}</p>
                                <p class="formularios planes">${ventasAsesor[1].ventas}</p>
                                <p class="formularios planes">${ventasAsesor[2].ventas}</p>
                                <div class="formularios planes">
                                    <p class="meta">${ventasAsesor[0].meta}</p>
                                </div>
                                <div class="formularios planes">
                                    <p class="meta">${ventasAsesor[0].UGI}</p>
                                </div>
                            </form>`
                            }
                            
                    console.log(ventasAsesor)
                        }
                    }

                    dataGraphicsSup.innerHTML = `<div class="header-container graphics-title">
                    <div class="header-data">
                        <h2>${supervisorGraphics.items[i].nom_sup}</h2>
                    </div>
                    <div class="info-data">
                        <p>Campaña: ${campañaGSactual}</p>
                        <p>Turno: ${turnoGSactual}</p>
                        <p>Asesores: ${supervisorGraphics.items[i].asesores}</p>
                    </div>
                </div>
                <div class="date-data movil">
                        <div class="header-form">
                            <p>Asesores</p>
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
                            <p>meta</p>
                        </div>
                        <div class="header-form">
                            <p>UGI</p>
                        </div>
                    </div>
                    ${asesoresList}`
                }

            } else if (supervisorGraphics.items[i].cod_camp === 2) {
                
                if (fechaHacia.value !== "") {
                    let asesoresList = ""
                    let fechaUno = (fechaDesde.value).split('-')
                    let fechaDos = (fechaHacia.value).split('-')
                    for (let e = 0; e < campañaGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_camp === campañaGS.items[e].id_camp) {
                            campañaGSactual = campañaGS.items[e].camp
                        }
                    }

                    for (let e = 0; e < turnoGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_turn === turnoGS.items[e].id_turn) {
                            turnoGSactual = turnoGS.items[e].turno
                        }
                    }

                    for (let e = 0; e < productosGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_camp === productosGS.items[e].cod_camp) {
                            arrayProductsS.push(productosGS.items[e])
                        }
                    }

                    for (let e = 0; e < asesorGraphics.items.length; e++) {
                        if (Idsup === asesorGraphics.items[e].cod_sup) {
                            let ventasAsesor = []
                            let soldUno = 0
                            let soldDos = 0
                            let soldTres = 0
                            for (let a = 0; a < ventasGS.items.length; a++) {
                                if (asesorGraphics.items[e].id_asesor === ventasGS.items[a].cod_asesor) {
                                    let dateventasGS = (ventasGS.items[a].fecha).split('-')
                                    console.log(parseInt(dateventasGS[2]))
                                    if ((parseInt(dateventasGS[2]) >= parseInt(fechaUno[2])) &&(parseInt(dateventasGS[2]) <= parseInt(fechaDos[2]))) {
                                        ventasAsesor.push(ventasGS.items[a])
                                    }
                                }
                            }
                            if (ventasAsesor.length !== 0) {
                                for (let a = 0; a < ventasAsesor.length; a++) {
                                    if (ventasAsesor[a].product === 1) {
                                        soldUno += ventasAsesor[a].ventas
                                    } else if (ventasAsesor[a].product === 2) {
                                        soldDos += ventasAsesor[a].ventas
                                    } else {
                                        soldTres += ventasAsesor[a].ventas
                                    }
                                }
                                asesoresList += `<form method="POST" class="date-data graphics">
                                    <p class="formularios planes">${asesorGraphics.items[e].asesor}</p>
                                    <p class="formularios planes">${soldUno}</p>
                                    <p class="formularios planes">${soldDos}</p>
                                    <p class="formularios planes">${soldTres}</p>
                                    <div class="formularios planes">
                                        <p class="meta">${ventasAsesor[0].meta}</p>
                                    </div>
                                </form>`
                            }
                            console.log(ventasAsesor)
                        }
                    }

                    dataGraphicsSup.innerHTML = `<div class="header-container graphics-title">
                    <div class="header-data">
                        <h2>${supervisorGraphics.items[i].nom_sup}</h2>
                    </div>
                    <div class="info-data">
                        <p>Campaña: ${campañaGSactual}</p>
                        <p>Turno: ${turnoGSactual}</p>
                        <p>Asesores: ${supervisorGraphics.items[i].asesores}</p>
                    </div>
                </div>
                <div class="date-data graphics">
                        <div class="header-form">
                            <p>Asesores</p>
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
                            <p>meta</p>
                        </div>
                    </div>
                    ${asesoresList}`
                } else {
                    let asesoresList = ""
                    for (let e = 0; e < campañaGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_camp === campañaGS.items[e].id_camp) {
                            campañaGSactual = campañaGS.items[e].camp
                        }
                    }

                    for (let e = 0; e < turnoGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_turn === turnoGS.items[e].id_turn) {
                            turnoGSactual = turnoGS.items[e].turno
                        }
                    }

                    for (let e = 0; e < productosGS.items.length; e++) {
                        if (supervisorGraphics.items[i].cod_camp === productosGS.items[e].cod_camp) {
                            arrayProductsS.push(productosGS.items[e])
                        }
                    }

                    for (let e = 0; e < asesorGraphics.items.length; e++) {
                        if (Idsup === asesorGraphics.items[e].cod_sup) {
                            let ventasAsesor = []
                            for (let a = 0; a < ventasGS.items.length; a++) {
                                if ((asesorGraphics.items[e].id_asesor === ventasGS.items[a].cod_asesor) && (fechaDesde.value === ventasGS.items[a].fecha)) {
                                    ventasAsesor.push(ventasGS.items[a])
                                }
                            }
                            if (ventasAsesor.length !== 0) {
                                asesoresList += `<form method="POST" class="date-data graphics">
                                <p class="formularios planes">${asesorGraphics.items[e].asesor}</p>
                                <p class="formularios planes">${ventasAsesor[0].ventas}</p>
                                <p class="formularios planes">${ventasAsesor[1].ventas}</p>
                                <p class="formularios planes">${ventasAsesor[2].ventas}</p>
                                <div class="formularios planes">
                                    <p class="meta">${ventasAsesor[0].meta}</p>
                                </div>
                            </form>`
                            }
                            
                    console.log(ventasAsesor)
                        }
                    }

                    dataGraphicsSup.innerHTML = `<div class="header-container graphics-title">
                    <div class="header-data">
                        <h2>${supervisorGraphics.items[i].nom_sup}</h2>
                    </div>
                    <div class="info-data">
                        <p>Campaña: ${campañaGSactual}</p>
                        <p>Turno: ${turnoGSactual}</p>
                        <p>Asesores: ${supervisorGraphics.items[i].asesores}</p>
                    </div>
                </div>
                <div class="date-data graphics">
                        <div class="header-form">
                            <p>Asesores</p>
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
                            <p>meta</p>
                        </div>
                    </div>
                    ${asesoresList}`
                }

            }
        }
    }
    if (asesorYes.checked) {
        if (fechaHacia.value === "") {
            for (let i = 0; i < ventasGS.items.length; i++) {
                if ((ventasGS.items[i].cod_asesor === parseInt(asesorGS.value))&&(ventasGS.items[i].fecha === fechaDesde.value)) {
                    ventasSup.innerText = parseInt(ventasSup.innerText) + ventasGS.items[i].ventas
                    metaSup.innerText = ventasGS.items[i].meta

                    vendidoSup += ventasGS.items[i].ventas
                    metaSemanal = ventasGS.items[i].meta
                }
            }
            textoValor[0].nodeValue = `${((parseInt(vendidoSup)/parseInt(metaSemanal))*100).toFixed(1)}`
            circulitoPercent[3].value = `--i:${((parseInt(vendidoSup)/parseInt(metaSemanal))*100).toFixed(1)};`
        } else {
            let fechaUno = (fechaDesde.value).split('-')
            let fechaDos = (fechaHacia.value).split('-')

            if (parseInt(fechaDos[2]) > parseInt(fechaUno[2])) {
                
                let i = 0
                let ventasTotal = 0
                let metaTotal = 0
                let metaventasGS = 0

                for ( i ; i <= ventasGS.items.length; i++) {
                    
                    if ((ventasGS.items[i].cod_asesor === parseInt(asesorGS.value))&&(ventasGS.items[i].fecha === fechaDesde.value)){

                        for ( i ; i <= ventasGS.items.length; i++) {

                            if ((ventasGS.items[i].cod_asesor === parseInt(asesorGS.value))) {
                                ventasTotal += parseInt(ventasGS.items[i].ventas)
                                if (parseInt(ventasGS.items[i].meta) !== metaventasGS) {
                                    metaventasGS = parseInt(ventasGS.items[i].meta)
                                    metaTotal += parseInt(ventasGS.items[i].meta)
                                }
                            
                                if ((ventasGS.items[i].fecha !== fechaHacia.value) || (fechaHacia.value === ventasGS.items[i+1].fecha)) {

                                    ventasSup.innerText = ventasTotal
                                    metaSup.innerText = metaTotal

                                    textoValor[0].nodeValue = `${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)}`
                                    circulitoPercent[3].value = `--i:${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)};`

                                } else{

                                    ventasSup.innerText = ventasTotal
                                    metaSup.innerText = metaTotal

                                    textoValor[0].nodeValue = `${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)}`
                                    circulitoPercent[3].value = `--i:${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)};`

                                    break
                                }
                            }

                        }

                    }

                }

            }
        }
    } else {
        if (fechaHacia.value === "") {
            for (let i = 0; i < ventasGS.items.length; i++) {
                if ((ventasGS.items[i].cod_sup === Idsup)&&(ventasGS.items[i].fecha === fechaDesde.value)) {
                    ventasSup.innerText = parseInt(ventasSup.innerText) + ventasGS.items[i].ventas
                    metaSup.innerText = ventasGS.items[i].meta

                    vendidoSup += ventasGS.items[i].ventas
                    metaSemanal = ventasGS.items[i].meta
                }
            }
            textoValor[0].nodeValue = `${((parseInt(vendidoSup)/parseInt(metaSemanal))*100).toFixed(1)}`
            circulitoPercent[3].value = `--i:${((parseInt(vendidoSup)/parseInt(metaSemanal))*100).toFixed(1)};`
        } else {
            let fechaUno = (fechaDesde.value).split('-')
            let fechaDos = (fechaHacia.value).split('-')

            if (parseInt(fechaDos[2]) > parseInt(fechaUno[2])) {
                
                let i = 0
                let ventasTotal = 0
                let metaTotal = 0
                let metaventasGS = 0
                let firstDate
                let lastDate
                let lastSupId

                for ( i ; i <= ventasGS.items.length; i++) {
                    if (ventasGS.items[i] !== undefined) {
                        lastSupId = ventasGS.items[i].cod_sup
                        firstDate = ventasGS.items[i].fecha
                    }
                    
                    if ((lastSupId === Idsup)&&(firstDate === fechaDesde.value)){
                        for ( i ; i <= ventasGS.items.length; i++) {
                            if (ventasGS.items[i] !== undefined) {
                                lastSupId = ventasGS.items[i].cod_sup
                                firstDate = ventasGS.items[i].fecha
                            }
                            if ((lastSupId === Idsup)) {
                                ventasTotal += parseInt(ventasGS.items[i].ventas)
                                if (parseInt(ventasGS.items[i].meta) !== metaventasGS) {
                                    metaventasGS = parseInt(ventasGS.items[i].meta)
                                    metaTotal += parseInt(ventasGS.items[i].meta)
                                }
                                
                                if (ventasGS.items[i+1] !== undefined) {
                                    lastDate = ventasGS.items[i+1].fecha
                                }
                                if ((firstDate !== fechaHacia.value) || (fechaHacia.value === lastDate)) {
                                    ventasSup.innerText = ventasTotal
                                    metaSup.innerText = metaTotal

                                    textoValor[0].nodeValue = `${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)}`
                                    circulitoPercent[3].value = `--i:${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)};`

                                } else{
                                    
                                    ventasSup.innerText = ventasTotal
                                    metaSup.innerText = metaTotal

                                    textoValor[0].nodeValue = `${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)}`
                                    circulitoPercent[3].value = `--i:${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)};`

                                    break
                                }
                            }

                        }

                    }

                }

            }
        }
    }
})