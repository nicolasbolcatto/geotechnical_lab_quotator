fetch('./database.json').then(response => {
    return response.json();
}).then(database => {


    //Search bar, description modals & render elements

    const userCardTemplate = document.querySelector("[data-item-template]");
    const userCardContainer = document.querySelector("[data-item-card-container]");
    const searchInput = document.querySelector("[data-search]");

    let items = []
    items = database.map(item => {
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const body = card.querySelector("[data-body]");
        const footer = card.querySelector("[data-footer]");
        let { id, category, name, price, description, standards, unit, picture, materialRequired } = item;
        header.innerHTML = `<img id="item-img" src="./img/${picture}" class="card-img-top" alt="${name}">`
        body.innerHTML = `<div><h5 class="card-title fs-2">${name}</h5></div>
        <div><p class="lead fs-3">Price: $ ${price}</p></div>`
        footer.innerHTML = `<a href="#" id="add-button-${id}" class="btn btn-add fs-2 m-3"> Add to cart </a>
        <a href="#" id="desc-button-${id}" class="btn btn-desc fs-2 m-3"> See description </a>`
        userCardContainer.append(card);

        //Description modals using SweetAlert

        let button = document.getElementById(`desc-button-${id}`);
        button.addEventListener('click', () => {

            Swal.fire({
                title: `${name}`,
                width: 500,
                html: `<p class="fs-3 py-2">${description}</p>
                <p class="fs-3 py-2">Standard: ${standards}</p>
                <p class="fs-3 py-2">Sample type: ${unit}</p>
                <p class="fs-3 py-2">Material required: ${materialRequired}`,
                imageUrl: `./img/${picture}`,
                imageWidth: 300
            })
        })

        //Event listeners for adding button

        let addButton = document.getElementById(`add-button-${id}`);
        addButton.addEventListener('click', () => {
            addToCart(id);
            Toastify({
                text: "Item added successfully!",
                duration: 2500,
                gravity: 'bottom',
                position: 'right',
                className: 'notificacion my-toast',
                style: {
                    background: "linear-gradient(to top right, lightgreen, green)",
                  }
            }).showToast();
            

        })

        return { name: name, element: card, category: category };
    })

    //Event listener for search bar
    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase()
        items.forEach(item => {
            let isVisible = item.name.toLowerCase().includes(value);
            item.element.classList.toggle("hide", !isVisible);
        })
    })

    //Event listeners for category selection
    let categoryButtonAll = document.getElementById("all");
    categoryButtonAll.addEventListener("click", () => {
        items.forEach(item => {
            item.element.classList.remove("hide");
            })
            
        })

    let categoryButtonClassification = document.getElementById("classification")
    categoryButtonClassification.addEventListener("click", () =>{
        items.forEach(item => {
            if (item.category != "Classification"){
                item.element.classList.add("hide");
            } else {
                item.element.classList.remove("hide");
            }
            
        })
    })

    let categoryButtonCompaction = document.getElementById("compaction");
    categoryButtonCompaction.addEventListener("click", () =>{
        items.forEach(item => {
            if (item.category != "Compaction"){
                item.element.classList.add("hide");
            } else {
                item.element.classList.remove("hide");
            }
            
        })
    })

    let categoryButtonConsolidation = document.getElementById("consolidation");
    categoryButtonConsolidation.addEventListener("click", () =>{
        items.forEach(item => {
            if (item.category != "Consolidation"){
                item.element.classList.add("hide");
            } else {
                item.element.classList.remove("hide");
            }
            
        })
    })

    let categoryButtonTotalStress = document.getElementById("total-stress");
    categoryButtonTotalStress.addEventListener("click", () =>{
        items.forEach(item => {
            if (item.category != "Total Stress"){
                item.element.classList.add("hide");
            } else {
                item.element.classList.remove("hide");
            }
            
        })
    })

    let categoryButtonEffectiveStress = document.getElementById("effective-stress");
    categoryButtonEffectiveStress.addEventListener("click", () =>{
        items.forEach(item => {
            if (item.category != "Effective Stress"){
                item.element.classList.add("hide");
            } else {
                item.element.classList.remove("hide");
            }
            
        })
    })

    let categoryButtonPermeability = document.getElementById("permeability");
    categoryButtonPermeability.addEventListener("click", () =>{
        items.forEach(item => {
            if (item.category != "Permeability"){
                item.element.classList.add("hide");
            } else {
                item.element.classList.remove("hide");
            }
            
        })
    })

    let categoryButtonRock = document.getElementById("rock");
    categoryButtonRock.addEventListener("click", () =>{
        items.forEach(item => {
            if (item.category != "Rock"){
                item.element.classList.add("hide");
            } else {
                item.element.classList.remove("hide");
            }
            
        })
    })

    let categoryButtonChemical = document.getElementById("chemical");
    categoryButtonChemical.addEventListener("click", () =>{
        items.forEach(item => {
            if (item.category != "Chemical"){
                item.element.classList.add("hide");
            } else {
                item.element.classList.remove("hide");
            }
            
        })
    })

    let categoryButtonOrganic = document.getElementById("organic")
    categoryButtonOrganic.addEventListener("click", () =>{
        items.forEach(item => {
            if (item.category != "Organic"){
                item.element.classList.add("hide");
            } else {
                item.element.classList.remove("hide");
            }
            
        })
    })

}).catch(err => {
    console.log("Something failed, unable to load items database");
});