// Obtener input mail
const profileEmail = document.getElementById("profileEmail");

// Obtener el email con el que se loguea
const emailLogin = localStorage.getItem("usuario");

const btnSave = document.getElementById("btnSaveProfile");

btnSave.addEventListener("click", ()=>{

    // Obtener inputs del perfil al momento del click
    const profileFirstName = document.getElementById("profileFirstName").value;
    const profileSecondName = document.getElementById("profileSecondName").value;
    const profileFirstLastname = document.getElementById("profileFirstLastname").value;
    const profileSecondLastname = document.getElementById("profileSecondLastname").value;
    const profileTel = document.getElementById("profileTel").value;

    localStorage.setItem("FirstName", profileFirstName);
    localStorage.setItem("SecondName", profileSecondName);
    localStorage.setItem("FirstLastName", profileFirstLastname);
    localStorage.setItem("SecondLastName", profileSecondLastname);
    localStorage.setItem("Tel", profileTel);
})

// Obtener datos del perfil del localStorage
const FirstName = localStorage.getItem("FirstName");
const SecondName = localStorage.getItem("SecondName");
const FirstLastname = localStorage.getItem("FirstLastName");
const SecondLastname = localStorage.getItem("SecondLastName");
const Tel = localStorage.getItem("Tel");



document.addEventListener("DOMContentLoaded", ()=>{
    profileEmail.value = emailLogin; // El valor del input email obtiene el valor del email de login
    
    profileFirstName.value = FirstName;
    profileSecondName.value = SecondName;
    profileFirstLastname.value = FirstLastname;
    profileSecondLastname.value = SecondLastname;
    profileTel.value = Tel;
});
