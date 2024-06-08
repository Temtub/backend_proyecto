
const User = require("../database/models/Users")
const restful = require("../../restApi/index.js");


async function register(name, password, email) {

  try {
    const usuario = new User({
      name: name,
      password: password,
      email: email,
    });
    await usuario.generatePassword(usuario.password)

    await usuario.save();

    const data = {
      user : usuario.name,
      password : password
    }


    await restful("POST", "http://13.60.59.64:3004/login", data)

    console.log('Usuario insertado correctamente');
    return usuario
  } catch (error) {
    console.log(error)
    if(error.code === 11000){
      return 403
    }
    console.error('Error al insertar usuario:', error);
    return false
  }


}

module.exports = {
  register
}