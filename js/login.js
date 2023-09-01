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
        
        display.innerHTML = `<i class="bi bi-person-fill me-2" style="font-size: 20px"></i>` + datos;
        
        display.setAttribute("href", "my-profile.html");
        const removeSesion = document.getElementById("removeSesion");
        
        removeSesion.addEventListener("click", ()=>{
            sessionStorage.removeItem("logueo");
        });
    }
    
}

window.onload = verificarLogueo; // Al cargar la página la primera función que carga es verificarLogueo

