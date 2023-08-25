const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect('mongodb+srv://abravokeller:MbVNv85GPGRGJbG2@cluster0.cw7yuhj.mongodb.net/?retryWrites=true&w=majority')
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