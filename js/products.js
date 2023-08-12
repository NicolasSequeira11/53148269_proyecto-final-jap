const container = document.querySelector("#container-content");

const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            products.forEach(product => {
                const containerCard = document.createElement("div");
                containerCard.classList.add("col-xl-4", "col-12", "col-md-6", "col-lg-3", "container-products");

                const productDiv = document.createElement("div");
                productDiv.classList.add("card", "col-12", "div-products");

                const image = document.createElement("img");
                image.src = product.image;
                image.classList.add("card-image", "image-products");
                productDiv.appendChild(image);

                const name = document.createElement("h2");
                name.textContent = product.name;
                name.classList.add("card-title", "title-products");
                productDiv.appendChild(name);

                const description = document.createElement("p");
                description.textContent = product.description;
                description.classList.add("card-description", "description-products");
                productDiv.appendChild(description);

                const cost = document.createElement("p");
                cost.textContent = "Precio: " + product.cost;
                cost.classList.add("card-cost", "cost-products");
                productDiv.appendChild(cost);

                const soldCount = document.createElement("p");
                soldCount.textContent = "Cantidad vendida: " + product.soldCount;
                soldCount.classList.add("card-soldCount", "soldCount-products");
                productDiv.appendChild(soldCount);

                containerCard.appendChild(productDiv);
                container.appendChild(containerCard);
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
