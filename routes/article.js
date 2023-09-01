const express = require('express');
const router = express.Router();
const {properties, testing1, create, getArticles, getArticle, deleteArticle, updateArticle, upload, image, search} = require('../controllers/article.js')
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './imagenes/articulos')
  },
  filename:  function (req, file, cb) {
    cb(null, 'article' + Date.now() + file.originalname)
  }
})

const uploadImg = multer({storage: storage})

//rutas de prueba
router.get('/properties', properties);
router.get('/testing1', testing1);

//Ruta Util
router.post('/create', create);
router.get('/articles/:ultimos?', getArticles);
router.get('/article/:id', getArticle);
router.delete('/article/:id', deleteArticle);
router.put('/article/:id', updateArticle);
router.post('/upload/:id', [uploadImg.single('file0')], upload);
router.get('/image/:file', image);
router.get('/search/:files', search)

module.exports = router;