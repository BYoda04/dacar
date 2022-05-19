const formAccount = document.getElementById('form-account')
const create = document.getElementById('create')
const delet = document.getElementById('delete')

let urlCamp = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-camp/API-camp.php"
let urlTurn = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-turn/API-turn.php"
let urlSup = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-sup/API-sup.php"
let urlAsesorAccount = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-asesores/API-asesores.php"
let createSupervisor
let createAsesor
let deletSupervisor
let deletAsesor
let searchAsesor
let asesorContainer
let camp
let turn
let sup
let newSup
let asr
let campanas 
let turno
let supervisor
let asesor 
let optionsCamp
let optionsTurn
let optionsSup
let optionsAsesor

fetch(urlCamp)
.then(r=>r.json())
.then(r=>{

    campanas = r

})

fetch(urlTurn)
.then(r=>r.json())
.then(r=>{

    turno = r

})

fetch(urlSup)
.then(r=>r.json())
.then(r=>{

    supervisor = r

})

fetch(urlAsesorAccount)
.then(r=>r.json())
.then(r=>{

    asesor = r

})


create.addEventListener("click",()=>{
    formAccount.innerHTML = `<div class="button-container">
            <div class="button">
                <div class="icon" id="create-supervisor"><ion-icon name="eye-outline"></ion-icon></div>
                <h2>Crear supervisor</h2>
            </div>
            <div class="button">
                <div class="icon" id="create-asesor"><ion-icon name="call-outline"></ion-icon></div>
                <h2>Crear asesor</h2>
            </div>
        </div>`

    createSupervisor = document.getElementById('create-supervisor')
    createAsesor = document.getElementById('create-asesor')  
    
    
    createSupervisor.addEventListener("click",()=>{

        for (let i = 0; i < campanas.items.length; i++) {
            optionsCamp += `<option value="${campanas.items[i].camp}">${campanas.items[i].camp}</option>`
        }

        for (let i = 0; i < turno.items.length; i++) {
            optionsTurn += `<option value="${turno.items[i].turno}">${turno.items[i].turno}</option>`
        }

        formAccount.innerHTML = `<div class="cards">
                <form method="POST" action="./includes/account/create-sup/create-supervisor.php">
                    <div>
                        <img src="./assets/img/dacartelecom-logo.webp" alt="dacartelecom">
                        <div>
                            <h2>Crear Supervisor</h2>
                            <p>Nombre de usuario: <br>
                            <input type="text" name="username"></p>
                            <p>Password: <br>
                            <input type="password" name="password"></p>
                            <p>Campaña</p>
                            <select name="camp" id="campaña">

                            </select>
                            <p>Turno</p>
                            <select name="turn" id="turno">
                                
                            </select>
                            <p class="center"><input type="submit" value="Crear"></p>
                        </div>
                    </div>
                </form>
            </div>`

            camp =document.getElementById('campaña')
            turn = document.getElementById('turno')

            camp.innerHTML = optionsCamp
            turn.innerHTML = optionsTurn
    })

    createAsesor.addEventListener("click",()=>{

        for (let i = 0; i < supervisor.items.length; i++) {
            optionsSup += `<option value="${supervisor.items[i].id_sup}">${supervisor.items[i].nom_sup}</option>`
        }

        formAccount.innerHTML = `<div class="cards">
                <form method="POST" action="./includes/account/create-asesor/create-asesor.php">
                    <div>
                        <img src="./assets/img/dacartelecom-logo.webp" alt="dacartelecom">
                        <div>
                            <h2>Crear Asesor</h2>
                            <p>Nombre de asesor: <br>
                            <input type="text" name="username"></p>
                            <p>Supervisor: <br>
                            <select name="sup" id="sup">
                                
                            </select></p>
                            <p class="center"><input type="submit" value="Crear"></p>
                        </div>
                    </div>
                </form>
            </div>`

            sup =document.getElementById('sup')

            sup.innerHTML = optionsSup
    })

})

delet.addEventListener("click",()=>{
    formAccount.innerHTML = `<div class="button-container">
            <div class="button">
                <div class="icon" id="delete-supervisor"><ion-icon name="eye-outline"></ion-icon></div>
                <h2>Eliminar supervisor</h2>
            </div>
            <div class="button">
                <div class="icon" id="delete-asesor"><ion-icon name="call-outline"></ion-icon></div>
                <h2>Eliminar asesor</h2>
            </div>
        </div>`
    
    deletSupervisor = document.getElementById('delete-supervisor')
    deletAsesor = document.getElementById('delete-asesor')

    deletSupervisor.addEventListener("click",()=>{

        for (let i = 0; i < supervisor.items.length; i++) {
            optionsSup += `<option value="${supervisor.items[i].id_sup}">${supervisor.items[i].nom_sup}</option>`
        }

        formAccount.innerHTML = `<div class="cards">
                <form method="POST" action="./includes/account/delete-sup/delete-sup.php">
                    <div>
                        <img src="./assets/img/dacartelecom-logo.webp" alt="dacartelecom">
                        <div>
                            <h2>Eliminar Supervisor</h2>
                            <p>Supervisor: <br>
                            <select name="sup" id="sup">
                                
                            </select></p>
                            <p>Nuevo supervisor: <br>
                            <select name="new-sup" id="new-sup">
                                
                            </select></p>
                            <p class="center"><input type="submit" value="Eliminar"></p>
                        </div>
                    </div>
                </form>
            </div>`

            sup = document.getElementById('sup')
            newSup = document.getElementById('new-sup')

            sup.innerHTML = optionsSup
            newSup.innerHTML = optionsSup
    })

    deletAsesor.addEventListener("click",()=>{
        for (let i = 0; i < supervisor.items.length; i++) {
            optionsSup += `<option value="${supervisor.items[i].id_sup}">${supervisor.items[i].nom_sup}</option>`
        }

        formAccount.innerHTML = `<div class="cards">
                <form method="POST" action="./includes/account/delete-asesor/delete-asesor.php">
                    <div>
                        <img src="./assets/img/dacartelecom-logo.webp" alt="dacartelecom">
                        <div>
                            <h2>Eliminar Asesor</h2>
                            <p>Supervisor: <br>
                            <select name="sup" id="sup">
                                
                            </select><br>
                            <ion-icon name="search-outline" id="search-asesor"></ion-icon></p>
                            <div id="asesor-container">
                                
                            </div>
                        </div>
                    </div>
                </form>
            </div>`

            sup = document.getElementById('sup')
            sup.innerHTML = optionsSup

            searchAsesor = document.getElementById('search-asesor')
            asesorContainer = document.getElementById('asesor-container')

            searchAsesor.addEventListener("click",e=>{
                e.preventDefault()

                optionsAsesor = null

                asesorContainer.innerHTML = `<p>Asesor: <br>
                                    <select name="asesor" id="asesor">
                                    
                                    </select></p>
                                <p class="center"><input type="submit" value="Eliminar"></p>`

                for (let i = 0; i < asesor.items.length; i++) {
                    if (parseInt(sup.value) === asesor.items[i].cod_sup) {
                        if (asesor.items[i].sate !== 2) {
                            optionsAsesor += `<option value="${asesor.items[i].id_asesor}">${asesor.items[i].asesor}</option>`
                        }
                    }
                }

                asr = document.getElementById('asesor')
                asr.innerHTML = optionsAsesor
                
            })
    })
})
