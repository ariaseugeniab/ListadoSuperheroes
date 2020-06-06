let estado = {
    pagina: 1,
    filas: 20,
    window: 5,
    divBotones: document.getElementById('paginacion'),
    contenedor: document.getElementById("contenedor"),
    inputBuscador: document.getElementById('buscador-input'),
    buscadorBtn: document.getElementById('buscador-btn'),
    header: document.getElementById('portada'),

    //metodos
    botonesPag(paginas) {
        this.divBotones.innerHTML = ''

        let maxIzq = (this.pagina - Math.floor(this.window / 2))
        let maxDer = (this.pagina + Math.floor(this.window / 2))

        if (maxIzq < 1) {
            maxIzq = 1
            maxDer = this.window
        }

        if (maxDer > paginas) {
            maxIzq = paginas - (this.window - 1)
            maxDer = paginas

            if (maxIzq < 1) {
                maxIzq = 1
            }
        }

        for (let nroPagina = maxIzq; nroPagina <= maxDer; nroPagina++) {
            this.divBotones.innerHTML += `<button value="${nroPagina}" class="page btn btn-sm btn-info">${nroPagina}</button>`
        }

        if (this.pagina != 1) {
            this.divBotones.innerHTML = `<button value="${1}" class="page btn btn-sm btn-info">&#60; &#60;</button>` + this.divBotones.innerHTML
        }

        if (this.pagina != paginas) {
            this.divBotones.innerHTML += `<button value="${paginas}" class="page btn btn-sm btn-info">&#62; &#62;</button>`
        }
    },

    renderizarLista(listado) {
        this.contenedor.innerHTML = '';
        let paginas = Math.ceil(listado.total / this.filas)

        if (paginas > 73) {
            paginas = 73
        }

        listado.results.forEach((el) => {
            this.armarListado(el.thumbnail.path, el.thumbnail.extension, el.name, el.id)
        })
        this.botonesPag(paginas)
    },

    armarListado(imagen, ext, nombre, id) {
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
        div.innerHTML = `${nombre} <i class="fa fa-star" id="star"></i>`
        btn.appendChild(div)
        btn.appendChild(img)
        this.contenedor.appendChild(btn)
    },
}

//eventos
estado.buscadorBtn.addEventListener('click', () => {
    estado.contenedor.innerHTML = ''
    conexion.conectar(estado.pagina, estado.inputBuscador.value, '', estado.renderizarLista)
    estado.inputBuscador.value = ''
})

estado.header.addEventListener('click', () => {
    estado.contenedor.innerHTML = ''
    estado.inputBuscador.value = '';
    estado.pagina = 1
    conexion.conectar(estado.pagina, estado.inputBuscador.value, '', estado.renderizarLista)
})

estado.divBotones.addEventListener('click', (e)=>{
    estado.contenedor.innerHTML = ''
    estado.pagina = parseInt(e.target.value)
    conexion.conectar(estado.pagina, estado.inputBuscador.value, '',estado.renderizarLista)
    // renderAll()
    // console.log(estado)
})

//este solo se usa en el index.html