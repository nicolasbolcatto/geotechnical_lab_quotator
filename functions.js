//Declaracion de funciones

//Funcion que agrega un item elegido al carrito

function addItem(itemName, itemPrice, quantity) {
    counter += 1;
    let itemAdded = document.createElement("tr");
    itemAdded.setAttribute("id", `added-item-${counter}`);
    console.log(itemAdded.id);
    totalPriceItem = itemPrice * quantity;
    totalPrice += totalPriceItem;
    itemAdded.innerHTML = `
            <th scope="row">${counter}</th>
                        <td>${itemName}</td>
                        <td>${quantity}</td>
                        <td>${itemPrice}</td>
                        <td>${totalPriceItem}</td>
                        <td id="delete-item-${counter}" class="delete fw-bold"><a id="del-button" href="#" class="btn fs-3">x</a></td>`;
    itemAdded.setAttribute("class", "fs-2");
    document.querySelector("#added-items-data").appendChild(itemAdded);
}

//Funcion que crea un nuevo item

function createItem(productId, productName, productPrice, productDesc, productStandard, productUnit) {
    arrayItems.push(new Item(productId, productName, productPrice, productDesc, productStandard, productUnit));
    let itemCard = document.createElement("div");
    itemCard.innerHTML = `<div id="item-description" class="p-3">
                    <p class="card-title fs-2 fw-bold">${productName}</p>
                    <p class="card-text fs-3">Precio: $${productPrice}</p>
                    <p class="card-text fs-3">Unidad: ${productUnit}</p>
                    <div id="buttons" class="">
                    <a id="add-button-${productId}" href="#" class="btn btn-add fs-3 d-block my-2">Agregar</a>
                    <input id="input-${productId}" type="number" class="form-control fs-2 d-block my-2" value="1" aria-label="Username" aria-describedby="input-group-left">
                    <a id="desc-button-${productId}" href="#" class="desc btn fs-3 d-block my-2 fw-bold">Ver descripción</a>
                   </div> </div>`;
    itemCard.setAttribute("id", "item-card");
    itemCard.setAttribute("class", "w-100 my-3 ms-2");
    document.querySelector("#main-container").appendChild(itemCard);
}

//Fin declaración de funciones