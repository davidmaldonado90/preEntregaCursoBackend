const socket = io();


const addProductForm = document.getElementById("addProductForm");

const productsList = document.getElementById("productsList");


addProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = JSON.stringify(Object.fromEntries(formData));
    socket.emit("addProducts", productData);
    event.target.reset();
});


socket.on("realTimeProducts", (data) => {
    const products = JSON.parse(data);
    showProducts(products);
});


socket.on("productAdded", (data) => {
    const newProduct = JSON.parse(data);
    const productElement = createProductElement(newProduct);
    productsList.appendChild(productElement);
});


socket.on("productDeleted", (productId) => {
    const productElement = document.getElementById(productId);
    if (productElement) {
        productElement.remove();
    }
});


const showProducts = (products) => {
    productsList.innerHTML = "";
    products.forEach((product) => {
        const productElement = createProductElement(product);
        productsList.appendChild(productElement);
    });
}

const createProductElement = (product) => {
    const div = document.createElement("div");
    div.classList.add("realProd");
    div.id = product.id; 
    div.innerHTML = `
        <h1>Nombre del producto: ${product.tittle}</h1>
        <p>Descripción: ${product.description}</p>
        <p>Categoría: ${product.category}</p>
        <button class="deleteButton" data-id="${product.id}">Eliminar</button>
    `;
    
    const deleteButton = div.querySelector(".deleteButton");
    deleteButton.addEventListener("click", () => {
        const productId = deleteButton.getAttribute("data-id");
        console.log("eliminando producto:", productId);
        socket.emit("deleteProduct", productId);
        const productElement = document.getElementById(productId);
        if (productElement) {
            productElement.remove();
        }
    });
    
    return div;
}

