//variables globales
// const inputBuscador = document.getElementById('buscador-input');
// const buscadorBtn = document.getElementById('buscador-btn');
let resultados
// let datosPrueba = require('../scripts/prueba.json')

// const obtenerResults = async() => {

//     const res = await fetch('../scripts/prueba.json');
//     resultados = await res.json();

// }

function buscarNombre(valueInput){

    console.log(resultados)

    let matches = resultados.filter(el => {
        let expReg = new RegExp(`^${valueInput}`,'gi');
        return el.data.results.match(expReg)
    })

    if(valueInput.length === 0){
        matches = []
        contenedor.innerHTML = ''
    }

    // console.log(matches)
    autocompletarHtml(matches)
    inputBuscador.value = ''
}

function autocompletarHtml(coincidencias){

    if (coincidencias.length > 0){
        let html = coincidencias.map(item =>`
        <div class="card card-body mb-1">
        <h4>${item.name}</h4>
        </div>`
            ).join('');

        contenedor.innerHTML = html
    }
}

// inputBuscador.addEventListener('input', consultarSuperheroes(0, inputBuscador.value))
