const {connection} = require('./database/connection.js');
const express = require ('express');
const cors = require('cors');
//Importar rutas desde Routes
const routesArticle = require('./routes/article.js');

//conexión a la bd
connection();

//crear servidor node
const app = express();
const PORT = 3000

//configurar cors
app.use(cors());

//convertir body a objeto js
app.use(express.json()); //recibir datos con content-type app/json
app.use(express.urlencoded({extended: true})); //Recibiendo datos con form-urlencoded

//Cargar las rutas
app.use('/api', routesArticle)


//rutas de prueba
app.get('/test', (req, res) =>{
  console.log('se ejecutó el endpoint test');
  return res.status(200).json([{
    curso: 'Udemy, creando API REST para blog'
  },
  {
    curso: 'Udemy, creando API REST para blog'
  },
  ])
})

app.get('/test2', (req, res) =>{
  console.log('se ejecutó el endpoint test');
  return res.status(200).send(`
    <div>
      <h1>Primera página</h1>
    </div>
  `)
})

//Crear servidor y escuchar peticiones http
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
