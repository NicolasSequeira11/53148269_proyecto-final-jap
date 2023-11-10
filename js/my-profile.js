// Obtener input mail
const profileEmail = document.getElementById("profileEmail");

// Obtener el email con el que se loguea
const emailLogin = localStorage.getItem("usuario");

const btnSave = document.getElementById("btnSaveProfile");

const defaultImageURL = "https://cdn.icon-icons.com/icons2/3217/PNG/512/add_user_profile_person_avatar_icon_196535.png";

//Validación del formulario con boostrap
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

    // Recuperar la imagen seleccionada
    const selectedProfileImage = document.getElementById("selectedProfileImage");
    const storedImage = localStorage.getItem("profileImage");

    if (storedImage) {
        selectedProfileImage.style.display = "block";
        selectedProfileImage.src = storedImage;
    } else {
        // Si no hay imagen en localStorage, mostrar la imagen predeterminada
        selectedProfileImage.src = defaultImageURL;
    }
})

// Obtener datos del perfil del localStorage
const FirstName = localStorage.getItem("FirstName");
const SecondName = localStorage.getItem("SecondName");
const FirstLastname = localStorage.getItem("FirstLastName");
const SecondLastname = localStorage.getItem("SecondLastName");
const Tel = localStorage.getItem("Tel");
const imagenProfile = localStorage.getItem("profileImage");
const imgProfile = document.getElementById("selectedProfileImage");



document.addEventListener("DOMContentLoaded", ()=>{
    profileEmail.value = emailLogin; // El valor del input email obtiene el valor del email de login
    
    profileFirstName.value = FirstName;
    profileSecondName.value = SecondName;
    profileFirstLastname.value = FirstLastname;
    profileSecondLastname.value = SecondLastname;
    profileTel.value = Tel;
    imgProfile.setAttribute("src", imagenProfile);
});

//Función para previsualizar la foto seleccionada por el usuario
function seleccionarFotoPerfil() {
  const profileImageInput = document.getElementById("profileImageInput");
  const selectedProfileImage = document.getElementById("selectedProfileImage");

  profileImageInput.addEventListener("change", function () {
    const file = profileImageInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imagenSeleccionada = e.target.result;// Guardar la imagen actual en una variable
        selectedProfileImage.src = imagenSeleccionada;
        selectedProfileImage.style.display = "block"; //Mostrar la imagen seleccionada

        localStorage.setItem("profileImage", imagenSeleccionada); //Guardar la imagen en localStorage 
      };

      reader.readAsDataURL(file);
    }
  });
}
