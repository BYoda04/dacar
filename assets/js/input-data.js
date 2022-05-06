
let fechaEnviar = document.getElementById('date')

const meses = ["01","02","03","04","05","06","07","08","09","10","11","12"]

let fechaActual = new Date()

fechaEnviar.value = `${fechaActual.getFullYear()}-${meses[fechaActual.getMonth()]}-${fechaActual.getDate()<10 ? "0" + fechaActual.getDate() : fechaActual.getDate()}`

/*FUNCTION*/ 

/* let save = JSON.parse(localStorage.getItem('datos')) */

const storageFormulario = (fecha,ventas,metas) =>{

    /*LOCCAL STORAGE SAVE*/ 
    datos.push(
        {
            fecha: fecha,
            venta: ventas,
            meta: metas,
        }
    )

    /* localStorage.setItem('datos', JSON.stringify(datos)) */

}



/* const agregarFormulario = (fecha,ventas,metas)=>{

    formularioData.innerHTML += `
            <div class="formularios">
                <p>${fecha}</p>
            </div>
            <div class="formularios">
                <p>${ventas}</p>
            </div>
            <div class="formularios">
                <p>${metas}</p>
            </div>
            <div class="formularios edit">
                <ion-icon name="pencil-outline"></ion-icon>
            </div>
    `

} */



/* function formulario (event){
    event.preventDefault()
    
    fechaEnviar = document.getElementById('date')

    number = document.getElementById('number')
    meta = document.getElementById('meta')

    storageFormulario(fechaEnviar.value,number.value,meta.value)

    agregarFormulario(fechaEnviar.value,number.value,meta.value)

} */

/*SAVE DATA*/

/* cantidadEnviar.addEventListener("submit", e => formulario(e)) */

/*DATOS SAVE*/

/* !function () {

    if (save !== null) {
     
        for (let i = 0; i < save.length; i++) {
        
            datos.push(save[i])
        
        }
    
        for (let i = 0; i < datos.length; i++) {
    
            agregarFormulario(datos[i].fecha,datos[i].venta,datos[i].meta)
    
        }
    
    }

}(); */