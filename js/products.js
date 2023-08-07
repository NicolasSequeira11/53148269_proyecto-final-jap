const container = document.querySelector("#container-content");

const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("card")

                const image = document.createElement("img");
                image.src = product.image;
                image.classList.add("card-image");
                productDiv.appendChild(image);

                const name = document.createElement("h2");
                name.textContent = product.name;
                name.classList.add("card-title");
                productDiv.appendChild(name);

                const description = document.createElement("p");
                description.textContent = product.description;
                description.classList.add("card-description");
                productDiv.appendChild(description);

                const cost = document.createElement("p");
                cost.textContent = "Precio: " + product.cost;
                cost.classList.add("card-cost");
                productDiv.appendChild(cost);

                const soldCount = document.createElement("p");
                soldCount.textContent = "Cantidad vendida: " + product.soldCount;
                soldCount.classList.add("card-soldCount");
                productDiv.appendChild(soldCount);

                container.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
