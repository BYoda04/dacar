
const measurer = document.getElementById('measurer')
const searchAdmin = document.getElementById('search')
const supG = document.getElementById('sup-graph')
const asesorG = document.getElementById('asesor-graph')
const yes = document.getElementById('asesor-yes')
const dataGraphics = document.getElementById('graphics-data-container')
const month = ["01","02","03","04","05","06","07","08","09","10","11","12"]

let fechaActualGraphics = new Date()

/*ELEMENTS HTML*/

//API PHP
let urlSG = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-sup/API-sup.php"
let urlaGA = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-asesores/API-asesores.php"
let urlCG = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-camp/API-camp.php"
let urlTG = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-turn/API-turn.php"
let urlPG = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-product/API-product.php"
let url = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-ventas/API-ventas.php"

let fechaVentaUno = document.getElementById('date-uno-campaña')
let fechaVentaDos = document.getElementById('date-dos-campaña')
let dataVenta = document.getElementById('data-venta')
let dataMeta = document.getElementById('data-meta')

let vendido = 0
let metaDiaria
let save 
let supGname
let asesorGname
let campG
let turnG
let productG
let optionSG = ""
let optionsAG = ""
let IdSupActual
let campGactual
let turnGactual
let arrayProducts =[]

fechaVentaUno.value = `${fechaActualGraphics.getFullYear()}-${month[fechaActualGraphics.getMonth()]}-${fechaActualGraphics.getDate()<10 ? "0" + fechaActualGraphics.getDate() : fechaActualGraphics.getDate()}`

/*PORCENTAJES*/

const measurerPercent = measurer.children
const circle = measurerPercent[0].children
const circlePercent = circle[1].attributes

const textContent = measurerPercent[1].children
const textValue = textContent[0].childNodes

/*MANEJO DE API*/

fetch(url)
.then(r=>r.json())
.then(r=>{
    save = r
})

fetch(urlSG)
.then(r=>r.json())
.then(r=>{
    supGname = r
})

fetch(urlaGA)
.then(r=>r.json())
.then(r=>{
    asesorGname = r
})

fetch(urlCG)
.then(r=>r.json())
.then(r=>{
    campG = r
})

fetch(urlTG)
.then(r=>r.json())
.then(r=>{
    turnG = r
})

fetch(urlPG)
.then(r=>r.json())
.then(r=>{
    productG = r
})

/*DYNAMIC PERCENT*/

setTimeout(() => { 
    if (save.items !== undefined) { 
        for (let i = 0; i < save.items.length; i++) {
            
            if ((save.items[i].fecha === fechaVentaUno.value)&&(save.items[i].cod_sup === parseInt(supG.value))) {

                dataVenta.innerText = parseInt(dataVenta.innerText) + save.items[i].ventas
                dataMeta.innerText = save.items[i].meta
                vendido += save.items[i].ventas
                metaDiaria = save.items[i].meta
            }
        }
        setTimeout(() => {
            textValue[0].nodeValue = `${((parseInt(vendido)/parseInt(metaDiaria))*100).toFixed(1)}`
                    circlePercent[3].value = `--i:${((parseInt(vendido)/parseInt(metaDiaria))*100).toFixed(1)};`
        }, 500);

        for (let i = 0; i < supGname.items.length; i++) {
            if (parseInt(supG.value) === supGname.items[i].id_sup) {
                if (supGname.items[i].cod_camp === 1) {
                    
                    let asesoresList = ""
                    for (let e = 0; e < campG.items.length; e++) {
                        if (supGname.items[i].cod_camp === campG.items[e].id_camp) {
                            campGactual = campG.items[e].camp
                        }
                    }

                    for (let e = 0; e < turnG.items.length; e++) {
                        if (supGname.items[i].cod_turn === turnG.items[e].id_turn) {
                            turnGactual = turnG.items[e].turno
                        }
                    }

                    for (let e = 0; e < productG.items.length; e++) {
                        if (supGname.items[i].cod_camp === productG.items[e].cod_camp) {
                            arrayProducts.push(productG.items[e])
                        }
                    }

                    for (let e = 0; e < asesorGname.items.length; e++) {
                        if (parseInt(supG.value) === asesorGname.items[e].cod_sup) {
                            let ventasAsesor = []
                            for (let a = 0; a < save.items.length; a++) {
                                if ((asesorGname.items[e].id_asesor === save.items[a].cod_asesor) && (fechaVentaUno.value === save.items[a].fecha)) {
                                    ventasAsesor.push(save.items[a])
                                }
                            }
                            if (ventasAsesor.length !== 0) {
                                asesoresList += `<form method="POST" class="date-data graphics">
                            <p class="formularios planes">${asesorGname.items[e].asesor}</p>
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

                    dataGraphics.innerHTML = `<div class="header-container graphics-title">
                    <div class="header-data">
                        <h2>${supGname.items[i].nom_sup}</h2>
                    </div>
                    <div class="info-data">
                        <p>Campaña: ${campGactual}</p>
                        <p>Turno: ${turnGactual}</p>
                        <p>Asesores: ${supGname.items[i].asesores}</p>
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

                } else if (supGname.items[i].cod_camp === 2) {
                    
                    let asesoresList = ""
                    for (let e = 0; e < campG.items.length; e++) {
                        if (supGname.items[i].cod_camp === campG.items[e].id_camp) {
                            campGactual = campG.items[e].camp
                        }
                    }

                    for (let e = 0; e < turnG.items.length; e++) {
                        if (supGname.items[i].cod_turn === turnG.items[e].id_turn) {
                            turnGactual = turnG.items[e].turno
                        }
                    }

                    for (let e = 0; e < productG.items.length; e++) {
                        if (supGname.items[i].cod_camp === productG.items[e].cod_camp) {
                            arrayProducts.push(productG.items[e])
                        }
                    }

                    for (let e = 0; e < asesorGname.items.length; e++) {
                        if (parseInt(supG.value) === asesorGname.items[e].cod_sup) {
                            let ventasAsesor = []
                            for (let a = 0; a < save.items.length; a++) {
                                if ((asesorGname.items[e].id_asesor === save.items[a].cod_asesor) && (fechaVentaUno.value === save.items[a].fecha)) {
                                    ventasAsesor.push(save.items[a])
                                }
                            }
                            if (ventasAsesor.length !== 0) {
                                asesoresList += `<form method="POST" class="date-data graphics">
                            <p class="formularios planes">${asesorGname.items[e].asesor}</p>
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

                    dataGraphics.innerHTML = `<div class="header-container graphics-title">
                    <div class="header-data">
                        <h2>${supGname.items[i].nom_sup}</h2>
                    </div>
                    <div class="info-data">
                        <p>Campaña: ${campGactual}</p>
                        <p>Turno: ${turnGactual}</p>
                        <p>Asesores: ${supGname.items[i].asesores}</p>
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
}, 2000);

/*SUPERVISORES AND ASESORES*/

setTimeout(() => {

    for (let i = 0; i < supGname.items.length; i++) {
        optionSG += `<option value="${supGname.items[i].id_sup}">${supGname.items[i].nom_sup}</option>`
    }
    supG.innerHTML += `${optionSG}`

    for (let i = 0; i < asesorGname.items.length; i++) {
        if (asesorGname.items[i].cod_sup === parseInt(supG.value)) {
            optionsAG += `<option value="${asesorGname.items[i].id_asesor}">${asesorGname.items[i].asesor}</option>`
        }
    }
    asesorG.innerHTML += `${optionsAG}`

    supG.addEventListener("click",()=>{
        if (parseInt(supG.value) !== IdSupActual) {
            IdSupActual = parseInt(supG.value)
            asesorG.innerHTML = ""
            optionsAG = ""
            for (let i = 0; i < asesorGname.items.length; i++) {
                if (asesorGname.items[i].cod_sup === IdSupActual) {
                    optionsAG += `<option value="${asesorGname.items[i].id_asesor}">${asesorGname.items[i].asesor}</option>`
                }
            }
            asesorG.innerHTML += `${optionsAG}`
        }
    })

    yes.addEventListener("click",()=>{
        console.log(yes.checked)
    })

}, 1500);

searchAdmin.addEventListener("click",(e)=>{
    e.preventDefault()
    vendido = 0
    metaDiaria = 0
    dataVenta.innerText = 0
    dataMeta.innerText = 0
    for (let i = 0; i < supGname.items.length; i++) {
        if (parseInt(supG.value) === supGname.items[i].id_sup) {

            if (supGname.items[i].cod_camp === 1) {

                if (fechaVentaDos.value !== "") {
                    let asesoresList = ""
                    let fechaUno = (fechaVentaUno.value).split('-')
                    let fechaDos = (fechaVentaDos.value).split('-')
                    for (let e = 0; e < campG.items.length; e++) {
                        if (supGname.items[i].cod_camp === campG.items[e].id_camp) {
                            campGactual = campG.items[e].camp
                        }
                    }

                    for (let e = 0; e < turnG.items.length; e++) {
                        if (supGname.items[i].cod_turn === turnG.items[e].id_turn) {
                            turnGactual = turnG.items[e].turno
                        }
                    }

                    for (let e = 0; e < productG.items.length; e++) {
                        if (supGname.items[i].cod_camp === productG.items[e].cod_camp) {
                            arrayProducts.push(productG.items[e])
                        }
                    }

                    for (let e = 0; e < asesorGname.items.length; e++) {
                        if (parseInt(supG.value) === asesorGname.items[e].cod_sup) {
                            let ventasAsesor = []
                            let soldUno = 0
                            let soldDos = 0
                            let soldTres = 0
                            for (let a = 0; a < save.items.length; a++) {
                                if (asesorGname.items[e].id_asesor === save.items[a].cod_asesor) {
                                    let dateSave = (save.items[a].fecha).split('-')
                                    console.log(parseInt(dateSave[2]))
                                    if ((parseInt(dateSave[2]) >= parseInt(fechaUno[2])) &&(parseInt(dateSave[2]) <= parseInt(fechaDos[2]))) {
                                        ventasAsesor.push(save.items[a])
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
                                    <p class="formularios planes">${asesorGname.items[e].asesor}</p>
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

                    dataGraphics.innerHTML = `<div class="header-container graphics-title">
                    <div class="header-data">
                        <h2>${supGname.items[i].nom_sup}</h2>
                    </div>
                    <div class="info-data">
                        <p>Campaña: ${campGactual}</p>
                        <p>Turno: ${turnGactual}</p>
                        <p>Asesores: ${supGname.items[i].asesores}</p>
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
                    for (let e = 0; e < campG.items.length; e++) {
                        if (supGname.items[i].cod_camp === campG.items[e].id_camp) {
                            campGactual = campG.items[e].camp
                        }
                    }

                    for (let e = 0; e < turnG.items.length; e++) {
                        if (supGname.items[i].cod_turn === turnG.items[e].id_turn) {
                            turnGactual = turnG.items[e].turno
                        }
                    }

                    for (let e = 0; e < productG.items.length; e++) {
                        if (supGname.items[i].cod_camp === productG.items[e].cod_camp) {
                            arrayProducts.push(productG.items[e])
                        }
                    }

                    for (let e = 0; e < asesorGname.items.length; e++) {
                        if (parseInt(supG.value) === asesorGname.items[e].cod_sup) {
                            let ventasAsesor = []
                            for (let a = 0; a < save.items.length; a++) {
                                if ((asesorGname.items[e].id_asesor === save.items[a].cod_asesor) && (fechaVentaUno.value === save.items[a].fecha)) {
                                    ventasAsesor.push(save.items[a])
                                }
                            }
                            if (ventasAsesor.length !== 0) {
                                asesoresList += `<form method="POST" class="date-data graphics">
                                <p class="formularios planes">${asesorGname.items[e].asesor}</p>
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

                    dataGraphics.innerHTML = `<div class="header-container graphics-title">
                    <div class="header-data">
                        <h2>${supGname.items[i].nom_sup}</h2>
                    </div>
                    <div class="info-data">
                        <p>Campaña: ${campGactual}</p>
                        <p>Turno: ${turnGactual}</p>
                        <p>Asesores: ${supGname.items[i].asesores}</p>
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

            } else if (supGname.items[i].cod_camp === 2) {
                
                if (fechaVentaDos.value !== "") {
                    let asesoresList = ""
                    let fechaUno = (fechaVentaUno.value).split('-')
                    let fechaDos = (fechaVentaDos.value).split('-')
                    for (let e = 0; e < campG.items.length; e++) {
                        if (supGname.items[i].cod_camp === campG.items[e].id_camp) {
                            campGactual = campG.items[e].camp
                        }
                    }

                    for (let e = 0; e < turnG.items.length; e++) {
                        if (supGname.items[i].cod_turn === turnG.items[e].id_turn) {
                            turnGactual = turnG.items[e].turno
                        }
                    }

                    for (let e = 0; e < productG.items.length; e++) {
                        if (supGname.items[i].cod_camp === productG.items[e].cod_camp) {
                            arrayProducts.push(productG.items[e])
                        }
                    }

                    for (let e = 0; e < asesorGname.items.length; e++) {
                        if (parseInt(supG.value) === asesorGname.items[e].cod_sup) {
                            let ventasAsesor = []
                            let soldUno = 0
                            let soldDos = 0
                            let soldTres = 0
                            for (let a = 0; a < save.items.length; a++) {
                                if (asesorGname.items[e].id_asesor === save.items[a].cod_asesor) {
                                    let dateSave = (save.items[a].fecha).split('-')
                                    console.log(parseInt(dateSave[2]))
                                    if ((parseInt(dateSave[2]) >= parseInt(fechaUno[2])) &&(parseInt(dateSave[2]) <= parseInt(fechaDos[2]))) {
                                        ventasAsesor.push(save.items[a])
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
                                    <p class="formularios planes">${asesorGname.items[e].asesor}</p>
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

                    dataGraphics.innerHTML = `<div class="header-container graphics-title">
                    <div class="header-data">
                        <h2>${supGname.items[i].nom_sup}</h2>
                    </div>
                    <div class="info-data">
                        <p>Campaña: ${campGactual}</p>
                        <p>Turno: ${turnGactual}</p>
                        <p>Asesores: ${supGname.items[i].asesores}</p>
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
                    for (let e = 0; e < campG.items.length; e++) {
                        if (supGname.items[i].cod_camp === campG.items[e].id_camp) {
                            campGactual = campG.items[e].camp
                        }
                    }

                    for (let e = 0; e < turnG.items.length; e++) {
                        if (supGname.items[i].cod_turn === turnG.items[e].id_turn) {
                            turnGactual = turnG.items[e].turno
                        }
                    }

                    for (let e = 0; e < productG.items.length; e++) {
                        if (supGname.items[i].cod_camp === productG.items[e].cod_camp) {
                            arrayProducts.push(productG.items[e])
                        }
                    }

                    for (let e = 0; e < asesorGname.items.length; e++) {
                        if (parseInt(supG.value) === asesorGname.items[e].cod_sup) {
                            let ventasAsesor = []
                            for (let a = 0; a < save.items.length; a++) {
                                if ((asesorGname.items[e].id_asesor === save.items[a].cod_asesor) && (fechaVentaUno.value === save.items[a].fecha)) {
                                    ventasAsesor.push(save.items[a])
                                }
                            }
                            if (ventasAsesor.length !== 0) {
                                asesoresList += `<form method="POST" class="date-data graphics">
                                <p class="formularios planes">${asesorGname.items[e].asesor}</p>
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

                    dataGraphics.innerHTML = `<div class="header-container graphics-title">
                    <div class="header-data">
                        <h2>${supGname.items[i].nom_sup}</h2>
                    </div>
                    <div class="info-data">
                        <p>Campaña: ${campGactual}</p>
                        <p>Turno: ${turnGactual}</p>
                        <p>Asesores: ${supGname.items[i].asesores}</p>
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
    if (yes.checked) {
        if (fechaVentaDos.value === "") {
            for (let i = 0; i < save.items.length; i++) {
                if ((save.items[i].cod_asesor === parseInt(asesorG.value))&&(save.items[i].fecha === fechaVentaUno.value)) {
                    dataVenta.innerText = parseInt(dataVenta.innerText) + save.items[i].ventas
                    dataMeta.innerText = save.items[i].meta

                    vendido += save.items[i].ventas
                    metaDiaria = save.items[i].meta
                }
            }
            textValue[0].nodeValue = `${((parseInt(vendido)/parseInt(metaDiaria))*100).toFixed(1)}`
            circlePercent[3].value = `--i:${((parseInt(vendido)/parseInt(metaDiaria))*100).toFixed(1)};`
        } else {
            let fechaUno = (fechaVentaUno.value).split('-')
            let fechaDos = (fechaVentaDos.value).split('-')

            if (parseInt(fechaDos[2]) > parseInt(fechaUno[2])) {
                
                let i = 0
                let ventasTotal = 0
                let metaTotal = 0
                let metaSave = 0

                for ( i ; i <= save.items.length; i++) {
                    
                    if ((save.items[i].cod_asesor === parseInt(asesorG.value))&&(save.items[i].fecha === fechaVentaUno.value)){

                        for ( i ; i <= save.items.length; i++) {

                            if ((save.items[i].cod_asesor === parseInt(asesorG.value))) {
                                ventasTotal += parseInt(save.items[i].ventas)
                                if (parseInt(save.items[i].meta) !== metaSave) {
                                    metaSave = parseInt(save.items[i].meta)
                                    metaTotal += parseInt(save.items[i].meta)
                                }
                            
                                if ((save.items[i].fecha !== fechaVentaDos.value) || (fechaVentaDos.value === save.items[i+1].fecha)) {

                                    dataVenta.innerText = ventasTotal
                                    dataMeta.innerText = metaTotal

                                    textValue[0].nodeValue = `${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)}`
                                    circlePercent[3].value = `--i:${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)};`

                                } else{

                                    dataVenta.innerText = ventasTotal
                                    dataMeta.innerText = metaTotal

                                    textValue[0].nodeValue = `${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)}`
                                    circlePercent[3].value = `--i:${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)};`

                                    break
                                }
                            }

                        }

                    }

                }

            }
        }
    } else {
        if (fechaVentaDos.value === "") {
            for (let i = 0; i < save.items.length; i++) {
                if ((save.items[i].cod_sup === parseInt(supG.value))&&(save.items[i].fecha === fechaVentaUno.value)) {
                    dataMeta.innerText = save.items[i].meta
                    dataVenta.innerText = parseInt(dataVenta.innerText) + save.items[i].ventas
           
                    vendido += save.items[i].ventas
                    metaDiaria = save.items[i].meta
                }
            }

            textValue[0].nodeValue = `${((parseInt(vendido)/parseInt(metaDiaria))*100).toFixed(1)}`
            circlePercent[3].value = `--i:${((parseInt(vendido)/parseInt(metaDiaria))*100).toFixed(1)};`
        } else {
            let fechaUno = (fechaVentaUno.value).split('-')
            let fechaDos = (fechaVentaDos.value).split('-')

            if (parseInt(fechaDos[2]) > parseInt(fechaUno[2])) {
                
                let i = 0
                let ventasTotal = 0
                let metaTotal = 0
                let metaSave = 0
                let firstDate
                let lastDate
                let lastSupId

                for ( i ; i <= save.items.length; i++) {
                    if (save.items[i] !== undefined) {
                        lastSupId = save.items[i].cod_sup
                        firstDate = save.items[i].fecha
                    }
                    
                    if ((lastSupId === parseInt(supG.value))&&(firstDate === fechaVentaUno.value)){
                        for ( i ; i <= save.items.length; i++) {
                            if (save.items[i] !== undefined) {
                                lastSupId = save.items[i].cod_sup
                                firstDate = save.items[i].fecha
                            }
                            if ((lastSupId === parseInt(supG.value))) {
                                ventasTotal += parseInt(save.items[i].ventas)
                                if (parseInt(save.items[i].meta) !== metaSave) {
                                    metaSave = parseInt(save.items[i].meta)
                                    metaTotal += parseInt(save.items[i].meta)
                                }
                                
                                if (save.items[i+1] !== undefined) {
                                    lastDate = save.items[i+1].fecha
                                }
                                if ((firstDate !== fechaVentaDos.value) || (fechaVentaDos.value === lastDate)) {
                                    dataVenta.innerText = ventasTotal
                                    dataMeta.innerText = metaTotal

                                    textValue[0].nodeValue = `${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)}`
                                    circlePercent[3].value = `--i:${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)};`

                                } else{
                                    
                                    dataVenta.innerText = ventasTotal
                                    dataMeta.innerText = metaTotal

                                    textValue[0].nodeValue = `${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)}`
                                    circlePercent[3].value = `--i:${((parseInt(ventasTotal)/parseInt(metaTotal))*100).toFixed(1)};`

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
