const measurer = document.getElementById('measurer')
const search = document.getElementById('search')
const month = ["01","02","03","04","05","06","07","08","09","10","11","12"]

let fechaActualGraphics = new Date()

/*ELEMENTS HTML*/

//API PHP
let url = "../../DACARTELECOM-SISTEMA-DE-VENTAS/includes/API-graphics/API-datos.php"

let fechaVentaUno = document.getElementById('date-uno-campaña')
let fechaVentaDos = document.getElementById('date-dos-campaña')
let dataVenta = document.getElementById('data-venta')
let dataMeta = document.getElementById('data-meta')

let vendido 
let metaDiaria
let save = {}

fechaVentaUno.value = `${fechaActualGraphics.getFullYear()}-${month[fechaActualGraphics.getMonth()]}-${fechaActualGraphics.getDate()<10 ? "0" + fechaActualGraphics.getDate() : fechaActualGraphics.getDate()}`

/*PORCENTAJES*/

const measurerPercent = measurer.children
const circle = measurerPercent[0].children
const circlePercent = circle[1].attributes

const textContent = measurerPercent[1].children
const textValue = textContent[0].childNodes

let respuesta

fetch(url)
.then(r=> r.json())
.then(r=>{
    save = r
    console.log(save.items.length);
})

document.addEventListener("DOMContentLoaded", e)


