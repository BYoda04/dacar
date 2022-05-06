
const measurer = document.getElementById('measurer')
const search = document.getElementById('search')
const meses = ["01","02","03","04","05","06","07","08","09","10","11","12"]

let fechaActual = new Date()

/*LOCAL STORAGE*/

let fechaVentaUno = document.getElementById('date-uno-campaña')
let fechaVentaDos = document.getElementById('date-dos-campaña')
let dataVenta = document.getElementById('data-venta')
let dataMeta = document.getElementById('data-meta')

let vendido 
let metaDiaria

fechaVentaUno.value = `${fechaActual.getFullYear()}-${meses[fechaActual.getMonth()]}-${fechaActual.getDate()<10 ? "0" + fechaActual.getDate() : fechaActual.getDate()}`

let save = JSON.parse(localStorage.getItem('datos'))


/*PORCENTAJES*/

const measurerPercent = measurer.children
const circle = measurerPercent[0].children
const circlePercent = circle[1].attributes

const textContent = measurerPercent[1].children
const textValue = textContent[0].childNodes

/*DEFAULT PERCENT*/

!function () {
    
    if (save !== null) {
        
        for (let i = 0; i < save.length; i++) {
            
            if (save[i].fecha === fechaVentaUno.value) {

                dataVenta.innerText = save[i].venta
                dataMeta.innerText = save[i].meta

                vendido = save[i].venta
                metaDiaria = save[i].meta
                
                textValue[0].nodeValue = `${((vendido/metaDiaria)*100).toFixed(1)}`

                circlePercent[3].value = `--i:${((vendido/metaDiaria)*100).toFixed(1)};`

            }
            
        }

    }

}();


/*DYNAMIC PERCENT*/

const searchPercent = (event)=> {
    event.preventDefault()

    fechaVentaUno = document.getElementById('date-uno-campaña')
    fechaVentaDos = document.getElementById('date-dos-campaña')

    if (fechaVentaDos.value !== "") {

        let i = 0
        let ventasTotal = 0
        let metaTotal = 0

        for ( i ; i < save.length; i++) {
            
            if (save[i].fecha === fechaVentaUno.value){

                for ( i ; i < save.length; i++) {

                    ventasTotal += parseInt(save[i].venta)
                    metaTotal += parseInt(save[i].meta)
                
                    if (save[i].fecha !== fechaVentaDos.value) {

                        dataVenta.innerText = ventasTotal
                        dataMeta.innerText = metaTotal

                        textValue[0].nodeValue = `${((ventasTotal/metaTotal)*100).toFixed(1)}`
    
                        circlePercent[3].value = `--i:${((ventasTotal/metaTotal)*100).toFixed(1)};`

                    }else{
                        break
                    }

                }

            }

        }

    } else {

        for (let i = 0; i < save.length; i++) {
        
            if (save[i].fecha === fechaVentaUno.value) {

                dataVenta.innerText = save[i].venta
                dataMeta.innerText = save[i].meta
                
                vendido = save[i].venta
                metaDiaria = save[i].meta
    
                textValue[0].nodeValue = `${((vendido/metaDiaria)*100).toFixed(1)}`
    
                circlePercent[3].value = `--i:${((vendido/metaDiaria)*100).toFixed(1)};`
    
            }
    
        }

    }

}

search.addEventListener("submit", e => searchPercent(e))