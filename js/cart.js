const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"; // URL con los JSON de los productos
const containerCart = document.getElementById("containerCart");
const containerTotal = document.getElementById("cart-total");
console.log(containerCart);

fetch(urlCart)
  .then((response) => response.json())
  .then((data) => {
    const articles = data.articles;
    showTotal(articles);
    showNewArticle();
    showArticles(articles);
  })
  .catch((error) => {
    console.error("Error al cargar los productos:", error);
  });


function showArticles(array) {

  if (array.length > 0) {
    array.forEach((article) => {
      containerCart.innerHTML += `
          <hr>

          <div class="article-container">

            <div class="col-2">
              <img src="${article.image}" class="col-12">
            </div>

            <div class="col-10 d-flex m-auto">
            
              <div class="d-flex col-6 col-md-7">
                <p class="my-auto ps-2">${article.name}</p>
              </div>

              <div class="d-flex col-1 col-md-2">
                <input type="number" class="m-auto col-md-8 col-12 d-flex article-input" 
                  min="0" id="count" value="${article.count}"></p>
              </div>

              <div class="d-flex col-5 col-md-3">
                <p class="m-auto ps-2">${article.unitCost} ${article.currency}</p>
              </div>

            </div>
                          
          </div>


                      `;
    });
  } else {
    // Alerta para cuando no se encuentran productos
    containerCart.innerHTML += `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
  }
}



function showNewArticle() {
    const getName = localStorage.getItem("productName");
    const getPrice = localStorage.getItem("productPrice");
    const getImage = localStorage.getItem("productImage");

      containerCart.innerHTML += `
          <hr>

          <div class="article-container">

            <div class="col-2">
              <img src="${getImage}" class="col-12">
            </div>

            <div class="col-10 d-flex m-auto">
            
              <div class="d-flex col-6 col-md-7">
                <p class="my-auto ps-2">${getName}</p>
              </div>

              <div class="d-flex col-1 col-md-2">
                <input type="number" class="m-auto col-md-8 col-12 d-flex article-input" 
                  min="0" id="count" value="1"></p>
              </div>

              <div class="d-flex col-5 col-md-3">
                <p class="m-auto ps-2">${getPrice} USD</p>
              </div>

            </div>
                          
          </div>


    `;

}


function showTotal(array) {

  if (array.length > 0) {
    array.forEach((article) => {
      containerTotal.innerHTML += `
                      <div class="article-container d-flex">
                        <div class="d-flex col-6">
                          <p class="my-auto">Total</p>
                        </div>
                        <div class="d-flex col-6">
                          <p class="d-flex col-12 justify-content-end my-auto">
                            ${article.unitCost} ${article.currency}</p>
                        </div>
                      </div>
                      `;
    });
  } else {
    // Alerta para cuando no se encuentran productos
    containerTotal.innerHTML += `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
  }
}
