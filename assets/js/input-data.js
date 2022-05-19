
const dataContainer = document.getElementById('data-container')
const searchS = document.getElementById('search-sup')
const searchAsr = document.getElementById('search-asr')
const mesAdmin = ["01","02","03","04","05","06","07","08","09","10","11","12"]
const fechaAdmin = document.getElementById('date')

let urlSA = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-sup/API-sup.php"
let urlA = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-asesores/API-asesores.php"
let urlC = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-camp/API-camp.php"
let urlT = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-turn/API-turn.php"
let urlVC = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-ventas/API-ventas.php"
let urlP = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-product/API-product.php"
let urlUpdate = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/input-data/update-data.php"

let supervisorAsesor
let asesorS
let campañas
let turnos
let ventasCamp
let products
let optionS
let campActual
let turnActual
let actualDate = new Date()
let arrayPlanes = []



fetch(urlSA)
.then(r=>r.json())
.then(r=>{

    supervisorAsesor = r

})

fetch(urlA)
.then(r=>r.json())
.then(r=>{

    asesorS = r

})

fetch(urlC)
.then(r=>r.json())
.then(r=>{

    campañas = r

})

fetch(urlT)
.then(r=>r.json())
.then(r=>{

    turnos = r

})

fetch(urlVC)
.then(r=>r.json())
.then(r=>{

    ventasCamp = r

})

fetch(urlP)
.then(r=>r.json())
.then(r=>{

    products = r

})

setTimeout(() => {
    for (let i = 0; i < supervisorAsesor.items.length; i++) {
        optionS += `<option value="${supervisorAsesor.items[i].id_sup}">${supervisorAsesor.items[i].nom_sup}</option>`
    }
    
    searchS.innerHTML = optionS

    fechaAdmin.value = `${actualDate.getFullYear()}-${mesAdmin[actualDate.getMonth()]}-${actualDate.getDate()<10 ? "0" + actualDate.getDate() : actualDate.getDate()}`
}, 500)


searchAsr.addEventListener("click",(e)=>{
    e.preventDefault()

    let asesoresList = ""
    for (let i = 0; i < supervisorAsesor.items.length; i++) {
        if (parseInt(searchS.value)===supervisorAsesor.items[i].id_sup) {
            /* console.log(parseInt(searchS.value))
            console.log(fechaAdmin.value)
            console.log(supervisorAsesor.items[i].id_sup)
            console.log(supervisorAsesor.items[i].nom_sup)
            console.log(supervisorAsesor.items[i].cod_camp)
            console.log(supervisorAsesor.items[i].cod_turn)
            console.log(supervisorAsesor.items[i].asesores)
            console.log(asesorS.items)
            console.log(ventasCamp.items)
            console.log(products.items) */
            for (let e = 0; e < campañas.items.length; e++) {
                if (supervisorAsesor.items[i].cod_camp === campañas.items[e].id_camp) {
                    campActual = campañas.items[e].camp
                }
            }

            for (let e = 0; e < turnos.items.length; e++) {
                if (supervisorAsesor.items[i].cod_turn === turnos.items[e].id_turn) {
                    turnActual = turnos.items[e].turno
                }
            }

            for (let e = 0; e < products.items.length; e++) {
                if (supervisorAsesor.items[i].cod_camp === products.items[e].cod_camp) {
                    arrayPlanes.push(products.items[e])
                }
            }

            for (let e = 0; e < asesorS.items.length; e++) {
                if (parseInt(searchS.value) === asesorS.items[e].cod_sup) {
                    let ventasAsesor = []
                    for (let a = 0; a < ventasCamp.items.length; a++) {
                        if ((asesorS.items[e].id_asesor === ventasCamp.items[a].cod_asesor) && (fechaAdmin.value === ventasCamp.items[a].fecha)) {
                            ventasAsesor.push(ventasCamp.items[a])
                        }
                    }
                    if (ventasAsesor.length !== 0) {
                        asesoresList += `<form method="POST" class="date-data admin">
                    <input type="text" name="name" value="${asesorS.items[e].asesor}" class="formularios">
                    <input type="text" name="id-asesor" value="${asesorS.items[e].id_asesor}" class="formularios" style="display: none;">
                    <input type="number" name="plan1" class="formularios planes none" value="${ventasAsesor[0].ventas}">
                    <p class="formularios planes">${ventasAsesor[0].ventas}</p>
                    <input type="number" name="plan2" class="formularios planes none" value="${ventasAsesor[1].ventas}">
                    <p class="formularios planes">${ventasAsesor[1].ventas}</p>
                    <input type="number" name="plan3" class="formularios planes none" value="${ventasAsesor[2].ventas}">
                    <p class="formularios planes">${ventasAsesor[2].ventas}</p>
                    <input type="date" name="date-send" style="display: none;" value="${fechaAdmin.value}">
                    <input type="number" name="meta" class="formularios planes none" value="${ventasAsesor[0].meta}">
                    <div class="formularios planes">
                        <p class="meta">${ventasAsesor[0].meta}</p>
                    </div>
                    <button type="button"><ion-icon name="pencil-outline"></ion-icon></button>
                    <button type="submit"><ion-icon name="checkmark-done-outline"></ion-icon></button>
                </form>`
                    }
                }
            }

            dataContainer.innerHTML = `<div class="header-container">
                <div class="header-data">
                    <h2>${supervisorAsesor.items[i].nom_sup}</h2>
                </div>
                <div class="info-data">
                    <p>Campaña: ${campActual}</p>
                    <p>Turno: ${turnActual}</p>
                    <p>Asesores: ${supervisorAsesor.items[i].asesores}</p>
                </div>
            </div>
            <div class="date-data admin">
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
                        <p>editar</p>
                    </div>
                    <div class="header-form">
                        <p>enviar</p>
                    </div>
                </div>
                ${asesoresList}
                <div class="date-data admin">
                    <div class="header-form">
                        <p>Total</p>
                    </div>
                    <div class="header-form">
                        <p id="p1"></p>
                    </div>
                    <div class="header-form">
                        <p id="p2"></p>
                    </div>
                    <div class="header-form">
                        <p id="p3"></p>
                    </div>
                    <div class="header-form">
                        <p id="meta"></p>
                    </div>
                    <div class="header-form">
                        <p></p>
                    </div>
                    <div class="header-form">
                        <p></p>
                    </div>
                </div>`
            
            const nameDisabled = document.getElementsByName('name')
            for (let i = 0; i < nameDisabled.length; i++) {
                nameDisabled[i].disabled = true
            }

            const editButton = document.getElementsByClassName('date-data')
            for (let a = 0; a < editButton.length; a++) {
                editButton[a].addEventListener("dblclick",(e)=>{
                    e.preventDefault()
                    let datos = editButton[a].getElementsByClassName('planes')
                    for (let u = 0; u < datos.length; u++) {
                        datos[u].classList.toggle('none')
                    }
                })
                editButton[a].addEventListener("submit",(e)=>{
                    e.preventDefault()
                    let datos = editButton[a].getElementsByClassName('planes')
                    let formulario = new FormData(editButton[a])
                    fetch(urlUpdate,{
                        method: 'POST',
                        body: formulario
                    })
                    .then(r => r.json())
                    for (let u = 0; u < datos.length; u++) {
                        datos[u].classList.toggle('none')
                        datos[u+1].innerText = datos[u].value
                    }
                })
            }
        }
    }
})


    



