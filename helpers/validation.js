const validator = require('validator');

const validation = (params) => {
  let valideTitle = !validator.isEmpty(params.title) && validator.isLength(params.title, {min: 5, max: undefined});
  let valideContent = !validator.isEmpty(params.content);

  if(!valideTitle || !valideContent){
  throw new Error ('Faltan datos por enviar');
  }
};

module.exports = {
  validation
}