
function renderItems(){
    let items = loadItemsLocalStorage();
    let content = "";
    
    for (const item of items){
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
}

document.getElementById("delete-cart").addEventListener("click",deleteCart);


saveItemsLocalStorage(database);
loadItemsLocalStorage();
updateCartButton();
renderItems();
