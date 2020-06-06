//declaración de variables globales
let urlApi = 'https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=100&ts=1&apikey=bc7fe627f7908e7c510adbbd29eebe78&hash=184dae0b39058edc28b190fc5cf52645'
let offset = '&offset='
urlApi += offset

let contenedor = document.getElementById("contenedor");
let divBotones = document.getElementById('paginacion');

let estado = {
    pagina: 1,
    filas: 20,
    window: 5
}

var posicion

const SH = {
    render: () => {
        fetch(urlApi)
        .then((res) => res.json())
        .then((json)=>{
            //guardamos los resultados en un array
            console.log(json.data)

            let resultsSH = json.data.results
            let offset = '&offset=0'

            //
            function renderizarLista(){
                posicion = paginacion(resultsSH, estado.pagina, estado.filas)
                posicion.queryset.forEach((el) => {
                    armarListado(el.thumbnail.path, el.thumbnail.extension, el.name)
                })
                botonesPag(posicion.paginas)
            }

            renderizarLista()

            divBotones.addEventListener('click', (e)=>{
                contenedor.innerHTML = ''
                estado.pagina = parseInt(e.target.value)
                renderizarLista()
                
                // console.log( posicion.queryset)

                if(estado.pagina = 6){
                   offset = peticionPaginada()
                   urlApi += offset 

                       console.log('la url es ' + urlApi)
                    //    SH.render()
                
                }
            })
            
        })
    }
}

SH.render();

function armarListado(imagen, ext, nombre){
    let img = document.createElement('img');
    let div = document.createElement('div')
    let btn = document.createElement('button');
    img.setAttribute("src", `${imagen}.${ext}`)
    img.setAttribute("alt", nombre);
    img.setAttribute("class", ".img-fluid")
    img.setAttribute("id", "Sh")
    div.setAttribute("class", "col-6")

    // img.setAttribute({
    //     "src": `${imagen}.${ext}`,
    //     "alt": nombre,
    //     "class": ".img-fluid",
    //     "id": "Sh"
    // })
    div.innerHTML = nombre
    btn.appendChild(div)
    btn.appendChild(img)
    contenedor.appendChild(btn)
    
}

function paginacion(queryset, pagina, filas){
    let puntoInicio = (pagina -1) * filas
    let puntoFinal = puntoInicio + filas
    let cantidadResp = queryset.slice(puntoInicio, puntoFinal)
    let paginas = Math.ceil(1493 / filas)

    return {
        queryset: cantidadResp,
        paginas: paginas
    }

}

function botonesPag(paginas){
    divBotones.innerHTML = ''

    let maxIzq = (estado.pagina - Math.floor(estado.window /2))
    let maxDer = (estado.pagina + Math.floor(estado.window / 2))

    if(maxIzq < 1){
        maxIzq = 1
        maxDer = estado.window
    }

    if(maxDer > paginas){
        maxIzq = paginas - (estado.window - 1)
        maxDer = paginas

        if(maxIzq < 1){
            maxIzq = 1
        }
    }

    for(let nroPagina = maxIzq; nroPagina <= maxDer; nroPagina ++){
        divBotones.innerHTML += `<button value="${nroPagina}" class="page btn btn-sm btn-info">${nroPagina}</button>`
    }

    if(estado.pagina != 1){
        divBotones.innerHTML = `<button value="${1}" class="page btn btn-sm btn-info">&#60; &#60;</button>` + divBotones.innerHTML
    }
    
    if(estado.pagina != paginas){
        divBotones.innerHTML += `<button value="${paginas}" class="page btn btn-sm btn-info">&#62; &#62;</button>`
    }
    // paginas.forEach( () =>{
    //     let nroPagina = 1
    //     divBotones.innerHTML += `<button value="${nroPagina}">${nroPagina}</button>`
    //     nroPagina ++
    //     })
}

function peticionPaginada(){
    let cantidad = 20

    if(estado.pagina >= 5){
        cantidad += (estado.pagina)* 20
    }

    return '&offset='+ cantidad
}


/*
`${el.thumbnail.path}.${el.thumbnail.extension}`

function render() {
        fetch(URLAPI)
        .then((res) => res.json())
        .then((json)=>{
            let img = document.createElement('img');
    img.setAttribute("src",`${json.data.results[0].thumbnail.path}.${json.data.results[0].thumbnail.extension}`)
contenedor.appendChild(img)

        })
    }
*/