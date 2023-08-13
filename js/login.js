const form = document.getElementById("formulario");

var ultimoSegmento = window.location.pathname.split('/').pop();//separo el final de la ruta en la que se esta parado

if (ultimoSegmento == 'login.html') {
    form.addEventListener('submit', function (event) {
        const datos = document.getElementsByClassName("datos");

        if (datos[0].value !== '' && datos[1].value !== '') {
            event.preventDefault();
            window.location.href = "index.html";
            sessionStorage.setItem("logueo", "true");
        }
    });
}

function verificarLogueo() {

    if (ultimoSegmento !== 'login.html' && sessionStorage.getItem("logueo") !== "true") {
            window.location.href = "login.html";
        }
    
}
window.onload = verificarLogueo;

