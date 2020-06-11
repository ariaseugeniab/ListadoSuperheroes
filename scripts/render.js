let Render ={

    renderizarLista(listado) {
        Pantalla.contenedor.innerHTML = '';
        let paginas = Math.ceil(listado.total / Pantalla.estado.filas)

        if (paginas > 70) {
            paginas = 70
        }

        listado.results.forEach((el) => {
            Pantalla.armarListado(el.thumbnail.path, el.thumbnail.extension, el.name, el.id)
        })
        Pantalla.botonesPag(paginas)
    },

    renderizarDetalles(infoSuperheroe) {
        Pantalla.containerInfo.innerHTML = '';
        // console.log(infoSuperheroe.results[0].urls)
        Pantalla.armarDetalles(infoSuperheroe.results[0].name, infoSuperheroe.results[0].description, infoSuperheroe.results[0].thumbnail.path, infoSuperheroe.results[0].thumbnail.extension, infoSuperheroe.results[0].urls)
    },

    getId(clicked_id) {

        window.localStorage.setItem('idSuperheroe', clicked_id)
        location.href = 'html/infoSh.html'
    }
}