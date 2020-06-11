let Pantalla = {

    //estado de la pantalla
    estado: {
        pagina: 1,
        filas: 21,
        window: 5,
        idSelecc: '',
    },

    //elementos del DOM
    divBotones: document.getElementById('paginacion'),
    contenedor: document.getElementById("contenedor"),
    inputBuscador: document.getElementById('buscador-input'),
    buscadorBtn: document.getElementById('buscador-btn'),
    header: document.getElementById('portada'),
    containerInfo: document.getElementById('container-info'),


    //metodos
    botonesPag(paginas) {
        this.divBotones.innerHTML = ''

        let maxIzq = (this.estado.pagina - Math.floor(this.estado.window / 2))
        let maxDer = (this.estado.pagina + Math.floor(this.estado.window / 2))

        if (maxIzq < 1) {
            maxIzq = 1
            maxDer = this.estado.window
        }

        if (maxDer > paginas) {
            maxIzq = paginas - (this.estado.window - 1)
            maxDer = paginas

            if (maxIzq < 1) {
                maxIzq = 1
            }
        }

        for (let nroPagina = maxIzq; nroPagina <= maxDer; nroPagina++) {
            this.divBotones.innerHTML += `<button value="${nroPagina}" class="page btn btn-sm btn-info">${nroPagina}</button>`
        }

        if (this.estado.pagina != 1) {
            this.divBotones.innerHTML = `<button value="${1}" class="page btn btn-sm btn-info">&#60; &#60;</button>` + this.divBotones.innerHTML
        }

        if (this.estado.pagina != paginas) {
            this.divBotones.innerHTML += `<button value="${paginas}" class="page btn btn-sm btn-info">&#62; &#62;</button>`
        }

        // if(this.estado.pagina == )
    },

    armarListado(imagen, ext, nombre, id) {
        let div = document.createElement('div');
        div.setAttribute("class", "col-md-3")
        div.setAttribute('id', 'div-sh')
        div.innerHTML =
            `<div class="card" id= ${id} onclick="Render.getId(this.id)">
            <img src="${imagen}.${ext}" alt= ${nombre} class="card-img-top">
                <div class="card-body">
                <h4 class="card-title">${nombre}</h4>
                </div>
            </div>`

        this.contenedor.appendChild(div)
    },

    armarDetalles(nombre, descripcion, imagen, extension, urls) {

        let divDet = document.createElement('div');
        divDet.setAttribute("class", "col-md-8")

        let divBody = document.createElement('div');
        divBody.setAttribute("class", "card-body")

        this.containerInfo.innerHTML= `
        <div class="col-md-4" id="imagen-sh">
        <img src="${imagen}.${extension}" class="card-img" alt="${nombre}">
        </div>`

        divBody.innerHTML= `<h2 class="card-title">${nombre}</h2>`
    
        if (descripcion.length > 0) {

            divBody.innerHTML +=
                `<div class="card-text"><h4>Descripción</h4>
            <p class="card-text">${descripcion}</p></div>`
        }

        if (urls.length > 0) {
            divBody.innerHTML += `<div class="card-text"><br/><h4>Links</h4></div>`

            urls.forEach(el => {
                divBody.innerHTML += `
                <a href="${el.url}" target="_blank" class="links-sh">${el.type}</a>`
            })
        }

        divDet.appendChild(divBody)
        this.containerInfo.appendChild(divDet)
    },

    mensajeError() {
        let div = document.createElement('div')
        div.innerHTML = `
        <h3>No se han encontrado superhéroes</h3>
        `
        this.contenedor.appendChild(div)
        Pantalla.inputBuscador.value = '';
        Pantalla.estado.pagina = 1
    },

    buscarSh(e){
        if(e.keyCode === 13){
            e.preventDefault();
            Pantalla.contenedor.innerHTML = ''
            Conexion.iniciarConexion();
            this.inputBuscador.value = ''
        }
    }
}

//eventos
Pantalla.buscadorBtn.addEventListener('click',()=>{
            Pantalla.contenedor.innerHTML = ''
        Conexion.iniciarConexion();
        Pantalla.inputBuscador.value = ''
} )

Pantalla.divBotones.addEventListener('click', (e) => {
    Pantalla.contenedor.innerHTML = ''
    let btnSelecc = e.target;
    // btnSelecc.setAttribute("class", "seleccionado")
    Pantalla.estado.pagina = parseInt(btnSelecc.value)
    Conexion.iniciarConexion();
})

Pantalla.header.addEventListener('click', () => {
    Pantalla.contenedor.innerHTML = ''
    Pantalla.inputBuscador.value = '';
    Pantalla.estado.pagina = 1
    Conexion.iniciarConexion();
})