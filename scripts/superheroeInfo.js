//variables globales
let containerInfo = document.getElementById('container-info')

function getId(clicked_id){
    location.href='/cliente/html/infoSh.html'
     estado.idSelecc = parseInt(clicked_id)
    //  renderizarDetalles()
}

function renderizarDetalles(infoSuperheroe){
    containerInfo.innerHTML = '';
    armarDetalles(infoSuperheroe[0].name, infoSuperheroe[0].desciption,infoSuperheroe[0].thumbnail.path, infoSuperheroe[0].thumbnail.extension)
    conectionApi(armarUrl(estado.pagina, inputBuscador.value, estado.idSelecc))

}



function armarDetalles(nombre, descripcion, imagen, extension){
    let divImg = document.getElementById('imagen-sh')
    let divDetalles = document.getElementById('detalles-sh')

    divImg.innerHTML= `<img src="${imagen}.${extension}" alt="${nombre}" class=".img-fluid">`

    divDetalles.innerHTML = `<span>
    <h2>${nombre}</h2>
    <h3>Descripción</h3>
    <p>${descripcion}</p>
    </span>` 

    containerInfo.appendChild(divImg);
    containerInfo.appendChild(divDetalles)

}

