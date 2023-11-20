const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE ULTRA SECRETA";
const cors = require("cors");

const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost", 
    user: "root", 
    password: "1234", 
    database: "articles", 
    connectionLimit: 5
  });

app.use(express.json());
app.use(cors({origin: '*'}));

const port = 3000; // Puedes cambiar el puerto si es necesario

app.get("/", (req, res) => {
    // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
    res.send("<h1>Bienvenid@ al servidor</h1>");
});


app.post("/cart", async (req, res) => { 
    let conn;
    try {
      conn = await pool.getConnection();
      console.log('Conexión a la base de datos establecida correctamente');
  
      const response = await conn.query(
        `INSERT INTO cart( id, name, count, unitCost, currency, image) 
         VALUES(?, ?, ?, ?, ?, ?)`,
        [req.body.id, req.body.name, req.body.count, req.body.unitCost, req.body.currency, req.body.image]);
      
      res.json({...req.body});
  
    }catch(error){
        console.error('Error en la base de datos:', error);
      res.status(500).json({message: "se rompio el servidor"})
    } finally {
      if (conn) conn.release(); //release to pool
    }
});

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    if(username==="admin" && password==="admin"){
        const token = jwt.sign({username}, SECRET_KEY);
        res.status(200).json({token});
    } else {
        res.status(401).json({message:"Usuario y/o contraseña incorrecta."});
    }
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