// Obtener input mail
const profileEmail = document.getElementById("profileEmail");

// Obtener el email con el que se loguea
const emailLogin = localStorage.getItem("usuario");

const btnSave = document.getElementById("btnSaveProfile");

//Validación del formulario
(() => {
    'use strict';
  
    const profileForm = document.getElementById('profileForm');
  
    profileForm.addEventListener('submit', e => {
      if (!profileForm.checkValidity()) {
        e.preventDefault()
      }
  
      profileForm.classList.add('was-validated');
    }, false);
})();

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

function seleccionarFotoPerfil() {
  const profileImageInput = document.getElementById('profileImageInput');
  const profileImage = document.getElementById('profileImage');
  const selectedProfileImage = document.getElementById('selectedProfileImage');

  profileImageInput.addEventListener('change', function () {
      const file = profileImageInput.files[0];

      if (file) {
          const reader = new FileReader();

          reader.onload = function (e) {
              // Mostrar la imagen seleccionada en la etiqueta <i>

              selectedProfileImage.style.display = 'block'; // Mostrar la imagen seleccionada
              selectedProfileImage.src = e.target.result;
          };

          reader.readAsDataURL(file);
      }
  });
}


  

