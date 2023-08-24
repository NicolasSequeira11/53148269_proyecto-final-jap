const container = document.querySelector("#container-content"); // Constante que toma el contenedor div del HTML.

const id = localStorage.getItem("catID");
const url = ("https://japceibal.github.io/emercado-api/cats_products/"+ id +".json"); // URL con los JSON de todas las categorías

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products; // Constante para trabajar sobre la info de cada producto.
            let content = "";
            products.forEach(product => {
                content += 
                `
                <div class="col-xl-4 col-12 col-md-6 col-lg-3 container-products">
                    <div class="card col-12 div-products">
                        <img class="card-image image-products" src="${product.image}">
                        <h2 class="card-title title-products">${product.name}</h2>
                        <p class="card-description description-products">${product.description}</p>
                        <p class="card-cost cost-products">Precio: ${product.currency} ${product.cost}</p>
                        <p class="card-soldcount soldCount-products">Cantidad vendida: ${product.soldCount}</p>
                    </div>
                </div>
                `;
                container.innerHTML = content;
                });
        })
        // Mensaje de error por si ocurre un error al cargar el fetch.
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
