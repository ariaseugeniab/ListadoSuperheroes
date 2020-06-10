let Pantalla = {

    //estado de la pantalla
    estado: {
        pagina: 1,
        filas: 20,
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
    divImg: document.getElementById('imagen-sh'),
    divDetalles: document.getElementById('detalles-sh'),

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
    },

    armarListado(imagen, ext, nombre, id) {
        let div = document.createElement('div');
        div.setAttribute("class", "card")
        div.setAttribute('id', 'div-sh')
        div.innerHTML =
            // `<span onclick="agregarFavorito(this.id)"><i class="fa fa-star"></i> </span>
            `<img src="${imagen}.${ext}" alt= ${nombre} class= "card-img-top">
            <div class="card-body" id= ${id} onclick="Render.getId(this.id)">
                <h4 class="card-title">${nombre}</h4>
            <div>`

        this.contenedor.appendChild(div)
    },

    armarDetalles(nombre, descripcion, imagen, extension, urls) {

        this.divImg.innerHTML = `<img src="${imagen}.${extension}" alt="${nombre}" class=".img-fluid">`

        this.containerInfo.innerHTML =
            // <span onclick="agregarFavorito(this.id)"><i class="fa fa-star"></i>
            // </span>
            `<h2>${nombre}</h2>`

        if (descripcion.length > 0) {

            this.divDetalles.innerHTML +=
                `    <h4>Descripción</h4>
            <p>${descripcion}</p>`
        }

        let divUrls = document.createElement('div')

        if (urls.length > 0) {
            divUrls.innerHTML = `<h4>Links</h4>`

            urls.forEach(el => {
                divUrls.innerHTML += `
                <a href="${el.url}" target="_blank">${el.type}</a>
                `
                this.divDetalles.appendChild(divUrls)
            })
        }

        this.containerInfo.appendChild(this.divImg);
        this.containerInfo.appendChild(this.divDetalles)
    },

    mensajeError() {
        let div = document.createElement('div')
        div.innerHTML = `
        <h3>No se han encontrado superhéroes</h3>
        `
        this.contenedor.appendChild(div)
    },

}

//eventos
Pantalla.buscadorBtn.addEventListener('click', () => {
    Pantalla.contenedor.innerHTML = ''
    Conexion.iniciarConexion();
    Pantalla.inputBuscador.value = ''
})

Pantalla.divBotones.addEventListener('click', (e) => {
    Pantalla.contenedor.innerHTML = ''
    Pantalla.estado.pagina = parseInt(e.target.value)
    Conexion.iniciarConexion();
})

Pantalla.header.addEventListener('click', () => {
    Pantalla.contenedor.innerHTML = ''
    Pantalla.inputBuscador.value = '';
    Pantalla.estado.pagina = 1
    Conexion.iniciarConexion();
    // location.href = '../index.html'
})