const form = document.getElementById("formulario");

form.addEventListener('submit',function(){
    const datos = document.getElementsByClassName("datos");

    if(datos[0].value!=='' && datos[1].value!==''){
        event.preventDefault();
        window.location.href="index.html";
    }    
});
