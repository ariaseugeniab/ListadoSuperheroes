let Pantalla = {
    estado: {
        pagina: 1,
        filas: 20,
        window: 5,
        idSelecc: '',
    },

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

    renderizarLista(listado) {
        this.contenedor.innerHTML = '';
        let paginas = Math.ceil(listado.total / this.estado.filas)

        if (paginas > 73) {
            paginas = 73
        }

        listado.results.forEach((el) => {
            this.armarListado(el.thumbnail.path, el.thumbnail.extension, el.name, el.id)
        })
        this.botonesPag(paginas)
    },

    renderizarDetalles(infoSuperheroe) {
        this.containerInfo.innerHTML = '';
        // console.log(infoSuperheroe.results[0].urls)
        this.armarDetalles(infoSuperheroe.results[0].name, infoSuperheroe.results[0].description, infoSuperheroe.results[0].thumbnail.path, infoSuperheroe.results[0].thumbnail.extension, infoSuperheroe.results[0].urls)
    },

    armarListado(imagen, ext, nombre, id) {
        let div = document.createElement('div');
        div.setAttribute("class", "col-md-6")
        div.innerHTML =
            // `<span><i class="fa fa-star" id="star" onclick="agregarFavorito(this.id)"></i> </span>
            `<button id=${id} class="Sh-elegido" onclick="Pantalla.getId(this.id)">
                <img src="${imagen}.${ext}" alt= ${nombre} class= ".img-fluid">
                <h4>${nombre}</h4>
            
            </button>`

        this.contenedor.appendChild(div)
    },

    armarDetalles(nombre, descripcion, imagen, extension, urls) {

        this.divImg.innerHTML = `<img src="${imagen}.${extension}" alt="${nombre}" class=".img-fluid">`

        this.divDetalles.innerHTML =
            // <span><i class="fa fa-star" id="star" onclick="agregarFavorito(this.id)"></i>
            // </span>
            `
        <div>
        <h2>${nombre}</h2>
        </div>`

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

    getId(clicked_id) {

        window.localStorage.setItem('idSuperheroe', clicked_id)
        location.href = '/cliente/html/infoSh.html'
    }

}

//eventos
Pantalla.buscadorBtn.addEventListener('click', () => {
    Pantalla.contenedor.innerHTML = ''
    Conexion.conectionApi(Conexion.armarUrl(Pantalla.estado.pagina, Pantalla.inputBuscador.value, Pantalla.estado.idSelecc))
    Pantalla.inputBuscador.value = ''
})

Pantalla.divBotones.addEventListener('click', (e) => {
    Pantalla.contenedor.innerHTML = ''
    Pantalla.estado.pagina = parseInt(e.target.value)
    Conexion.conectionApi(Conexion.armarUrl(Pantalla.estado.pagina, Pantalla.inputBuscador.value, Pantalla.estado.idSelecc))
})

Pantalla.header.addEventListener('click', () => {
    Pantalla.contenedor.innerHTML = ''
    Pantalla.inputBuscador.value = '';
    Pantalla.estado.pagina = 1
    Conexion.conectionApi(Conexion.armarUrl(Pantalla.estado.pagina, Pantalla.inputBuscador.value, Pantalla.estado.idSelecc))
})