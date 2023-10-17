const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"; // URL con los JSON de los productos
const containerCart = document.getElementById("containerCart"); // Contenedor del carrito

// Calcular el total inicial
let initialTotal = 0;
function calculateInitialTotal(array) {
  initialTotal = array.reduce((acc, article) => acc + article.unitCost * article.count, 0);
}

fetch(urlCart)
  .then((response) => response.json())
  .then((data) => {
    const articles = data.articles; // Datos de la API
    const localStorageCart = JSON.parse(localStorage.getItem('cart')); // Datos del localStorage
    const allArticles = articles.concat(localStorageCart); // Datos del API + localStorage
    
    showArticles(allArticles);
    totalCart();

    /* Evento para limpiar el carrito */
    const btnClearCart = document.getElementById("btnClearCart");

    btnClearCart.addEventListener("click", ()=>{
      localStorage.removeItem("cart");

      // Limpiar la representación visual de los elementos del carrito
      containerCart.innerHTML = ''; // Borrar todos los articulos
      containerTotal.innerHTML = ''; // Borrar el total

      // Añadir un mensaje indicando que el carrito está vacío
      containerCart.innerHTML = 
        `<div class="bg-danger text-white text-center p-3 rounded">
          El carrito está vacío
        </div>`;
    });
  })
  .catch((error) => {
    console.error("Error al cargar los productos:", error);
  });

function showArticles(array) {
  
  if (array.length > 0) {
    array.forEach((article) => {
      containerCart.innerHTML += `
      <hr>
      <div class="article-container" data-unitCost="${article.unitCost}">
        <div class="col-2">
          <img src="${article.image}" class="col-12">
        </div>
        <div class="col-10 d-flex m-auto">
          <div class="d-flex col-6 col-md-7">
            <p class="my-auto ps-2">${article.name}<br>${article.unitCost} USD</p>
          </div>
          <div class="d-flex col-1 col-md-2">
            <input type="number" class="m-auto col-md-8 col-12 d-flex article-input count" 
              min="0" value="${article.count}" data-article-id="${article.id}">
          </div>
          <div class="d-flex col-5 col-md-3">
            <p class="m-auto ps-2 article-price">${(article.unitCost * article.count).toFixed(2)} ${article.currency}</p>
          </div>
        </div>
      </div>`;

      // Obtiene todos los elementos <input> con la clase "count"
      const countInputs = document.querySelectorAll('.count');

      // Agrega un evento input a cada elemento <input>
      countInputs.forEach(input => {
        input.addEventListener('input', (event) => {
          updatePrice(event.target);
        });
      });
    });
  } else {
    containerCart.innerHTML += `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
  }
}

// Actualiza el precio del producto según sus cantidades
function updatePrice(element) {
  // Encuentra el elemento padre del input
  const articleContainer = element.closest('.article-container');

  // Encuentra el elemento que muestra el precio en el mismo artículo
  const priceElement = articleContainer.querySelector('.article-price');

  // Obtiene el precio unitario del artículo desde el atributo de datos "data-unitCost"
  const unitCost = parseFloat(articleContainer.getAttribute('data-unitCost'));

  // Obtiene el nuevo valor de cantidad desde el input
  const newQuantity = parseInt(element.value);

  // Calcula el nuevo precio multiplicando la cantidad por el precio unitario
  const newPrice = (unitCost * newQuantity).toFixed(2);

  // Actualiza el elemento que muestra el precio
  priceElement.textContent = `${newPrice} USD`;

  totalCart();
}



// Actualiza el precio total del carrito
function totalCart() {
  // Encuentra todos los elementos de precio de artículos
  const priceArticles = document.querySelectorAll('.article-price');

  // Inicializar el total del carrito con la suma del precio de los articulos en el carrito
  let total = initialTotal;

  // Calcular el nuevo total sumando los precios de todos los artículos
  priceArticles.forEach(priceElement => {
    total += parseFloat(priceElement.textContent);
  });

  // Actualizar el elemento que muestra el total del carrito
  const containerTotal = document.getElementById("cart-total");
  containerTotal.innerHTML = 
    `<div class="m-auto d-flex justify-content-between">
      <p class="my-auto">Subtotal</p>
      <p class="my-auto">${total.toFixed(2)} USD</p>
    </div>`;
}




