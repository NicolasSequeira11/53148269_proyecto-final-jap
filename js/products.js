const container = document.querySelector("#container-content"); // Constante que toma el contenedor div del HTML.

const id = localStorage.getItem("catID");
const url =
  "https://japceibal.github.io/emercado-api/cats_products/" + id + ".json"; // URL con los JSON de todas las categorías

  

/* ---------- FETCH ---------- */

fetch(url)
.then((response) => response.json())
.then((data) => {
  let products = data.products; // Constante para trabajar sobre la info de cada producto.
  showProducts(products);

  // FILTROS

  /* Filtrar precio ascendente */
  document.getElementById("ascendente").addEventListener("click", () => {
    filtrarPrecioAscendente(products, products);
  });

  /* Filtrar precio descendente */
  document.getElementById("descendente").addEventListener("click", () => {
    filtrarPrecioDescendente(products, products);
  });

  /* Filtrar por relevancia descendente */
  document.getElementById("relevancia").addEventListener("click", () => {
    filtrarRelevanciaDescendente(products, products);
  });

  /* Filtrar por rango de precio */
  document.getElementById("rangoPrecio").addEventListener("click", () => {
    filtrarRangoPrecio(products);
  });

  /* Limpiar filtros */
  document.getElementById("limpiarFiltros").addEventListener("click", () => {
    showProducts(products);
  });

  // FIN FILTROS

})
/* Mensaje de error por si ocurre un error al cargar el fetch */
.catch((error) => {
  console.error("Error al cargar los productos:", error);
});



/* ---------- FUNCIONES ---------- */

/* Crear un localStorage para guardar el id de cada producto y usarlo al clickear en el */
function setProductID(id) {
  localStorage.setItem("productID", id); // Crea el localStorage con la key "productID"
  window.location = "product-info.html"; // Redirige a product-info.html
}

/* Mostrar productos */
function showProducts(array) {
  let content = "";

  if (array.length > 0) {
    array.forEach((product) => {
      content += `
                <div onclick="setProductID(${product.id})" class="col-xl-4 col-12 col-md-6 col-lg-3 cursor-active container-products">
                    <div class="card col-12 div-products">
                        <img class="card-image image-products" src="${product.image}">
                        <h2 class="card-title title-products">${product.name}</h2>
                        <p class="card-description description-products">${product.description}</p>
                        <p class="card-cost cost-products">Precio: ${product.currency} ${product.cost}</p>
                        <p class="card-soldcount soldCount-products">Cantidad vendida: ${product.soldCount}</p>
                    </div>
                </div>
                `;
      container.innerHTML = content;
    });
  } else {
    // Alerta para cuando no se encuentran productos
    container.innerHTML = `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
  }
}

/* Filtrar precio ascendente */
function filtrarPrecioAscendente(array, arrayShow) {
  array.sort((a, b) => {
    return a.cost - b.cost;
  });
  showProducts(arrayShow);
}

/* Filtrar precio descendente */
function filtrarPrecioDescendente(array, arrayShow) {
  array.sort((a, b) => {
    return b.cost - a.cost;
  });
  showProducts(arrayShow);
}

/* Filtrar relevancia descendente */
function filtrarRelevanciaDescendente(array, arrayShow) {
  array.sort((a, b) => {
    return b.soldCount - a.soldCount;
  });
  showProducts(arrayShow);
}

/* Filtrar rango de precio */
function filtrarRangoPrecio(array) {
  let productosRangoPrecio = array.filter(
    (product) =>
      product.cost >= document.getElementById("precioMinimo").value &&
      product.cost <= document.getElementById("precioMaximo").value
  );
  document.getElementById("precioMinimo").value = ""; // Limpiar input
  document.getElementById("precioMaximo").value = ""; // Limpiar input
  showProducts(productosRangoPrecio);

  /* Filtro precio ascendente luego de filtrar por precio */
  document.getElementById("ascendente").addEventListener("click", () => {
    filtrarPrecioAscendente(productosRangoPrecio, productosRangoPrecio);
  });

  /* Filtro precio descendente luego de filtrar por precio */
  document.getElementById("descendente").addEventListener("click", () => {
    filtrarPrecioDescendente(productosRangoPrecio, productosRangoPrecio);
  });

  /* Filtro relevancia descendente luego de filtrar por precio */
  document.getElementById("relevancia").addEventListener("click", () => {
    filtrarRelevanciaDescendente(productosRangoPrecio, productosRangoPrecio);
  });
}

/* Buscador de productos */
function buscarProductos() {
  let card = document.getElementsByClassName("col-xl-4 col-12 col-md-6 col-lg-3 container-products");
  let nombres = document.getElementsByClassName("card-title title-products"); // Obtener el texto del elemento en mayusculas
  let descripciones = document.getElementsByClassName("card-description description-products");

  /* Mostrar u ocultar el elemento según si coincide con el texto ingresado */
  for (let i = 0; i < nombres.length; i++) {
    let descripcion = descripciones[i].textContent.toUpperCase();
    let nombre = nombres[i].textContent.toUpperCase();

    if (
      descripcion.includes(document.getElementById("buscar").value.toUpperCase()) ||
      nombre.includes(document.getElementById("buscar").value.toUpperCase())
    ) {
      card[i].style.display = "block"; // Mostrar el elemento
    } else {
      card[i].style.display = "none"; // Ocultar el elemento
    }
  }
}