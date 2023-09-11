const mongoose = require('mongoose');
const { dbUrl } = require('../config');

const connection = async () => {
  try {
    await mongoose.connect(dbUrl)
    console.log('Successful connection')
  } 
  catch (error){
    console.log(error)
    throw new Error ('no se ha podido hacer la conexión');
  }
}

module.exports = {
  connection
}