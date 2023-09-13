const {connection} = require('../database/connection.js');
const express = require ('express');
const cors = require('cors');
//Importar rutas desde Routes
const routesArticle = require('../routes/article.js');
const { PORT } = require('../config.js');

//conexión a la bd
connection();

//crear servidor node
const app = express();

//configurar cors
app.use(cors());

//convertir body a objeto js
app.use(express.json()); //recibir datos con content-type app/json
app.use(express.urlencoded({extended: true})); //Recibiendo datos con form-urlencoded

//Cargar las rutas
app.use('/', routesArticle)

//Crear servidor y escuchar peticiones http
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
