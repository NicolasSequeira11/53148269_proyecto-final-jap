const form = document.getElementById("formulario");

var ultimoSegmento = window.location.pathname.split('/').pop(); //separo el final de la ruta en la que se esta parado
// Validar inicio de sesión
if (ultimoSegmento == 'login.html') {
    form.addEventListener('submit', function (event) {
        const datos = document.getElementsByClassName("datos");

        if (datos[0].value !== '' && datos[1].value !== '') {
            event.preventDefault();
            window.location.href = "index.html";
            sessionStorage.setItem("logueo", "true");
            localStorage.setItem("usuario", datos[0].value);
        }
    });
}

// Verificar logueo
function verificarLogueo() {

    if (ultimoSegmento !== 'login.html' && sessionStorage.getItem("logueo") !== "true") {
            window.location.href = "login.html";
    } else {
        const display = document.getElementById("displayusuario");
        const datos = localStorage.getItem("usuario");
        
        display.innerHTML = `<div class="dropdown">
                                <a class="userDropDown userDropDown-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-person-fill me-2" style="font-size: 20px"></i>` + datos +
                                `<a/>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
                                    <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
                                </ul>
                            </div>`;
        
        removeSesion.addEventListener("click", ()=>{
            sessionStorage.removeItem("logueo");
        });
    }
    
}

window.onload = verificarLogueo; // Al cargar la página la primera función que carga es verificarLogueo

