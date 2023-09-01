const {validation} = require('../helpers/validation.js');
const Article = require('../models/Article.js');
const fs = require('fs')
const path = require('path');


const controller = {
  properties: (req, res) => {
    return res.status(200).json({
      message: 'I am a test of my article'
    })
  },

  testing1: (req, res) =>{
    console.log('se ejecutó el endpoint test');
    return res.status(200).json([{
      curso: 'Udemy, creando API REST para blog'
    },
    {
      curso: 'Udemy, creando API REST para blog'
    },
    ])
  },

  create: async (req, res) => {
    let params = req.body;

    try{
      validation(params)
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Error en la validacion'
      })
    }

    try{
    const article = new Article(params);
    const articleSaved = await article.save();
    if(!articleSaved){
      return res.status(400).json({
        status: 'error',
        message: 'No se ha guardado el articulo'
      })
    }
    return res.status(200).json({
      status: 'success',
      article: articleSaved,
      message: 'Article Saved'
    })
    }
    catch(error){
      return res.status(400).json({
        status: 'error',
        message: 'No se ha guardado el articulo'
      })
    }
  },

  getArticles: async (req, res) => {
    try{
      let articlesQuery = Article.find({})
      .sort({date: -1});

      if(req.params.ultimos){
        articlesQuery = articlesQuery.limit(3);
      }

      const articles = await articlesQuery;

      if(articles.length === 0){
        return res.status(404).json({
          status: 'error',
          message: 'No se han encontrado articulos'
        });
      }
      return res.status(200).json({
        status: 'success',
        counter: articles.length,
        articles
      });
    } catch (error){
      return res.status(404).json({
        status: 'error',
        message: 'Error al obtener articulos'
      });
    }
  },

  getArticle: async (req, res) => {
    let id = req.params.id;
    console.log(id)
    try{
      const article = await Article.findById(id);
      console.log(article)

      if(!article){
        return res.status(404).json({
          status: 'error',
          message: 'No se han encontrado articulos'
        });
      }

      return res.status(200).json({
        status: 'success',
        article
      });
    }
    catch (error){
      return res.status(404).json({
        status: 'error',
        message: 'Error al obtener el articulo'
      });
    }
  },

  deleteArticle: async (req, res) => {
    let id = req.params.id;
    try {
      const article = await Article.findOneAndDelete({_id: id});
      if(!article){
        return res.status(404).json({
          status: 'error',
          message: 'No se han encontrado el articulo'
        });
      }
      return res.status(200).json({
        status: 'Success',
        message: 'articulo borrado',
        article
      })
    }
    catch (error){
      return res.status(404).json({
        status: 'error',
        message: 'Error al borrar el articulo'
      });
    }
  },

  updateArticle: async (req, res) =>{
    let id = req.params.id;
    let params = req.body

    try{
      validation(params)
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Error en la validacion'
      })
    }

    try{
      const article = await Article.findOneAndUpdate({_id: id}, params, {new: true});
      if(!article){
        return res.status(404).json({
          status: 'error',
          message: 'El articulo no existe'
        });
      }
      return res.status(200).json({
        status: 'Success',
        message: 'articulo actualizado',
        article
      })
    }
    catch (error){
      return res.status(404).json({
        status: 'error',
        message: 'Error al actualizar el articulo'
      });
    }
  },

  upload: async (req, res) => {
    if(!req.file && !req.files){
      return res.status(404).json({
        status: 'error',
        message: 'No ha cargado ningun archivo'
      })
    }
    let fileName = req.file.originalname;
    let fileSplit = fileName.split('\.');
    let fileExtension = fileSplit[1];

    if(fileExtension != 'png' && fileExtension != 'jpg' && fileExtension != 'jpeg' && fileExtension != 'gif'){
      fs.unlink(req.file.path, (error) => {
        return res.status(404).json({
          status: 'error',
          message: 'archivo invalido'
        });
      })
    } else {
      let id = req.params.id;  
      try{
        const article = await Article.findOneAndUpdate({_id: id}, {image: req.file.filename}, {new: true});
        if(!article){
          return res.status(404).json({
            status: 'error',
            message: 'El articulo no existe'
          });
        }
        return res.status(200).json({
          status: 'Success',
          message: 'imagen del articulo actualizada',
          article
        })
      }
      catch (error){
        return res.status(404).json({
          status: 'error',
          message: 'Error al actualizar la imagen del articulo'
        });
      }
    }
    
  }, 

  image: (req, res) => {
    let file = req. params.file;
    let physicalPath = './imagenes/articulos/'+file;
    if (fs.existsSync(physicalPath)) {
      return res.sendFile(path.resolve(physicalPath));
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'La imagen no existe',
        file,
        physicalPath
      });
    }
  },

  search: async(req, res) => {
    let search = req.params.files;
    console.log(search)
    try{
    const findSearch = await Article.find({'$or': [
      {'title': {'$regex': search, '$options': 'i'}},
      {'content': {'$regex': search, '$options': 'i'}}
    ]})
    .sort({date: -1})
    if(findSearch && findSearch.length > 0){
      return res.status(200).json({
        status: 'Success',
        message: 'archivo encontrado',
        findSearch,
      })
    } else {
      return res.status(404).json({
        status: 'Fail',
        message: 'No ha encontrado el archivo',
      })
    }
    } catch (error){
      return res.status(404).json({
        status: 'error',
        message: 'Error al buscar archivos',
      })
    }
  },
}

module.exports = controller;