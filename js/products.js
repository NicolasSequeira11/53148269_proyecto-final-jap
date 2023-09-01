const container = document.querySelector("#container-content"); // Constante que toma el contenedor div del HTML.
const asc = document.getElementById("ascendente"); // Boton filtro precio ascendente
const desc = document.getElementById("descendente"); // Boton filtro precio descendente
const rel = document.getElementById("relevancia"); // Boton filtro relevancia descendente
const rangoPrecio = document.getElementById("rangoPrecio"); // Boton filtro rango de precio
const limpiarFiltros = document.getElementById("limpiarFiltros"); // Boton limpiar filtros

const id = localStorage.getItem("catID");
const url = ("https://japceibal.github.io/emercado-api/cats_products/"+ id +".json"); // URL con los JSON de todas las categorías


        // FETCH

        fetch(url)
        .then(response => response.json())
        .then(data => {
            let products = data.products; // Constante para trabajar sobre la info de cada producto.
            
            // Función que muestra los productos
            function showProducts(array){
                let content = "";
            
            if(array.length > 0){
                array.forEach(product => {
                    content += 
                    `
                    <div class="col-xl-4 col-12 col-md-6 col-lg-3 container-products">
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
                container.innerHTML = 
                    `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
            }
            }

            showProducts(products);


            // FILTROS

            // Filtrar precio ascendente
            asc.addEventListener("click", ()=>{
                
                let ascendente =   
                products.sort((a, b) => {
                    if (a.cost < b.cost) {
                      return -1;
                    }
                });

                showProducts(ascendente);

            });


            // Filtrar precio descendente
            desc.addEventListener("click", ()=>{

                let descendente =   
                products.sort((a, b) => {
                    if (a.cost > b.cost) {
                      return -1;
                    }
                });

                showProducts(descendente);

            });    


            // Filtrar por relevancia descendente
            rel.addEventListener("click", ()=>{

                let relevancia =   
                products.sort((a, b) => {
                    if (a.soldCount > b.soldCount) {
                      return -1;
                    }
                });

                showProducts(relevancia);

            });    


            // Filtrar por rango de precio
            rangoPrecio.addEventListener("click", ()=>{

                let precioMin = document.getElementById("precioMinimo").value;
                let precioMax = document.getElementById("precioMaximo").value;

                let productosRangoPrecio =      
                products.filter((product) => product.cost >= precioMin && product.cost <= precioMax);

                showProducts(productosRangoPrecio);

            });


            // Limpiar filtros
            limpiarFiltros.addEventListener("click", ()=>{

                showProducts(products);

            }); 
            
            // FIN FILTROS
            
        })
        // Mensaje de error por si ocurre un error al cargar el fetch.
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });

        //FIN FETCH


        // BUSCADOR DE PRODUCTOS

        function buscarProductos() {
            const input = document.getElementById("buscar"); // Obtener input search
            let card = document.getElementsByClassName("col-xl-4 col-12 col-md-6 col-lg-3 container-products");
            let nombres = document.getElementsByClassName("card-title title-products"); // Obtener el texto del elemento en mayusculas
            let descripciones = document.getElementsByClassName("card-description description-products");
            
            // Mostrar u ocultar el elemento según si coincide con el texto ingresado
            for(let i=0; i<nombres.length; i++){
                let descripcion = descripciones[i].textContent.toUpperCase();
                let nombre = nombres[i].textContent.toUpperCase();
        
                if (descripcion.includes(input.value.toUpperCase()) || 
                    nombre.includes( input.value.toUpperCase() )) 
                {
                    card[i].style.display = 'block'; // Mostrar el elemento
                } else {
                    card[i].style.display = 'none'; // Ocultar el elemento
                }
            }
        }
        
        // FIN BUSCADOR DE PRODUCTOS