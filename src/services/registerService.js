
const User = require("../database/models/Users")


async function register(name, password, email) {

    try {
        const usuario = new User({
          name: name,
          password: password,
          email: email,
        });
        await usuario.generatePassword(usuario.password)

        await usuario.save();
        console.log('Usuario insertado correctamente');
        return true
      } catch (error) {
        console.error('Error al insertar usuario:', error);
        return false
      }
}

module.exports = {
    register
}