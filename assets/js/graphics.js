
const measurer = document.getElementById('measurer')
const search = document.getElementById('search')
const month = ["01","02","03","04","05","06","07","08","09","10","11","12"]

let fechaActualGraphics = new Date()

/*ELEMENTS HTML*/

//API PHP
let url = "../../dacartelecom-sistema-de-ventas/includes/API-graphics/API-datos.php"

let fechaVentaUno = document.getElementById('date-uno-campaña')
let fechaVentaDos = document.getElementById('date-dos-campaña')
let dataVenta = document.getElementById('data-venta')
let dataMeta = document.getElementById('data-meta')

let vendido 
let metaDiaria
let save 

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
.then((respuesta)=>{

    save = respuesta

    /*DEFAULT PERCENT*/

    !function () {
        
        if (save !== null) {
            
            for (let i = 0; i < (save.items).length; i++) {
                
                if (save.items[i].date === fechaVentaUno.value) {

                    dataVenta.innerText = save.items[i].sales
                    dataMeta.innerText = save.items[i].goal

                    vendido = save.items[i].sales
                    metaDiaria = save.items[i].goal
                    
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

            let fechaUno = (fechaVentaUno.value).split('-')
            let fechaDos = (fechaVentaDos.value).split('-')

            if (parseInt(fechaDos[2]) > parseInt(fechaUno[2])) {
                
                let i = 0
                let ventasTotal = 0
                let metaTotal = 0

                for ( i ; i < (save.items).length; i++) {
                    
                    if (save.items[i].date === fechaVentaUno.value){

                        for ( i ; i < (save.items).length; i++) {

                            ventasTotal += parseInt(save.items[i].sales)
                            metaTotal += parseInt(save.items[i].goal)
                        
                            if (save.items[i].date !== fechaVentaDos.value) {

                                dataVenta.innerText = ventasTotal
                                dataMeta.innerText = metaTotal

                                textValue[0].nodeValue = `${((ventasTotal/metaTotal)*100).toFixed(1)}`
            
                                circlePercent[3].value = `--i:${((ventasTotal/metaTotal)*100).toFixed(1)};`

                            }else if(save.items[i].date === fechaVentaDos.value){
                                
                                dataVenta.innerText = ventasTotal
                                dataMeta.innerText = metaTotal

                                textValue[0].nodeValue = `${((ventasTotal/metaTotal)*100).toFixed(1)}`
            
                                circlePercent[3].value = `--i:${((ventasTotal/metaTotal)*100).toFixed(1)};`

                                break
                            }

                        }

                    }

                }

            }

        } else {

            for (let i = 0; i < (save.items).length; i++) {
            
                if (save.items[i].date === fechaVentaUno.value) {

                    dataVenta.innerText = save.items[i].sales
                    dataMeta.innerText = save.items[i].goal
                    
                    vendido = save.items[i].sales
                    metaDiaria = save.items[i].goal
        
                    textValue[0].nodeValue = `${((vendido/metaDiaria)*100).toFixed(1)}`
        
                    circlePercent[3].value = `--i:${((vendido/metaDiaria)*100).toFixed(1)};`
        
                }
        
            }

        }

    }

    search.addEventListener("submit", e => searchPercent(e))

})


