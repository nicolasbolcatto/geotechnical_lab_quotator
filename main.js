

fetch('./database.json').then(response => {
    return response.json();
  }).then(database => {
    let content = "";
    //Render items

    for (const item of database){
        let {id,name,price,standards,description,picture} = item; //Uso desestructuracion
        content += `
        <div class="col">
            <div class="card h-100">
                <img id="item-img" src="/img/${picture}" class="card-img-top" alt="${name}">
                <div class="card-body bg-dark">
                    <h5 class="card-title fs-2">${name}</h5>
                    <p class="lead fs-3">Precio: $ ${price}</p>
                    <p class="card-text fs-4">Normas de aplicación: ${standards}</p>
                    <p class="card-text fs-4">${description}</p>
                </div>
                <div class="card-footer bg-dark text-center">
                <a href="#" class="btn btn-primary fs-2 m-3" onclick="addToCart(${id})"> Agregar </a>
                <a href="#" id="desc-button-${id}"class="btn btn-success fs-2 m-3"> Ver descripcion </a>
                </div>
            </div>
        </div>
        `;
    }
    
    document.getElementById("grid").innerHTML = content;

    //Modals de descripcion

    for (let i = 0; i <= database.length - 1; i++) {
        let items = loadItemsLocalStorage();
        let Button = document.getElementById("desc-button-" + (i + 1));
        let {name,description,standards,unit,picture} = items[i];
        Button.addEventListener('click',()=>{

            Swal.fire({
                title: `${name}`,
                width: 500,
                html: `<p class="fs-3 py-2">${description}</p>
                <p class="fs-3 py-2">Normativa: ${standards}</p>
                <p class="fs-3 py-2">Unidad: ${unit}</p>`,
                imageUrl: `img/${picture}`,
                imageWidth: 300
            })
        })
    }

   
  }).catch(err => {
    console.log("No fue posible cargar la lista de items");
  });





