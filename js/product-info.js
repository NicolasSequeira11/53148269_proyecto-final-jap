const containerProduct = document.getElementById("container-product"); // Constante que toma el contenedor div del HTML.
const containerComment = document.getElementById("container-comments"); 


const productID = localStorage.getItem("productID"); // Constante que toma el valor del localStorage productID
const urlProduct = ("https://japceibal.github.io/emercado-api/products/" + productID + ".json"); // URL con los JSON de los productos
const urlComment =  ("https://japceibal.github.io/emercado-api/products_comments/" + productID + ".json"); // URL con los JSON de los comentarios

        // FETCH URLProduct

        fetch(urlProduct)
        .then(response => response.json())
        .then(data => {
            let productInfo = data; // Variable para acceder a la info de cada producto.
            
            // Mostrar info de productos en product-info.html
            containerProduct.innerHTML = 
            `
            <div class="col-12 row">
                <div class="py-5 card col-12 col-lg-7">
                    
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

                <div class="col-12 col-lg-5 container-product-info">
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

        //FIN FETCH URLProduct

        //FETCH URLComment
        let commentHTML = '';

        fetch(urlComment)
        .then(response => response.json())
        .then(data => {
            let commentInfo = data; // Variable para acceder a la info de cada producto.

            commentInfo.forEach(element => {
                commentHTML += `
                <div class="comment col-lg-7 ps-4">
                    <p class="py-2 m-auto mt-3"><strong>${element.user}</strong> - ${element.dateTime} -
            `
                for(let i=1; i<=5; i++){
                    if(i<=element.score){
                        commentHTML += `<span class="fa fa-star checked"></span>`
                    }else{
                        commentHTML += `<span class="fa fa-star"></span>`
                    }
                }
            
                commentHTML += `    
                    </p>
                    <p class="desc m-auto py-2 mb-3">${element.description} </p>
                </div>
                `
            });
            containerComment.innerHTML += commentHTML;
        
        })
        // AGREGAR NUEVO COMENTARIO

        const form = document.getElementById("commentForm"); // Obtener el formulario.
        const url = "https://jsonplaceholder.typicode.com/users"; // API para enviar datos del formulario

        let hoy = new Date(); // Variable que obtiene la fecha actual.
        let date = hoy.toLocaleString("en-US"); // Variable para formatear la fecha.

        // Evento para añadir el nuevo comentario.
        form.addEventListener("submit", e => {
            e.preventDefault();

            const opinion = document.getElementById("comment").value; // Obtener contenido de la opinión.
            const puntuacion = document.getElementById("rating").value; // Obtener valor de la puntuación.
            const datos = localStorage.getItem("usuario"); // Obtener el nombre de usuario del login.
            
            let newCommentHTML = ''; // Crear contenedor vacío en donde añadir nuevos comentarios.

            fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    score: puntuacion,
                    description: opinion,
                    user: datos,
                    dateTime: date,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(datos => {

                //Añadir elementos HTML del nuevo comentario
                newCommentHTML += 
                    `
                    <div class="comment ps-4">
                        <p class="py-2 m-auto mt-3"><strong>${datos.user}</strong> - ${datos.dateTime} -
                    `
                    for(let i=1; i<=5; i++){
                        if(i<=datos.score){
                            newCommentHTML += `<span class="fa fa-star checked"></span>`
                        }else{
                            newCommentHTML += `<span class="fa fa-star"></span>`
                        }
                    }
                    newCommentHTML += 
                    ` 
                        </p>
                        <p class="desc m-auto py-2 mb-3">${datos.description} </p>
                    </div>
                    `
                    containerComment.innerHTML += newCommentHTML;
            })
        });

        // FIN AGREGAR NUEVO COMENTARIO