let Conexion = {
    urlBase: 'https://gateway.marvel.com:443/v1/public/characters?orderBy=name&ts=1&apikey=bc7fe627f7908e7c510adbbd29eebe78&hash=184dae0b39058edc28b190fc5cf52645',

    armarUrl(pagina, nombrequery, id){

        urlApi = this.urlBase

        if(id != '' && nombrequery.length == 0){
            urlApi = this.urlBase + `&id=${id}` 
    
        } else if(nombrequery != "" && id == ''){
    
            urlApi = this.urlBase + `&nameStartsWith=${nombrequery}`
    
        }     else 
        if(Pantalla.estado.pagina > 1 && nombrequery == ""){
    
            queryOffset = (pagina + 1) * Pantalla.estado.filas;
            urlApi = this.urlBase +`&limit=${Pantalla.estado.filas}&offset=${queryOffset}`
          
    
        } else {
    
            let queryOffset = 0
            urlApi = this.urlBase + `&limit=${Pantalla.estado.filas}&offset=${queryOffset}`
    
        }
        return urlApi
    },

    conectionApi(url){
        fetch(url)
        .then((res) => res.json())
        .then((json) => {

            if (json.data.results.length == 0){

            Pantalla.mensajeError();
            return

            }
            else if(window.location.pathname.includes('index.html')){
                Render.renderizarLista(json.data);
                console.log(json.data)
            }
            else if(window.location.pathname.includes('infoSh.html')) {
                console.log(json.data)
                Render.renderizarDetalles(json.data);

            }
        })

    },

    iniciarConexion(){
        this.conectionApi(this.armarUrl(Pantalla.estado.pagina, Pantalla.inputBuscador.value, Pantalla.estado.idSelecc))
    }

}


