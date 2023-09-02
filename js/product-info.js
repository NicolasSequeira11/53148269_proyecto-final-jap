const containerProduct = document.getElementById("container-product"); // Constante que toma el contenedor div del HTML.


const productID = localStorage.getItem("productID"); // Constante que toma el valor del localStorage productID
const urlProduct = ("https://japceibal.github.io/emercado-api/products/" + productID + ".json"); // URL con los JSON de los productos


        // FETCH

        fetch(urlProduct)
        .then(response => response.json())
        .then(data => {
            let productInfo = data; // Variable para acceder a la info de cada producto.
            
            // Mostrar info de productos en product-info.html
            containerProduct.innerHTML = 
            `
            <div class="col-12 d-flex">
                <div class="py-5 card col-7">
                    
                    <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${productInfo.images[0]}" class="d-block w-100" alt="..."> 
                            </div>
                            <div class="carousel-item">
                                <img src="${productInfo.images[1]}" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="${productInfo.images[2]}" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="${productInfo.images[3]}" class="d-block w-100" alt="...">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon btn btn-light bg-primary" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span class="carousel-control-next-icon btn btn-light bg-primary" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                </div>

                <div class="col-5 container-product-info">
                    <h2 class="card-title title-product-info"><strong>${productInfo.name}</strong></h2>
                    <p class="card-description description-product-info">${productInfo.description}</p>
                    <p class="card-description category-product-info"><strong>Categoría</strong> <br> ${productInfo.category}</p>
                    <p class="card-soldcount soldCount-product-info"><strong>Cantidad de vendidos</strong> <br> ${productInfo.soldCount}</p>
                    <p class="card-cost cost-product-info"><strong>Precio</strong> <br> ${productInfo.currency} ${productInfo.cost}</p>
                </div>
            </div>

            `;

        })
        // Mensaje de error por si ocurre un error al cargar el fetch.
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });

        //FIN FETCH



