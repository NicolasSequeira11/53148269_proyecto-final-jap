const navbarContainer = document.getElementById("navbar-container");

navbarContainer.innerHTML = 
`
<div class="container w-100">
      <button class="navbar-toggler me-5 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i class="bi bi-list icon" style="font-size: 40px;"></i>
      </button>
      <a href="index.html" class="nav-logo d-none d-lg-flex" ><img src="img/logo-jap-2022.svg" id="img-logo" alt=""></a>
      <a href="index.html" class="nav-logo-mobile d-flex d-lg-none" ><img src="img/logo-jap-2022.svg" id="img-logo-mobile" alt=""></a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav justify-content-between">
          <li class="nav-item">
            <a class="nav-link" href="index.html">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="categories.html">Categorías</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="sell.html">Vender</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="displayusuario" href="login.html">Iniciar Sesión</a>
          </li>
          <li class="nav-item cursor-active">
            <a href="cart.html">
              <i class="bi bi-bag-fill icon-cart" id="iconCart">
                <span class="nav-spanCart" id="spanCart"></span>       
              </i>
            </a>      
          </li>
          <li class="nav-item cursor-active" id="btnDarkMode">
            <i class="bi bi-moon-stars-fill icon"></i>
          </li>
        </ul>
      </div>
    </div>
`;