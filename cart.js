function saveItemsLocalStorage(array){
    localStorage.setItem("array", JSON.stringify(array));
}

function loadItemsLocalStorage(){
    return JSON.parse(localStorage.getItem("array"));
}

//Funcion para buscar un item por su id

function searchItem(id){
    let items = loadItemsLocalStorage();
    return items.find(x => x.id == id)
}

//Funcion para cargar los items del carrito alojados en la LS

function loadCartItems(){
    let cart = JSON.parse(localStorage.getItem("cart")) || []; //Uso operador OR
    return cart;
}

//Funcion para agregar un item al carrito

function addToCart(id){
    
    let itemsInCart = loadCartItems();
    const position = itemsInCart.findIndex(element => element.id == id);

    if(position === -1){
        const item = searchItem(id);
        item.quantity = 1;
        itemsInCart.push(item);
    } else {
        itemsInCart[position].quantity++;   //Uso sugar syntax
    }

    localStorage.setItem("cart",JSON.stringify(itemsInCart));
    updateCartButton();
}

//Funcion para eliminar el carrito

function deleteCart(){
    Swal.fire({
        icon: 'warning',
        title: 'Atención!',
        text: 'Está seguro de eliminar todos los items?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
        }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("cart");
            updateCartButton();
            renderSelectedItems();
        }
        })


    
}

//Funcion para eliminar un item del carrito

function deleteSingleItem(id){
    let itemsInCart = loadCartItems();
    let itemsInCartUpdate = itemsInCart.filter(x => x.id != id);
    localStorage.setItem("cart",JSON.stringify(itemsInCartUpdate));
    updateCartButton();
    renderSelectedItems();
}

//Funcion para reducir en una unidad un item del carrito

function reduceQuantity(id){
    const itemsInCart = loadCartItems();
    const position = itemsInCart.findIndex(element => element.id == id);
    itemsInCart[position].quantity != 0 && itemsInCart[position].quantity--; //Utilizo operador logico AND y sugar syntax
    localStorage.setItem("cart",JSON.stringify(itemsInCart));
    updateCartButton();
    renderSelectedItems();
}

//Funcion para aumentar en una unidad un item del carrito

function increaseQuantity(id){
    const itemsInCart = loadCartItems();
    const position = itemsInCart.findIndex(element => element.id == id);
    itemsInCart[position].quantity++;  //Uso sugar syntax
    localStorage.setItem("cart",JSON.stringify(itemsInCart));
    updateCartButton();
    renderSelectedItems();
}

//Funcion que actualiza el numero de items diferentes en el carrito

function updateCartButton(){
    let itemsInCart = loadCartItems();
    let content=`<button type="button" class="btn position-relative fs-2 mx-4">Ir al carrito<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${itemsInCart.length}</span></button>`;
    if (document.getElementById("go-cart")){
        document.getElementById("go-cart").innerHTML = content;
    }
    
}

//Funcion que muestra los elementos seleccionados del carrito

function renderSelectedItems(){
    if (document.getElementById("main-cart")){
        let selected_items = loadCartItems();
        document.querySelector("#added-items").innerHTML = "";
        let counter = 0;
        let total = 0;
        if (selected_items.length == 0){
            let no_content = "<p class='fs-2 text-center bg-dark p-3'>No existen elementos seleccionados!</p>";
            document.getElementById("main-cart").innerHTML = no_content;
        } else {

            for (const item of selected_items){
                counter +=1;
                let added_item = document.createElement("tr");
                added_item.setAttribute("id", `added-item-${counter}`);
                let {id,price,quantity,description} = item;  //Uso desestructuracion
                let calculate_price = price * quantity;
                added_item.innerHTML = `
                        <th class="fs-3" scope="row">${counter}</th>
                                    <td class="fs-3">${description}</td>
                                    <td class="fs-3 text-center align-middle"><button id="reduce" class="btn btn-danger text-white mx-2 fs-3 fw-bold" onclick="reduceQuantity(${id})">-</button>${quantity}<button id="increase" class="btn btn-success text-white mx-2 fs-3 fw-bold" onclick="increaseQuantity(${id})">+</button></td>
                                    <td class="fs-3 text-center align-middle">${price}</td>
                                    <td class="fs-3 text-center align-middle">${calculate_price}</td>
                                    <td class="fs-3 align-middle" id="delete-item-${counter}"><button class="btn btn-danger delete fw-bold"><a id="del-button" href="#" class="text-white text-decoration-none fs-3" onclick="deleteSingleItem(${id})">X</a></button></td>`;
                                    added_item.setAttribute("class", "fs-3");
                document.querySelector("#added-items").appendChild(added_item);
                total += calculate_price;
                total_price = document.getElementById("total-price");
                total_price.innerHTML = `Total = $ ${total}`;
            }
        }
        
        
    }
}

document.getElementById("delete-cart").addEventListener("click",deleteCart);
updateCartButton();
renderSelectedItems();