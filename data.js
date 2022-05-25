/*Declaro la clase Item*/

class Item {
    constructor(id, name, price, description, standards, unit, picture) {
        this.id = id;
        this.name = name; /*Nombre del item*/
        this.price = price; /*Precio del item*/
        this.description = description; /*Descripcion del item*/
        this.standards = standards; /*Norma de ensayo del item*/
        this.unit = unit; /*Unidad de medida del item*/
        this.picture = picture;
    }
}

//Declaro el array de partida que define el conjunto de items básicos disponibles para elegir

let database = [{
    id: 1,
    name: "Humedad natural",
    price: 1840,
    description: "Determinación de la humedad natural de una muestra de suelo",
    standards: "VN-E2-65",
    unit: "muestra",
    picture: "balance.png"
},{
    id: 2,
    name: "Clasificación SUCS y HRB",
    price: 1840,
    description: "Determinación de los Límites de Atterberg (Líquido y Plástico), Granulometría por vía húmeda por tamices nº10, nº40 y nº200, y Clasificación SUCS y HRB.",
    standards: "VN-E3-65, VN-E1-65, VN-E4-84, ASTM D2487",
    unit: "muestra",
    picture: "classification.png"
},{
    id: 3,
    name: "Granulometría por tamices",
    price: 1100,
    description: "Obtención de la curva granulométrica mediante tamizado en tamaños de 3\" a nº200.",
    standards: "ASTM D422",
    unit: "muestra",
    picture: "sieves.png"
}, {
    id: 4,
    name: "Densidad mínima y máxima",
    price: 18000,
    description: "Determinación de densidad máxima con martillo vibratorio y densidad mínima de muestras de suelo granular.",
    standards: "BS 1377, ASTM D4254",
    unit: "muestra",
    picture: "density.png"
}, {
    id: 5,
    name: "Proctor Standard (T-99)",
    price: 19000,
    description: "Determinación de la densidad seca máxima y de la humedad óptima de un suelo compactado.",
    standards: "ASTM D698",
    unit: "muestra",
    picture: "proctor.png"
}, {
    id: 6,
    name: "Proctor Modificado (T-180)",
    price: 19000,
    description: "Determinación de la densidad seca máxima y de la humedad óptima de un suelo compactado.",
    standards: "ASTM D1557",
    unit: "muestra",
    picture: "proctor.png"
}, {
    id: 7,
    name: "Granulometría por sedimentación",
    price: 7000,
    description: "Determinación de la curva granulométrica de un suelo para las partículas menores a 75 micrones.",
    standards: "ASTM D7928",
    unit: "muestra",
    picture: "hydrometer.png"
}, {
    id: 8,
    name: "Ensayo triaxial escalonado UU",
    price: 7500,
    description: "Ensayo triaxial escalonado rápido, no consolidado, no drenado. El ensayo se ejecuta sobre una sola muestra.",
    standards: "ASTM D2850",
    unit: "muestra",
    picture: "tx.png"
}, {
    id: 9,
    name: "Ensayo triaxial UU",
    price: 7500,
    description: "Ensayo triaxial no consolidado, no drenado. El ensayo se ejecuta sobre hasta 3 muestras.",
    standards: "ASTM D2850",
    unit: "muestra",
    picture: "tx.png"
}, {
    id: 10,
    name: "Ensayo triaxial CU",
    price: 15000,
    description: "Ensayo triaxial consolidado, no drenado con medición de presiones de poro. Incluye la etapa de saturación. El ensayo se ejecuta sobre hasta 3 muestras.",
    standards: "ASTM D4767",
    unit: "muestra",
    picture: "tx.png"
}, {
    id: 11,
    name: "Ensayo triaxial CD",
    price: 15000,
    description: "Ensayo triaxial consolidado, drenado. Incluye la etapa de saturación. El ensayo se ejecuta sobre hasta 3 muestras.",
    standards: "ASTM D7181",
    unit: "muestra",
    picture: "tx.png"
}];

function saveItemsLocalStorage(array){
    localStorage.setItem("array", JSON.stringify(array));
}

function loadItemsLocalStorage(){
    return JSON.parse(localStorage.getItem("array"));
}

