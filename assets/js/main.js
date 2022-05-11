const toggle = document.getElementById('toggle')
const settings = document.getElementById('settings-description')
const rol = document.getElementById('rol')

let urlRol = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-rol/API-rol.php"
let roles 

fetch(urlRol)
.then(r=>r.json())
.then(r=>{

    roles = r

    /*VALIDACION DE ROLES*/
    setTimeout(() => {

        if (roles.items !== undefined) {

            for (let i = 0; i < roles.items.length; i++) {
                
                if (roles.items[i].id_rol === parseInt(rol.innerHTML)) {
                    
                    rol.innerHTML = roles.items[i].rol

                }
                
            }
            
        } else {
            console.alert("API error")
        }
        
    }, 1000);

})

toggle.addEventListener("click",()=>{
    settings.classList.toggle('active')
})
