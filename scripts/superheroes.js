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
let star = document.getElementById('star')


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

    // console.log(pagina, nombrequery,id)
    // console.log(estado)
    return urlApi

}

function conectionApi(url){
    fetch(url)
        .then((res) => res.json())
        .then((json) => {

            if(window.location.pathname.includes('/cliente/html/index.html')){
                renderizarLista(json.data);
            }
            else if(window.location.pathname.includes('/cliente/html/infoSh.html')) {
                console.log(json.data)
                // console.log(estado)
                renderizarDetalles(json.data);
                // return true

            }

            // console.log(json.data)
            // estado.respuesta = json.data
        })
}


// conectionApi(armarUrl(estado.pagina, inputBuscador.value, estado.idSelecc))

divBotones.addEventListener('click', (e)=>{
    contenedor.innerHTML = ''
    estado.pagina = parseInt(e.target.value)
    conectionApi(armarUrl(estado.pagina, inputBuscador.value,estado.idSelecc))
    // console.log(estado)
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

star.addEventListener('click', (e)=>{

})

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
    armarDetalles(infoSuperheroe.results[0].name, infoSuperheroe.results[0].description,infoSuperheroe.results[0].thumbnail.path, infoSuperheroe.results[0].thumbnail.extension)
}


function armarDetalles(nombre, descripcion, imagen, extension){
    // let divImg = document.getElementById('imagen-sh')
    // let divDetalles = document.getElementById('detalles-sh')

    divImg.innerHTML= `<img src="${imagen}.${extension}" alt="${nombre}" class=".img-fluid">`
    // console.log(imagen, extension)

    divDetalles.innerHTML = `<span>
    <i class="fa fa-star" id="star"></i>
    <h2>${nombre}</h2>
    <h3>Descripción</h3>
    <p>${descripcion}</p>
    </span>` 

    containerInfo.appendChild(divImg);
    containerInfo.appendChild(divDetalles)

}



function getId(clicked_id){
         estado.idSelecc = parseInt(clicked_id)
        //  console.log(estado.idSelecc)
        // setTimeout(),1000)
        conectionApi(armarUrl(estado.pagina, inputBuscador.value, parseInt(clicked_id)))

        location.href='/cliente/html/infoSh.html'
        // console.log(estado)
        //  renderizarDetalles()
}



function armarListado(imagen, ext, nombre,id) {
    let img = document.createElement('img');
    let div = document.createElement('div')
    let btn = document.createElement('button');
    btn.setAttribute("id", `${id}`);
    btn.setAttribute("class", "Sh-elegido")
    btn.setAttribute("onclick", "getId(this.id)")
    img.setAttribute("src", `${imagen}.${ext}`)
    img.setAttribute("alt", nombre);
    img.setAttribute("class", ".img-fluid")
    // img.setAttribute("id", "Sh")
    div.setAttribute("class", "col-6")
    div.innerHTML =`${nombre} <i class="fa fa-star" id="star"></i>`
    btn.appendChild(div)
    btn.appendChild(img)
    contenedor.appendChild(btn)
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