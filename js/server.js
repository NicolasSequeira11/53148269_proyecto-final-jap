const express = require('express');
const app = express();

app.use(express.json());
const port = 3000; // Puedes cambiar el puerto si es necesario

app.get("/", (req, res) => {
    // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
    res.send("<h1>Bienvenid@ al servidor</h1>");
  });

// Devolver json de cart
let cart = require("../json/cart/buy.json");
app.get("/json/cart", (req, res) => {
    res.json(cart);
});

//Devolver json de cats
let cats = require("../json/cats/cat.json");
app.get('/json/cats', (req, res) => {
    res.json(cats);
});

//Devolver json de cats_product

app.get('/json/cats_products/:id'+".json", (req, res) => {
    res.json(require("../json/cats_products/" + req.params.id + ".json"));
});

//Devolver json de products

app.get('/json/products/:id'+".json", (req, res) => {
    res.json(require("../json/products/" + req.params.id + ".json"));
});

//Devolver json comments

app.get('/json/products_comments/:id'+'.json', (req, res) => {
    res.json(require("../json/products_comments/" + req.params.id + ".json"));
});

//Devolver json de sell
let sell = require("../json/sell/publish.json");
app.get('/json/sell', (req, res) => {
    res.json(sell);
});

//Devolver json de user_cart
let user_cart = require("../json/user_cart/25801.json");
app.get('/json/user_cart', (req, res) => {
    res.json(user_cart);
});



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});