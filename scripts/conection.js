let conexion = {
    urlBase: 'https://gateway.marvel.com:443/v1/public/characters?orderBy=name&ts=1&apikey=bc7fe627f7908e7c510adbbd29eebe78&hash=184dae0b39058edc28b190fc5cf52645',

    respuestaApi:'',
    pantallaInicio:'',

    armarUrl(pagina, nombrequery, id){

    urlApi = this.urlBase

    if(id != '' && nombrequery.length == 0){
        urlApi = this.urlBase + `&id=${id}` 

    } else if(nombrequery != ""){

        urlApi = this.urlBase + `&nameStartsWith=${nombrequery}`

    }     
    else if(estado.pagina > 1 && nombrequery == ""){

        queryOffset = (pagina + 1) * estado.filas;
        urlApi = this.urlBase +`&limit=${estado.filas}&offset=${queryOffset}`
      

    } else {

        let queryOffset = 0
        urlApi = this.urlBase + `&limit=${estado.filas}&offset=${queryOffset}`

    }

    // console.log(urlApi)
    return urlApi

    },

    conectionApi(url){
        fetch(url)
        .then((res) => res.json())
        .then((json) => {
            // this.respuestaApi = json.data
            
            // renderizarDetalles(json.data);
            // console.log(this.respuestaApi)

            // if(window.location.pathname.match('/cliente/html/index.html')){
            //     // console.log('inicio!')
            //     pantallaInicio = true
            // }
            // else{
            //     pantallaInicio = false
            // }

            // return pantallaInicio
            console.log(json.data)
            
            estado.renderizarLista(json.data)

        })


    },

    // conectar(pagina, nombrequery, id,callback){
    //     conexion.conectionApi(conexion.armarUrl(pagina, nombrequery, id),callback)
    // }

}


