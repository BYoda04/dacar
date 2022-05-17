
const form = document.getElementById('form')
const movil = document.getElementById('movil')
const hogar = document.getElementById('hogar')
const searchS = document.getElementById('search-sup')
const searchAsr = document.getElementById('search-asr')
const mesAdmin = ["01","02","03","04","05","06","07","08","09","10","11","12"]
const fechaAdmin = document.getElementById('date')

let urlSA = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-sup/API-sup.php"
let urlA = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-asesores/API-asesores.php"

let supervisorAsesor
let asesorS
let optionS
let asesorList
let formdate
let edit = true
let actualDate = new Date()



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

setTimeout(() => {
    for (let i = 0; i < supervisorAsesor.items.length; i++) {
        optionS += `<option value="${supervisorAsesor.items[i].id_sup}">${supervisorAsesor.items[i].nom_sup}</option>`
    }
    
    searchS.innerHTML = optionS

    fechaAdmin.value = `${actualDate.getFullYear()}-${mesAdmin[actualDate.getMonth()]}-${actualDate.getDate()<10 ? "0" + actualDate.getDate() : actualDate.getDate()}`
}, 500)


searchAsr.addEventListener("click",(e)=>{
    e.preventDefault()

    for (let i = 0; i < supervisorAsesor.items.length; i++) {
        if (parseInt(searchS.value)===supervisorAsesor.items[i].id_sup) {
            console.log(parseInt(searchS.value))
            console.log(supervisorAsesor.items[i].id_sup)
        }
    }
})


    



