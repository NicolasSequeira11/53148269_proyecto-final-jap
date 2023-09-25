const containerProduct = document.getElementById("container-product"); // Obtener el div para agregar la info del producto
const containerComment = document.getElementById("container-comments"); // Obtener el div para agregar los comentarios del producto

const productID = localStorage.getItem("productID"); // Obtener valor del localStorage productID
const urlProduct = "https://japceibal.github.io/emercado-api/products/" + productID + ".json"; // URL con los JSON de los productos
const urlComment = "https://japceibal.github.io/emercado-api/products_comments/" + productID + ".json"; // URL con los JSON de los comentarios

const productCatID = localStorage.getItem("catID"); // Obtener valor del localStorage catID
const containerProdsRel = document.getElementById("prodsRelContainer"); //Obtener el div para agregar los productos relacionados al producto
const urlCatProd = "https://japceibal.github.io/emercado-api/cats_products/" + productCatID + ".json"; // URL con los JSON de los productos relacionados

/* ---------- FETCH PRODUCT INFO ---------- */

fetch(urlProduct)
  .then((response) => response.json())
  .then((data) => {
    let productInfo = data; // Obtener la info de cada producto
    showProductInfo(productInfo);
  })
  /* Mensaje por si ocurre un error al cargar el fetch */
  .catch((error) => {
    console.error("Error al cargar los productos:", error);
  });

/* ---------- FETCH COMMENTS ---------- */

let commentHTML = "";

fetch(urlComment)
  .then((response) => response.json())
  .then((data) => {
    let commentInfo = data; // Obtener la info de cada producto
    showComments(commentInfo);
  });

/* Evento para añadir el nuevo comentario */
const url = "https://jsonplaceholder.typicode.com/users"; // API para enviar datos del formulario

let hoy = new Date(); // Obtener fecha actual
let date = hoy.toLocaleString("en-US"); // Formatear fecha

document.getElementById("commentForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let newCommentHTML = ""; // Contenedor vacío en donde añadir nuevos comentarios

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      score: document.getElementById("rating").value, // Puntuación
      description: document.getElementById("comment").value, // Comentario
      user: localStorage.getItem("usuario"), // Usuario
      dateTime: date,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((datos) => {
      /* Añadir elementos HTML del nuevo comentario */
      newCommentHTML += `
                    <div class="comment ps-4">
                        <p class="py-2 m-auto mt-3"><strong>${datos.user}</strong> - ${datos.dateTime} -
                    `;
      for (let i = 1; i <= 5; i++) {
        if (i <= datos.score) {
          newCommentHTML += `<span class="fa fa-star checked"></span>`;
        } else {
          newCommentHTML += `<span class="fa fa-star"></span>`;
        }
      }
      newCommentHTML += ` 
                        </p>
                        <p class="desc m-auto py-2 mb-3">${datos.description} </p>
                    </div>
                    `;
      containerComment.innerHTML += newCommentHTML;
    });
});

/* ---------- FUNCIONES ---------- */

/* Mostrar info del producto */
function showProductInfo(array) {
  containerProduct.innerHTML = `
    <div class="col-12 row">
        <div class="py-5 card col-12 col-lg-7">
                    
            <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${array.images[0]}" class="d-block w-100" alt="..."> 
                    </div>
                    <div class="carousel-item">
                        <img src="${array.images[1]}" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="${array.images[2]}" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="${array.images[3]}" class="d-block w-100" alt="...">
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
            <h2 class="card-title title-product-info"><strong>${array.name}</strong></h2>
            <p class="card-description description-product-info">${array.description}</p>
            <p class="card-description category-product-info"><strong>Categoría</strong> <br> ${array.category}</p>
            <p class="card-soldcount soldCount-product-info"><strong>Cantidad de vendidos</strong> <br> ${array.soldCount}</p>
            <p class="card-cost cost-product-info"><strong>Precio</strong> <br> ${array.currency} ${array.cost}</p>
        </div>
    </div>
  `;
}

/* Mostrar comentarios */

function showComments(array) {
  array.forEach((element) => {
    commentHTML += `
              <div class="comment col-lg-7 ps-4">
                  <p class="py-2 m-auto mt-3"><strong>${element.user}</strong> - ${element.dateTime} -
          `;

    addStars(element);

    commentHTML += `    
                  </p>
                  <p class="desc m-auto py-2 mb-3">${element.description} </p>
              </div>
              `;
  });
  containerComment.innerHTML += commentHTML;
}

/* Agregar estrellas */

function addStars(data) {
  for (let i = 1; i <= 5; i++) {
    if (i <= data.score) {
      commentHTML += `<span class="fa fa-star checked"></span>`;
    } else {
      commentHTML += `<span class="fa fa-star"></span>`;
    }
  }
}

fetch (urlCatProd)
    .then((response) => response.json())
    .then((data) => {
      let prodsRela = data.products; // Obtener la info de cada producto
      getProdsRela (prodsRela);
    });

function getProdsRela (arr){
  arr.forEach(element => {
    if (element.id != productID){
      showProductsRela(element)
    }
  });
}

function showProductsRela(element){
  containerProdsRel.innerHTML +=`
  <div onclick="setProductID(${element.id})">
  <img src="${element.image}">
  <p>${element.name}</p>
  </div>
  `
}

function setProductID(id) {
  localStorage.setItem("productID", id); // Crea el localStorage con la key "productID"
  window.location = "product-info.html"; // Redirige a product-info.html
}