const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"; // URL con los JSON de los productos
const containerCart = document.getElementById("containerCart"); // Contenedor del carrito
const containerTotal = document.getElementById("cart-total"); // Contenedor del total del carrito


fetch(urlCart)
  .then((response) => response.json())
  .then((data) => {
    const articles = data.articles; // Datos de la API
    const localStorageCart = JSON.parse(localStorage.getItem('cart')); // Datos del localStorage
    const allArticles = articles.concat(localStorageCart); // Datos del API + localStorage

    showTotal(allArticles);
    showArticles(allArticles);

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
}

function showTotal(array) {

  if (array.length > 0) {
      containerTotal.innerHTML = ''; // Limpia el contenido actual

      // Calcula el total del carrito
      const total = array.reduce((acc, article) => acc + article.unitCost * article.count, 0);

      containerTotal.innerHTML += `
          <div class="article-container d-flex">
              <div class="d-flex col-6">
                  <p class="my-auto">Total</p>
              </div>
              <div class="d-flex col-6">
                  <p class="d-flex col-12 justify-content-end my-auto">
                      ${total.toFixed(2)} USD
                  </p>
              </div>
          </div>
          <button class="col-12 mt-3 btn bg-danger text-white" id="btnClearCart">Limpiar carrito</button>`;
  } else {
      containerTotal.innerHTML = `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
  }
}


