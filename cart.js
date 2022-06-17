
//Function to search item by id
function searchItem(id) {
    fetch('./database.json').then(response => {
        return response.json();
    }).then(database => {
        const item = database.find(x => x.id == id)
        return item.id
    }).catch(err => {
        console.log("Something failed, unable to load items database");
    });
}

//Function to load items in cart (stored in LS)

function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; //Uso operador OR
    return cart;
}

//Function to add item to cart

function addToCart(id) {
    fetch('./database.json').then(response => {
        return response.json();
    }).then(database => {

        let itemsInCart = loadCartItems();
        const position = itemsInCart.findIndex(element => element.id == id);
        if (position === -1) {
            const item = database[id - 1];
            item.quantity = 1;
            itemsInCart.push(item);
        } else {
            itemsInCart[position].quantity++; //sugar syntax
        }

        localStorage.setItem("cart", JSON.stringify(itemsInCart));
        updateCartButton();

    }).catch(err => {
        console.log("Something failed, unable to load items database");
    });
}

//Funcion to delete cart

function deleteCart() {
    Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Are you sure? All items will be deleted from the cart',
        showDenyButton: true,
        confirmButtonText: 'Yes',
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

//Function to delete single item from cart

function deleteSingleItem(id) {
    let itemsInCart = loadCartItems();
    let itemsInCartUpdate = itemsInCart.filter(x => x.id != id);
    localStorage.setItem("cart", JSON.stringify(itemsInCartUpdate));
    Toastify({
        text: "Item deleted successfully!",
        duration: 2500,
        gravity: 'bottom',
        position: 'right',
        className: 'notificacion my-toast',
        style: {
            background: "linear-gradient(to top right, lightgreen, green)",
          }
    }).showToast();
    updateCartButton();
    renderSelectedItems();
}

//Function to reduce quantity of single item by 1

function reduceQuantity(id) {
    const itemsInCart = loadCartItems();
    const position = itemsInCart.findIndex(element => element.id == id);
    itemsInCart[position].quantity != 0 && itemsInCart[position].quantity--; // AND & sugar syntax
    localStorage.setItem("cart", JSON.stringify(itemsInCart));
    updateCartButton();
    renderSelectedItems();
}

//Function to increase quantity of single item by 1

function increaseQuantity(id) {
    const itemsInCart = loadCartItems();
    const position = itemsInCart.findIndex(element => element.id == id);
    itemsInCart[position].quantity++; //Uso sugar syntax
    localStorage.setItem("cart", JSON.stringify(itemsInCart));
    updateCartButton();
    renderSelectedItems();
}

//Function to update cart button number of items

function updateCartButton() {
    let itemsInCart = loadCartItems();
    let content = `<button type="button" class="btn position-relative fs-2 mx-4">Go to cart<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${itemsInCart.length}</span></button>`;
    if (document.getElementById("go-cart")) {
        document.getElementById("go-cart").innerHTML = content;
    }
}

//Function to render selected elements in cart.html

function renderSelectedItems() {
    if (document.getElementById("main-cart")) {
        let selected_items = loadCartItems();
        document.querySelector("#added-items").innerHTML = "";
        let counter = 0;
        let total = 0;
        if (selected_items.length == 0) {
            let no_content = "<p class='fs-2 text-center bg-dark p-3'>No items selected!</p>";
            document.getElementById("main-cart").innerHTML = no_content;
        } else {

            for (const item of selected_items) {
                counter += 1;
                let added_item = document.createElement("tr");
                added_item.setAttribute("id", `added-item-${counter}`);
                let { id, name, price, quantity} = item; //Destructuration
                let calculate_price = Math.round((price * quantity *100))/100;
                added_item.innerHTML = `
                        <td id="counter-${counter}" class="fs-3" scope="row">${counter}</td>
                                    <td id="name-${counter}" class="fs-3">${name}</td>
                                    <td class="fs-3 text-center align-middle"><button id="reduce" class="btn btn-danger text-white mx-2 fs-3 fw-bold" onclick="reduceQuantity(${id})">-</button>${quantity}<button id="increase" class="btn btn-success text-white mx-2 fs-3 fw-bold" onclick="increaseQuantity(${id})">+</button></td>
                                    <td id="unit-price-${counter}" class="fs-3 text-center align-middle">${price}</td>
                                    <td id="total-price-${counter}" class="fs-3 text-center align-middle">${calculate_price}</td>
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

document.getElementById("delete-cart").addEventListener("click", deleteCart);
updateCartButton();
renderSelectedItems();

//PDF Generation
const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", () =>{
    const client = document.getElementById("client").value;
    const project = document.getElementById("project").value;
    if (client == "" || project ==""){
        return alert("Please complete the required fields")
    }
    window.jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF();
    doc.setFontSize(25);
    doc.text("Geotechnical Lab Quotator", 50, 30);
    doc.setFontSize(18);
    
    doc.text("Client: " + client, 10, 60);
    doc.text("Project: " + project, 10, 70);

    doc.setFontSize(12);
    doc.text(document.getElementById("item-number").innerText, 10, 90);
    doc.text(document.getElementById("item-description").innerText, 30, 90);
    doc.text(document.getElementById("item-quantity").innerText, 180, 90);

    
    let selected_items = loadCartItems();
    let j = 1;
    let y = 90;
    for (const item of selected_items){
        doc.text(document.getElementById(`counter-${j}`).innerText,10,y+10);
        doc.text(document.getElementById(`name-${j}`).innerText,30,y+10);
        doc.text(item.quantity.toString(),190,y+10);

        j++;
        y += 10;
    }

    doc.text(document.getElementById("item-number").innerText, 10, y+20);
    doc.text(document.getElementById("item-unit-price").innerText, 30, y+20);
    doc.text(document.getElementById("item-total-price").innerText, 60, y+20);

    y += 20;
    j = 1;
    for (const item of selected_items){
        doc.text(document.getElementById(`counter-${j}`).innerText,10,y+10);
        doc.text(document.getElementById(`unit-price-${j}`).innerText,30,y+10);
        doc.text(document.getElementById(`total-price-${j}`).innerText,60,y+10);

        j++;
        y += 10;
    }

    doc.setFontSize(18);
    doc.text(document.getElementById("total-price").innerText,10,y+20);
    doc.setFontSize(12);
    doc.text("Geotechnical Lab Quotator is Developed by Nico Bolcatto",10,y+40);
    doc.text("nicobolcatto@gmail.com",10,y+50);
    doc.save("a4.pdf");
})