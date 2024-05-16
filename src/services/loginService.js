
const User = require("../database/models/Users")

async function login(username, password) {

    try {
        // Busca un usuario con el nombre de usuario proporcionado
        const user = await User.findOne({ "name" : username });

        
        if (!user) {
            // Si no se encuentra un usuario con el nombre de usuario proporcionado, devuelve false
            return false;
        }

        // Comprueba si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
        const isPasswordValid = await user.comparePassword(password);

        console.log(isPasswordValid)

        if (!isPasswordValid) {
            // Si la contraseña no coincide, devuelve false
            return false;
        }

        // Si el nombre de usuario y la contraseña coinciden, devuelve true
        return true;
    } catch (error) {
        // Manejo de errores
        console.error('Error al intentar iniciar sesión:', error);
        return false;
    }
}

module.exports = {
    login
}