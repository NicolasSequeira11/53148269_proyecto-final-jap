const container = document.querySelector("#container-content"); // Constante que toma el contenedor div del HTML.

const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL de JSON con información de los autos.

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products; // Constante para trabajar sobre la info de cada producto.
            products.forEach(product => {
                const containerCard = document.createElement("div");
                containerCard.classList.add("col-xl-4", "col-12", "col-md-6", "col-lg-3", "container-products");

                // CREAR ELEMENTO DIV (CONTENEDOR PRODUCTO)
                const productDiv = document.createElement("div");
                productDiv.classList.add("card", "col-12", "div-products");

                // CREAR ELEMENTO IMAGEN
                const image = document.createElement("img");
                image.src = product.image;
                image.classList.add("card-image", "image-products");
                productDiv.appendChild(image);

                // CREAR ELEMENTO H2 (TITULO)
                const name = document.createElement("h2");
                name.textContent = product.name;
                name.classList.add("card-title", "title-products");
                productDiv.appendChild(name);

                // CREAR ELEMENTO P (DESCRIPCIÓN)
                const description = document.createElement("p");
                description.textContent = product.description;
                description.classList.add("card-description", "description-products");
                productDiv.appendChild(description);

                // CREAR ELEMENTO P (COSTO PRODUCTO)
                const cost = document.createElement("p");
                cost.textContent = "Precio: " + product.currency + "" + product.cost;
                cost.classList.add("card-cost", "cost-products");
                productDiv.appendChild(cost);

                // CREAR ELEMENTO P (CANTIDAD VENDIDOS)
                const soldCount = document.createElement("p");
                soldCount.textContent = "Cantidad vendida: " + product.soldCount;
                soldCount.classList.add("card-soldCount", "soldCount-products");
                productDiv.appendChild(soldCount);

                // AGREGAR ELEMENTOS AL HTML PARA PODER VISUALIZARLOS
                containerCard.appendChild(productDiv);
                container.appendChild(containerCard);
            });
        })
        // Mensaje de error por si ocurre un error al cargar el fetch.
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
