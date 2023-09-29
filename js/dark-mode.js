const darkModeToggle = document.getElementById("btnDarkMode");
const logo = document.getElementById("img-logo");
const logoMobile = document.getElementById("img-logo-mobile");

/* Verificar si el modo oscuro está habilitado en el localStorage */
let isDarkMode = localStorage.getItem("darkMode") === "enabled";


/* Función para habilitar el dark mode */
function enableDarkMode() {

  /* Cambiar valor de las variables de colores */
  document.documentElement.style.setProperty("--color-white-light", "#212529");
  document.documentElement.style.setProperty("--color-black-light", "#dee2e6");
  document.documentElement.style.setProperty("--color-div-light", "#343a40");
  document.documentElement.style.setProperty("--color-div-hover-light", "#343a40");
  document.documentElement.style.setProperty("--color-text-hover-light", "#8bb9fe");
  document.documentElement.style.setProperty("--color-blue", "#8bb9fe");

  /* Cambiar logo */
  logo.setAttribute("src", "img/logo-jap-darkmode-2022.svg");
  logoMobile.setAttribute("src", "img/logo-jap-darkmode-2022.svg");

  /* Cambiar valor del localStorage a "enabled" */
  localStorage.setItem("darkMode", "enabled");
  isDarkMode = true;

}

/* Función para deshabilitar el modo oscuro */
function disableDarkMode() {

  /* Cambiar valor de las variables de colores */
  document.documentElement.style.setProperty("--color-white-light", "#ffffff");
  document.documentElement.style.setProperty("--color-black-light", "#212529");
  document.documentElement.style.setProperty("--color-div-light", "#ffffff");
  document.documentElement.style.setProperty("--color-div-hover-light", "#dee2e6");
  document.documentElement.style.setProperty("--color-text-hover-light", "#212529");
  document.documentElement.style.setProperty("--color-blue", "#0087F7");

  /* Cambiar logo */
  logo.setAttribute("src", "img/logo-jap-2022.svg");
  logoMobile.setAttribute("src", "img/logo-jap-2022.svg");

  /* Cambiar valor del localStorage a "enabled" */
  localStorage.setItem("darkMode", "disabled");
  isDarkMode = false;

}

/* Alternancia del dark mode */
function toggleDarkMode() {
  if (isDarkMode) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}

/* Asignar evento al botón de alternancia */
darkModeToggle.addEventListener("click", toggleDarkMode);

/* Aplicar el modo oscuro si está habilitado en el localStorage */
if (isDarkMode) {
  enableDarkMode();
}
