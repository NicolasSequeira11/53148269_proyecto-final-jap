const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"; // URL con los JSON de los productos
const containerCart = document.getElementById("containerCart");
const containerTotal = document.getElementById("cart-total");
console.log(containerCart);

fetch(urlCart)
  .then((response) => response.json())
  .then((data) => {
    const articles = data.articles; // Datos de la API
    const localStorageCart = JSON.parse(localStorage.getItem('cart')); // Datos del localStorage
    const allArticles = articles.concat(localStorageCart); // Datos del API + localStorage

    showTotal(allArticles);
    showArticles(allArticles);

    // Agregar un evento input a los campos de cantidad
    const countInputs = document.querySelectorAll('.count');
    countInputs.forEach((countInput, index) => {
      countInput.addEventListener('input', (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        const unitCost = parseFloat(countInput.parentElement.parentElement.parentElement.getAttribute('data-unitCost'));
        const subtotal = newQuantity * unitCost;

        // Actualiza el valor de la cantidad en el array y en el localStorage
        allArticles[index].count = newQuantity;
        localStorage.setItem('cart', JSON.stringify(allArticles));

        // Actualiza el subtotal en el DOM
        const subtotalElement = countInput.parentElement.parentElement.parentElement.querySelector('.article-subtotal');
        subtotalElement.textContent = `${subtotal.toFixed(2)} ${allArticles[index].currency}`;

        // Actualiza el total
        showTotal(allArticles);
      });
    });
  })
  .catch((error) => {
    console.error("Error al cargar los productos:", error);
  });

function showArticles(array) {

  if (array.length > 0) {
    array.forEach((article, index) => {
      containerCart.innerHTML += `
        <hr>
        <div class="article-container" data-unitCost="${article.unitCost}">
  
          <div class="col-2">
            <img src="${article.image}" class="col-12">
          </div>
  
          <div class="col-10 d-flex m-auto">
  
            <div class="d-flex col-6 col-md-7">
              <p class="my-auto ps-2">${article.name}</p>
            </div>
  
            <div class="d-flex col-1 col-md-2">
              <input type="number" class="m-auto col-md-8 col-12 d-flex article-input count" 
                min="0" id="count" value="${article.count}">
            </div>
  
            <div class="d-flex col-4 col-md-2">
              <p class="m-auto ps-2 article-price">${article.unitCost} ${article.currency}</p>
            </div>
  
            <div class="d-flex col-2 col-md-3">
              <p class="m-auto ps-2 article-subtotal">${(article.unitCost * article.count).toFixed(2)} ${article.currency}</p>
            </div>
  
          </div>
  
        </div>`;
    });
  } else {
    containerCart.innerHTML += `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
  }
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
          </div>`;
  } else {
    containerTotal.innerHTML = `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
  }
}

