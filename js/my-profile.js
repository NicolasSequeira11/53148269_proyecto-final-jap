// Obtener inputs del perfil

const profileFirstName = document.getElementById("profileFirstName");
const profileSecondName = document.getElementById("profileSecondName");
const profileFirstLastname = document.getElementById("profileFirstLastname");
const profileSecondLastname = document.getElementById("profileSecondLastname");
const profileEmail = document.getElementById("profileEmail");
const profileTel = document.getElementById("profileTel");

// Obtener el email con el que se loguea
const emailLogin = localStorage.getItem("usuario");

document.addEventListener("DOMContentLoaded", ()=>{
    profileEmail.value = emailLogin; // El valor del input email obtiene el valor del email de login
});
