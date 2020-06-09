//declaración de variables globales
let urlBase = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=bc7fe627f7908e7c510adbbd29eebe78&hash=184dae0b39058edc28b190fc5cf52645'

const estado = {
    pagina: 1,
    filas: 20,
    window: 5, 
    idSelecc: '',

}

let divBotones = document.getElementById('paginacion');
let contenedor = document.getElementById("contenedor");
let inputBuscador = document.getElementById('buscador-input');
let buscadorBtn = document.getElementById('buscador-btn');
let header = document.getElementById('portada');

//info sh
let containerInfo = document.getElementById('container-info')
let divImg = document.getElementById('imagen-sh')
let divDetalles = document.getElementById('detalles-sh')

function armarUrl(pagina, nombrequery, id) {

    urlApi = urlBase

    if(id != '' && nombrequery.length == 0){
        urlApi = urlBase + `&id=${id}` 

    } else if(nombrequery != "" && id == ''){

        urlApi = urlBase + `&nameStartsWith=${nombrequery}`

    }     else 
    if(estado.pagina > 1 && nombrequery == ""){

        queryOffset = (pagina + 1) * estado.filas;
        urlApi = urlBase +`&limit=${estado.filas}&offset=${queryOffset}`
      

    } else {

        let queryOffset = 0
        urlApi = urlBase + `&limit=${estado.filas}&offset=${queryOffset}`

    }
    return urlApi

}

function conectionApi(url){
    fetch(url)
        .then((res) => res.json())
        .then((json) => {

            if (json.data.results.length == 0){

            mensajeError();
            return

            }
            else if(window.location.pathname.includes('/cliente/html/index.html')){
                renderizarLista(json.data);
                console.log(json.data)
            }
            else if(window.location.pathname.includes('/cliente/html/infoSh.html')) {
                console.log(json.data)
                renderizarDetalles(json.data);

            }
        })
}


divBotones.addEventListener('click', (e)=>{
    contenedor.innerHTML = ''
    estado.pagina = parseInt(e.target.value)
    conectionApi(armarUrl(estado.pagina, inputBuscador.value,estado.idSelecc))
})

buscadorBtn.addEventListener('click', () => {
    contenedor.innerHTML = ''
    conectionApi(armarUrl(estado.pagina, inputBuscador.value, estado.idSelecc))
    inputBuscador.value = ''})

header.addEventListener('click', ()=>{
    contenedor.innerHTML= ''
inputBuscador.value = '';
estado.pagina = 1
// estado.idSelecc = ''   
conectionApi(armarUrl(estado.pagina, inputBuscador.value, estado.idSelecc))})

function renderizarLista(listado) {
    contenedor.innerHTML = '';
    let paginas = Math.ceil(listado.total / estado.filas) 

    if(paginas > 73){
        paginas = 73
    }

    listado.results.forEach((el) => {
        armarListado(el.thumbnail.path, el.thumbnail.extension, el.name, el.id)
    })
    botonesPag(paginas)
}


function renderizarDetalles(infoSuperheroe){
    containerInfo.innerHTML = '';
    console.log(infoSuperheroe.results[0].urls)
    armarDetalles(infoSuperheroe.results[0].name, infoSuperheroe.results[0].description,infoSuperheroe.results[0].thumbnail.path, infoSuperheroe.results[0].thumbnail.extension, infoSuperheroe.results[0].urls)
}


function armarDetalles(nombre, descripcion, imagen, extension, urls){

    divImg.innerHTML= `<img src="${imagen}.${extension}" alt="${nombre}" class=".img-fluid">`

    divDetalles.innerHTML = 
    // <span><i class="fa fa-star" id="star" onclick="agregarFavorito(this.id)"></i>
    // </span>
    `
    <div>
    <h2>${nombre}</h2>
    </div>` 

    if(descripcion.length > 0){

        divDetalles.innerHTML += 
        `    <h4>Descripción</h4>
        <p>${descripcion}</p>`
    }

    let divUrls = document.createElement('div')
    
    if (urls.length > 0){
        divUrls.innerHTML = `<h4>Links</h4>`

        urls.forEach(el=>{
            divUrls.innerHTML += `
            <a href="${el.url}" target="_blank">${el.type}</a>
            `
            divDetalles.appendChild(divUrls)
        })
    }

    containerInfo.appendChild(divImg);
    containerInfo.appendChild(divDetalles)
}

function mensajeError(){
    let div = document.createElement('div')
    div.innerHTML= `
    <h3>No se han encontrado superhéroes</h3>
    `
    contenedor.appendChild(div)
}

function getId(clicked_id){

        window.localStorage.setItem('idSuperheroe', clicked_id)
        location.href='/cliente/html/infoSh.html'
};

// function agregarFavorito(idSuperheroe){
// console.log(idSuperheroe)
// }


function armarListado(imagen, ext, nombre,id) {
    let div = document.createElement('div');
    div.setAttribute("class", "col-md-6")
    div.innerHTML = 
    // `<span><i class="fa fa-star" id="star" onclick="agregarFavorito(this.id)"></i> </span>
        `<button id=${id} class="Sh-elegido" onclick="getId(this.id)">
            <img src="${imagen}.${ext}" alt= ${nombre} class= ".img-fluid">
            <h4>${nombre}</h4>
        
        </button>`

    contenedor.appendChild(div)

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
}