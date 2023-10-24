const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"; // URL con los JSON de los productos
const containerCart = document.getElementById("containerCart"); // Contenedor del carrito

const premium = document.getElementById("premiumRad"); // input 
const express = document.getElementById("expressRad");
const standard = document.getElementById("standardRad");

fetch(urlCart)
  .then((response) => response.json())
  .then((data) => {
    const localStorageCart = JSON.parse(localStorage.getItem('cart')); // Datos del localStorage
    
    showArticles(localStorageCart);
    totalCart();

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
        <div class="col-12 d-flex flex-wrap m-auto">

          <div class="col-12 col-md-6 justify-content-center pb-2 pb-md-0 d-flex">
            <div class="d-flex col-6 col-md-4">
              <img src="${article.image}" class="col-12">
            </div>
            <div class="d-flex col-6 justify-content-center col-md-8">
              <p class="my-auto col-12 ps-5 ps-md-2">${article.name}<br>${article.unitCost} USD</p>
            </div>
          </div>

          <div class="col-12 col-md-6 justify-content-center pt-2 pt-md-0 d-flex">
            <div class="d-flex col-2 col-md-4 justify-content-center my-auto">
              <input type="number" class="m-auto col-md-8 col-12 d-flex article-input count" 
                min="0" value="${article.count}" data-article-id="${article.id}">
            </div>
            <div class="d-flex col-4 col-md-6 justify-content-center my-auto">
              <p class="m-auto article-price">${(article.unitCost * article.count)} ${article.currency}</p>
            </div>
            <div class="d-flex col-4 col-md-2 justify-content-end my-auto">
              <button class="btn bg-danger" id="btnCartDelete" data-article-id="${article.id}">
                <i class="bi bi-trash-fill text-white m-auto"></i>
              </button>
            </div>
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
      
      document.querySelectorAll('#btnCartDelete').forEach(function (button) {
        button.addEventListener('click', function (event) {
          // Aquí puedes acceder al artículo asociado al botón de eliminación y eliminarlo.
          const articleId = event.target.getAttribute('data-article-id');
      
          // Llama a una función para eliminar el artículo del carrito.
          eliminarArticuloDelCarrito(article.id);
          location.reload();
        });
      });
    });
  } else {
    containerCart.innerHTML += `<div class="alert-danger bg-danger alert-error-filter m-auto mt-2 mb-4 w-100">El carrito esta vacío</div>`;
  }
}

function eliminarArticuloDelCarrito(articleId) {
  // Obtener el array de artículos del carrito del localStorage
  const carrito = JSON.parse(localStorage.getItem('cart')) || [];

  // Encontrar el índice del artículo a eliminar en el array 
  const articleIndex = carrito.findIndex((article) => article.id === articleId);

  if (articleIndex !== -1) {
    // Eliminar el artículo del array 
    carrito.splice(articleIndex, 1);

    // Actualizar el localStorage con el carrito modificado
    localStorage.setItem('cart', JSON.stringify(carrito));

    // Eliminar la representación del artículo en la página
    const articleContainer = document.querySelector(`[data-article-id="${articleId}"]`);
    if (articleContainer) {
      articleContainer.remove();
    }
  }
}

// Calcular el total inicial
let initialTotal = 0;
function calculateInitialTotal(array) {
  initialTotal = array.reduce((acc, article) => acc + article.unitCost * article.count, 0);
}

function typePrices(total){
  let shippingCost = 0;
  if(premium.checked){
    shippingCost = total * 0.15;
  } else if (express.checked){
    shippingCost = total * 0.07;
  } else if (standard.checked){
    shippingCost = total * 0.05;
  }
  return shippingCost;
}

// Eventos para inputs Tipo de envío
premium.addEventListener("change", totalCart);
express.addEventListener("change", totalCart);
standard.addEventListener("change", totalCart);

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
  const newPrice = (unitCost * newQuantity);

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

  let newTotal = total + typePrices(total);

  // Actualizar el elemento que muestra el total del carrito
  const containerTotal = document.getElementById("cart-total");
  containerTotal.innerHTML = 
    `<div class="m-auto mb-3 d-flex justify-content-between">
      <p class="my-auto">Subtotal</p>
      <p class="my-auto">${total} USD</p>
    </div>

    <div class="m-auto my-3 d-flex justify-content-between">
      <p class="my-auto">Envio</p>
      <p class="my-auto">${typePrices(total)} USD</p>
    </div>

    <div class="m-auto mt-3 d-flex justify-content-between">
      <p class="my-auto">Total</p>
      <p class="my-auto">${newTotal} USD</p>
    </div>
    `;
} 


(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      const tarjet = document.getElementById("tarjeta");
      const trans = document.getElementById("transferencia");

      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        
        if(tarjet.checked){
          showRequired(document.getElementById("numTarjeta"));
          showRequired(document.getElementById("cvv"));
          showRequired(document.getElementById("vencTarjeta"));
          deleteRequired(document.getElementById("numCuenta"));
        }else if(trans.checked){
          deleteRequired(document.getElementById("numTarjeta"));
          deleteRequired(document.getElementById("cvv"));
          deleteRequired(document.getElementById("vencTarjeta"));
          showRequired(document.getElementById("numCuenta"));
        }
      }else{
        document.getElementById("cartDiv").innerHTML += `
      <div class="alert alert-success mt-3" role="alert">
        ¡Has comprado con exito!
      </div>
      `;
        form.classList.remove("was-validated");
      }

      form.classList.add('was-validated')
      }, false)
  })

})()

function showRequired(elem){
  elem.setAttribute("required", "required");
}

function deleteRequired(elem){
  elem.removeAttribute("required");
}


