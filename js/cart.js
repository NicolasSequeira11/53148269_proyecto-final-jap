const urlCart = "https://japceibal.github.io/emercado-api/user_cart/25801.json";// URL con los JSON de los productos
const containerCart = document.getElementById("containerCart");
console.log(containerCart);


fetch(urlCart)
    .then((response) => response.json())
    .then((data) => {
        containerCart.innerHTML += `
        <table class="table table-white table-borderless">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">SubTotal</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row" class="d-flex justify-content-center"><img width="100px" src=${data.articles[0].image}></th>
                <td>${data.articles[0].name}</td>
                <td>${data.articles[0].currency} ${data.articles[0].unitCost}</td>
                <td><input type="number" min="0" id="count" value="${data.articles[0].count}" class="col-12 col-md-6"></td>
                <td><strong>${data.articles[0].currency} ${data.articles[0].unitCost}</strong></td>
            </tr>
        </tbody>
    </table>
        `;
    })
    .catch((error) => {
        console.error("Error al cargar los productos:", error);
    });
    