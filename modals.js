//Modal de creación de nuevo item

function createItem(productId, productName, productPrice, productDesc, productStandard, productUnit, productImage) {
    database.push(new Item(productId, productName, productPrice, productDesc, productStandard, productUnit, productImage));
    saveItemsLocalStorage(database);
    renderItems();
}

let createButton = document.getElementById("add-button");

createButton.onclick = function() {
    
    let number = database.length + 1;

    Swal.fire({
        title: 'Añadir item personalizado',
        html: `<p class="fs-3">Ingrese el nombre del item: </p>
        <input id="input-name" type="text" class="form-control fs-2 d-block" aria-label="Name" aria-describedby="input-group-left">
        <p class="fs-3 py-2">Ingrese el precio del item: </p>
        <input id="input-price" type="number" class="form-control fs-2 d-block" aria-label="Name" aria-describedby="input-group-left" placeholder="$">
        <p class="fs-3 py-2">Ingrese la descripción del item: </p>
        <input id="input-desc" type="text" class="form-control fs-2 d-block" aria-label="Name" aria-describedby="input-group-left">
        <p class="fs-3 py-2">Ingrese la normativa de referencia del item: </p>
        <input id="input-standard" type="text" class="form-control fs-2 d-block" aria-label="Name" aria-describedby="input-group-left">
        <p class="fs-3 py-2">Ingrese la unidad de medida del item: </p>
        <input id="input-unit" type="text" class="form-control fs-2 d-block" aria-label="Name" aria-describedby="input-group-left">
        `,
        width: 600,
        confirmButtonText: 'Agregar',
        focusConfirm: false,
        preConfirm: () => {
            const name = Swal.getPopup().querySelector('#input-name').value
            const price = Swal.getPopup().querySelector('#input-price').value
            const description = Swal.getPopup().querySelector('#input-desc').value
            const standard = Swal.getPopup().querySelector('#input-standard').value
            const unit = Swal.getPopup().querySelector('#input-unit').value
            const image =  "newitem.png"

            if (!name || !price || !description || !standard || !unit || !image) {
                Swal.showValidationMessage(`Falta ingresar algún valor o la imagen`)
            }
            return { name: name, price: price, description: description, standard: standard, unit: unit, image: image}
            }
        }).then((result) => {
        createItem(number, result.value.name, result.value.price, result.value.description, result.value.standard, result.value.unit, result.value.image);
        Swal.fire(`Detalle del item agregado:
            Nombre: ${result.value.name}
            Precio: ${result.value.price}
            Descripción: ${result.value.description}
            Normativa: ${result.value.standard}
            Unidad: ${result.value.unit}
            `.trim())

        
    })  
    
    //document.getElementById("modal-create").style.display = "none";
}



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