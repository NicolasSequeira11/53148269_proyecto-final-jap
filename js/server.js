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
let cats_products101 = require("../json/cats_products/101.json");
let cats_products102 = require("../json/cats_products/102.json");
let cats_products103 = require("../json/cats_products/103.json");
let cats_products104 = require("../json/cats_products/104.json");
let cats_products105 = require("../json/cats_products/105.json");
let cats_products106 = require("../json/cats_products/106.json");
let cats_products107 = require("../json/cats_products/107.json");
let cats_products108 = require("../json/cats_products/108.json");
let cats_products109 = require("../json/cats_products/109.json");

app.get('/json/cats_products/:id'+".json", (req, res) => {
    const cat_productId = parseInt(req.params.id, 10); // Convertir a número con base 10
    
    switch (cat_productId) {
        case 101:
            res.json(cats_products101);
            break;
        case 102:
            res.json(cats_products102);
        break;
        case 103:
            res.json(cats_products103);
        break;
        case 104:
            res.json(cats_products104);
        break;
        case 105:
            res.json(cats_products105);
        break;
        case 106:
            res.json(cats_products106);
        break;
        case 107:
            res.json(cats_products107);
        break;
        case 108:
            res.json(cats_products108);
        break;
        case 109:
            res.json(cats_products109);
        break;
    }
});

//Devolver json de products
let products40281 = require("../json/products/40281.json");
let products50741 = require("../json/products/50741.json");
let products50742 = require("../json/products/50742.json");
let products50743 = require("../json/products/50743.json");
let products50744 = require("../json/products/50744.json");
let products50921 = require("../json/products/50921.json");
let products50922 = require("../json/products/50922.json");
let products50923 = require("../json/products/50923.json");
let products50924 = require("../json/products/50924.json");
let products50925 = require("../json/products/50925.json");
let products60801 = require("../json/products/60801.json");
let products60802 = require("../json/products/60802.json");
let products60803 = require("../json/products/60803.json");
let products60804 = require("../json/products/60804.json");

app.get('/json/products/:id'+".json", (req, res) => {
    const productId = parseInt(req.params.id, 10); // Convertir a número con base 10
    
    switch (productId) {
        case 40281:
            res.json(products40281);
            break;
        case 50741:
            res.json(products50741);
        break;
        case 50742:
            res.json(products50742);
        break;
        case 50743:
            res.json(products50743);
        break;
        case 50744:
            res.json(products50744);
        break;
        case 50921:
            res.json(products50921);
        break;
        case 50922:
            res.json(products50922);
        break;
        case 50923:
            res.json(products50923);
        break;
        case 50924:
            res.json(products50924);
        break;
        case 50925:
            res.json(products50925);
        break;
        case 60801:
            res.json(products60801);
        break;
        case 60802:
            res.json(products60802);
        break;
        case 60803:
            res.json(products60803);
        break;
        case 60804:
            res.json(products60804);
        break;
    }
});


let products_comments40281 = require("../json/products_comments/40281.json");
let products_comments50741 = require("../json/products_comments/50741.json");
let products_comments50742 = require("../json/products_comments/50742.json");
let products_comments50743 = require("../json/products_comments/50743.json");
let products_comments50744 = require("../json/products_comments/50744.json");
let products_comments50921 = require("../json/products_comments/50921.json");
let products_comments50922 = require("../json/products_comments/50922.json");
let products_comments50923 = require("../json/products_comments/50923.json");
let products_comments50924 = require("../json/products_comments/50924.json");
let products_comments50925 = require("../json/products_comments/50925.json");
let products_comments60801 = require("../json/products_comments/60801.json");
let products_comments60802 = require("../json/products_comments/60802.json");
let products_comments60803 = require("../json/products_comments/60803.json");
let products_comments60804 = require("../json/products_comments/60804.json");

app.get('/json/products_comments/:id'+'.json', (req, res) => {
    const product_commentsId = parseInt(req.params.id, 10); // Convertir a número con base 10
    
    switch (product_commentsId) {
        case 40281:
            res.json(products_comments40281);
            break;
        case 50741:
            res.json(products_comments50741);
        break;
        case 50742:
            res.json(products_comments50742);
        break;
        case 50743:
            res.json(products_comments50743);
        break;
        case 50744:
            res.json(products_comments50744);
        break;
        case 50921:
            res.json(products_comments50921);
        break;
        case 50922:
            res.json(products_comments50922);
        break;
        case 50923:
            res.json(products_comments50923);
        break;
        case 50924:
            res.json(products_comments50924);
        break;
        case 50925:
            res.json(products_comments50925);
        break;
        case 60801:
            res.json(products_comments60801);
        break;
        case 60802:
            res.json(products_comments60802);
        break;
        case 60803:
            res.json(products_comments60803);
        break;
        case 60804:
            res.json(products_comments60804);
        break;
    }
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