
const supervisorNombre = document.getElementById('supervisor')
const campañaData = document.getElementById('campaña')
const turnoData = document.getElementById('turno')
const nameUser = document.getElementById('name')
const rolUser = document.getElementById('rol')
const fechaE = document.getElementById('date-input')
const formD = document.getElementById('form-data')
const meta = document.getElementById('meta')
const metaButton = document.getElementById('meta-button')
const mes = ["01","02","03","04","05","06","07","08","09","10","11","12"]

let urlSupAsesor = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-sup/API-sup.php"
let urlAsesor = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-asesores/API-asesores.php"
let urlCampInput = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-camp/API-camp.php"
let urlTurnInput = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-turn/API-turn.php"
let urlProduct = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-product/API-product.php"
let urlSend = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/input-data/send-data.php"

let nameValue
let dateValue
let formValue
let checkbox
let metaValue
let asesorSup
let nomCampSup
let nomTurnSup
let nomProduct
let searchSup
let campSup
let turnoSup
let nameCampSup
let nameTurnSup

let optionsA = ""
let fechaActualID = new Date()

fechaE.value = `${fechaActualID.getFullYear()}-${mes[fechaActualID.getMonth()]}-${fechaActualID.getDate()<10 ? "0" + fechaActualID.getDate() : fechaActualID.getDate()}`
fechaE.disabled = true

fetch(urlSupAsesor)
.then(r=>r.json())
.then(r=>{

    supervisorAsesor = r

})

fetch(urlAsesor)
.then(r=>r.json())
.then(r=>{

    asesorSup = r

})

fetch(urlCampInput)
.then(r=>r.json())
.then(r=>{

    nomCampSup = r

})

fetch(urlTurnInput)
.then(r=>r.json())
.then(r=>{

    nomTurnSup = r

})

fetch(urlProduct)
.then(r=>r.json())
.then(r=>{

    nomProduct = r

})

setTimeout(() => {

    for (let i = 0; i < supervisorAsesor.items.length; i++) {
        if (supervisorAsesor.items[i].nom_sup === nameUser.textContent) {
            searchSup = supervisorAsesor.items[i].id_sup
            campSup = supervisorAsesor.items[i].cod_camp
            turnoSup = supervisorAsesor.items[i].cod_turn
        }
    }

    for (let i = 0; i < nomCampSup.items.length; i++) {
        if (campSup === nomCampSup.items[i].id_camp) {
            nameCampSup = nomCampSup.items[i].camp
        }
    }

    for (let i = 0; i < nomCampSup.items.length; i++) {
        if (turnoSup === nomTurnSup.items[i].id_turn) {
            nameTurnSup = nomTurnSup.items[i].turno
        }
    }

    supervisorNombre.innerHTML += ` ${nameUser.textContent}`
    campañaData.innerHTML += ` ${nameCampSup}`
    turnoData.innerHTML += ` ${nameTurnSup}`

    if (campSup === 1) {
        
        for (let i = 0; i < asesorSup.items.length; i++) {
            if ((asesorSup.items[i].cod_sup === parseInt(searchSup)) && (asesorSup.items[i].sate !== 2)) {
                optionsA += `<form method="POST" class="date-data hogar">
                <input type="text" name="name" value="${asesorSup.items[i].asesor}" class="formularios">
                <input type="text" name="name-asesor" value="${asesorSup.items[i].asesor}" class="formularios" style="display: none;">
                <input type="number" name="plan1" class="formularios planes">
                <input type="number" name="plan2" class="formularios planes">
                <input type="number" name="plan3" class="formularios planes">
                <input type="number" name="meta" style="display: none;">
                <input type="date" name="date-send" style="display: none;">
                <div class="formularios">
                    <p class="total">0</p>
                </div>
                <div class="formularios">
                    <p class="ugi">0</p>
                </div>
                <button type="submit" class="checkbox"><ion-icon name="checkmark-outline" class="edit"></ion-icon class="formularios"></button>
            </form>`
            }
            
        }
    
        formD.innerHTML += `<div class="date-data hogar">
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
                        <p>total</p>
                    </div>
                    <div class="header-form">
                        <p>UGI</p>
                    </div>
                    <div class="header-form">
                        <p>listo</p>
                    </div>
                </div>
        ${optionsA}
        <div class="date-data hogar">
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
                <p id="total"></p>
            </div>
            <div class="header-form">
                <p id="ugi"></p>
            </div>
            <div class="header-form">
                <p></p>
            </div>
        </div>`
        
        checkbox = document.getElementsByClassName('date-data')
        formValue = document.getElementsByName('meta')
        dateValue = document.getElementsByName('date-send')
        nameValue = document.getElementsByName('name')
        const p1 = document.getElementById('p1')
        const p2 = document.getElementById('p2')
        const p3 = document.getElementById('p3')
        const totalAbsolute = document.getElementById('total')
        const totalUgiAbsolute = document.getElementById('ugi')

        p1.innerHTML = 0
        p2.innerHTML = 0
        p3.innerHTML = 0
        totalAbsolute.innerHTML = 0
        totalUgiAbsolute.innerHTML =0

        for (let i = 0; i < nameValue.length; i++) {
            nameValue[i].disabled = true
        }
    
        metaButton.addEventListener("submit",(e)=>{
            e.preventDefault()
    
            metaValue = document.getElementById('meta')
            for (let i = 0; i < formValue.length; i++) {
                formValue[i].value = metaValue.value
                dateValue[i].value = fechaE.value
                meta.disabled = true
            }
            
        })
    
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].addEventListener("submit",(e)=>{
                e.preventDefault()
                let totalNumber = 0
                let totalUgi = 0

                let ventas = checkbox[i].getElementsByClassName('planes')
                let total = checkbox[i].getElementsByClassName('total')
                let ugi = checkbox[i].getElementsByClassName('ugi')
                for (let i = 0; i < ventas.length; i++) {
                    totalNumber += parseInt(ventas[i].value)
                }

                totalUgi+=parseInt(ventas[0].value)
                totalUgi+=parseInt(ventas[1].value)*2
                totalUgi+=parseInt(ventas[2].value)*3

                p1.innerHTML = parseInt(p1.innerHTML) + parseInt(ventas[0].value)
                p2.innerHTML = parseInt(p2.innerHTML) + parseInt(ventas[1].value)
                p3.innerHTML = parseInt(p3.innerHTML) + parseInt(ventas[2].value)

                total[0].innerText = totalNumber
                ugi[0].innerText = totalUgi

                totalAbsolute.innerText = parseInt(totalAbsolute.innerHTML) + parseInt(total[0].innerText)
                totalUgiAbsolute.innerText = parseInt(totalUgiAbsolute.innerHTML) + parseInt(ugi[0].innerText)

                let formulario = new FormData(checkbox[i])
    
                fetch(urlSend,{
                    method: 'POST',
                    body: formulario
                })
                .then(r => r.json())
            })
        }

    } else if (campSup === 2) {
        
        for (let i = 0; i < asesorSup.items.length; i++) {
            if ((asesorSup.items[i].cod_sup === parseInt(searchSup)) && (asesorSup.items[i].sate !== 2)) {
                optionsA += `<form method="POST" class="date-data movil">
                <input type="text" name="name" value="${asesorSup.items[i].asesor}" class="formularios">
                <input type="text" name="name-asesor" value="${asesorSup.items[i].asesor}" class="formularios" style="display: none;">
                <input type="number" name="plan1" class="formularios">
                <input type="number" name="plan2" class="formularios">
                <input type="number" name="plan3" class="formularios">
                <input type="number" name="meta" style="display: none;">
                <input type="date" name="date-send" style="display: none;">
                <div class="formularios">
                    <p class="total">0</p>
                </div>
                <button type="submit" class="checkbox"><ion-icon name="checkmark-outline" class="edit"></ion-icon class="formularios"></button>
            </form>`
            }
            
        }
    
        formD.innerHTML += `<div class="date-data movil">
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
                        <p>total</p>
                    </div>
                    <div class="header-form">
                        <p>listo</p>
                    </div>
                </div>
        ${optionsA}
        <div class="date-data movil">
            <div class="header-form">
                <p>Total</p>
            </div>
            <div class="header-form">
                <p>0</p>
            </div>
            <div class="header-form">
                <p>0</p>
            </div>
            <div class="header-form">
                <p>0</p>
            </div>
            <div class="header-form">
                <p>0</p>
            </div>
            <div class="header-form">
                <p></p>
            </div>
        </div>`
        
        checkbox = document.getElementsByClassName('date-data')
        formValue = document.getElementsByName('meta')
        dateValue = document.getElementsByName('date-send')
        nameValue = document.getElementsByName('name')
        
        for (let i = 0; i < nameValue.length; i++) {
            nameValue[i].disabled = true
        }
    
        metaButton.addEventListener("submit",(e)=>{
            e.preventDefault()
    
            metaValue = document.getElementById('meta')
            for (let i = 0; i < formValue.length; i++) {
                formValue[i].value = metaValue.value
                dateValue[i].value = fechaE.value
                meta.disabled = true
            }
            
        })
    
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].addEventListener("submit",(e)=>{
                e.preventDefault()
                
                let formulario = new FormData(checkbox[i])
    
                fetch(urlSend,{
                    method: 'POST',
                    body: formulario
                })
                .then(r => r.json())
            })
        }

    }
    
}, 2000);