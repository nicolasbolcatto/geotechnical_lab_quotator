//Contenido de modal de creacion de nuevo item

let modalCreate = document.createElement("div");
modalCreate.id = "modal-create";
modalCreate.className = "modal";
document.getElementById("aside").appendChild(modalCreate);

let modalCreateContent = document.createElement("div");
modalCreateContent.id = "modal-create-content";
modalCreateContent.className = "modal-content";
document.getElementById("modal-create").appendChild(modalCreateContent);

let modalCreateClose = document.createElement("span");
modalCreateClose.innerHTML = `<span id="span-create" class="close">&times;</span>`;
modalCreateContent.appendChild(modalCreateClose);

let createLabelName = document.createElement("div");
let createLabelPrice = document.createElement("div");
let createLabelDescription = document.createElement("div");
let createLabelStandard = document.createElement("div");
let createLabelUnit = document.createElement("div");

let createInputName = document.createElement("div");
let createInputPrice = document.createElement("div");
let createInputDescription = document.createElement("div");
let createInputStandard = document.createElement("div");
let createInputUnit = document.createElement("div");

let modalCreateButton = document.createElement("div");
modalCreateButton.id = "create-button-div";
modalCreateButton.innerHTML = '<button id="create-button" class="btn btn-add fs-3 d-block h-50">Agregar</button>';

createLabelName.innerHTML = '<p class="fs-3">Ingrese el nombre del item: </p>';
createLabelPrice.innerHTML = '<p class="fs-3">Ingrese el precio del item: </p>';
createLabelDescription.innerHTML = '<p class="fs-3">Ingrese la descripción del item: </p>';
createLabelStandard.innerHTML = '<p class="fs-3">Ingrese la Norma de referencia del item: </p>';
createLabelUnit.innerHTML = '<p class="fs-3">Ingrese la unidad de medida del item: </p>';

createInputName.innerHTML = '<input id="input-name" type="text" class="form-control fs-2 d-block" aria-label="Name" aria-describedby="input-group-left">';
createInputPrice.innerHTML = '<input id="input-price" type="number" class="form-control fs-2 d-block" aria-label="Name" aria-describedby="input-group-left">';
createInputDescription.innerHTML = '<input id="input-desc" type="text" class="form-control fs-2 d-block" aria-label="Name" aria-describedby="input-group-left">';
createInputStandard.innerHTML = '<input id="input-standard" type="text" class="form-control fs-2 d-block" aria-label="Name" aria-describedby="input-group-left">';
createInputUnit.innerHTML = '<input id="input-unit" type="text" class="form-control fs-2 d-block" aria-label="Name" aria-describedby="input-group-left">';

labelsAndInputs = [createLabelName,createInputName, createLabelPrice,createInputPrice,
    createLabelDescription,createInputDescription,createLabelStandard,createInputStandard,
    createLabelUnit,createInputUnit];
document.getElementById("modal-create-content").append(...labelsAndInputs); //Uso spread

modalCreateContent.appendChild(modalCreateButton);

//Eventos del modal de creación de nuevo item

function createItem(productId, productName, productPrice, productDesc, productStandard, productUnit) {
    database.push(new Item(productId, productName, productPrice, productDesc, productStandard, productUnit));
    saveItemsLocalStorage(database);
    renderItems();
}

let createButton = document.getElementById("add-button");
let closeModalCreate = document.getElementById("span-create");
createButton.onclick = () => document.getElementById("modal-create").style.display = "block";
closeModalCreate.onclick = () => document.getElementById("modal-create").style.display = "none";

modalCreateButton.onclick = function() {
    let nameCreatedItem = document.getElementById("input-name").value;
    let priceCreatedItem = document.getElementById("input-price").value;
    let descCreatedItem = document.getElementById("input-desc").value;
    let standardCreatedItem = document.getElementById("input-standard").value;
    let unitCreatedItem = document.getElementById("input-unit").value;

    createItem(database.length + 1, nameCreatedItem, priceCreatedItem, descCreatedItem, standardCreatedItem, unitCreatedItem);
    document.getElementById("modal-create").style.display = "none";
}

//Modals de descripcion

for (let i = 0; i <= database.length - 1; i++) {
    let modal = document.createElement("div");
    modal.id = `desc-modal-${i + 1}`;
    modal.className = "modal";
    document.getElementById("aside").appendChild(modal);

    let modalContent = document.createElement("div");
    modalContent.id = `modal-content-${i + 1}`;
    modalContent.className = "modal-content";
    modal.appendChild(modalContent);

    let close = document.createElement("span");
    close.innerHTML = `<span id="span-${i+1}" class="close">&times;</span>`;
    modalContent.appendChild(close);
}

//Contenido de modals de descripcion

for (let i = 0; i <= database.length - 1; i++) {

    let modalName = document.createElement("div");
    let modalDesc = document.createElement("div");
    let modalStandard = document.createElement("div");
    let modalUnit = document.createElement("div");

    let {name,description,standards,unit} = database[i]; //Uso desestructuracion
    modalName.innerHTML = `<h1>${name}</h1>`;
    document.getElementById("modal-content-" + (i + 1)).appendChild(modalName);
    modalDesc.innerHTML = `<p class="fs-3">Descripción: ${description}</p>`;
    document.getElementById("modal-content-" + (i + 1)).appendChild(modalDesc);
    modalStandard.innerHTML = `<p class="fs-3">Normas de aplicación: ${standards}</p>`;
    document.getElementById("modal-content-" + (i + 1)).appendChild(modalStandard);
    modalUnit.innerHTML = `<p class="fs-3">Unidad de medida: ${unit}</p>`;
    document.getElementById("modal-content-" + (i + 1)).appendChild(modalUnit);
}

//Eventos de modals de descripcion

const currentModal = [];
const closeModal = [];

for (let i = 0; i <= database.length - 1; i++) {
    currentModal[i] = document.getElementById("desc-modal-" + (i + 1));
    closeModal[i] = document.getElementById("span-" + (i + 1));
    let Button = document.getElementById("desc-button-" + (i + 1));
    Button.onclick = () => document.getElementById("desc-modal-" + (i + 1)).style.display = "block";
    closeModal[i].onclick = () => currentModal[i].style.display = "none";
}