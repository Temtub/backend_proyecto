
const User = require("../database/models/Users")
const jwt = require("jsonwebtoken")

require('dotenv').config();

async function login(username, password) {

    try {
        // Busca un usuario con el nombre de usuario proporcionado
        const user = await User.findOne({ "name" : username });

        // console.log(user)
        if (!user) {
            // Si no se encuentra un usuario con el nombre de usuario proporcionado, devuelve false
            return false;
        }

        // Comprueba si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
        const isPasswordValid = await user.comparePassword(password);

        // console.log(isPasswordValid)

        if (!isPasswordValid) {
            // Si la contraseña no coincide, devuelve false
            return false;
        }

        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('La clave secreta para JWT no está definida');
        }
        // console.log(username)

        // Save the data that its not dangeros to send
        let name = user.name
        let email = user.email
        let id = user._id
        let friends = user.friends
        const data = {
            name,
            email,
            id,
            friends
        }
        const token = jwt.sign({data}, secretKey, {
            expiresIn: "1m"
        })

        // Si el nombre de usuario y la contraseña coinciden, devuelve true
        return token;
    } catch (error) {
        // Manejo de errores
        console.error('Error al intentar iniciar sesión:', error);
        return false;
    }
}

async function unTokenizar(token) {
    const secret = process.env.JWT_SECRET;
    
    try {
        const decoded = await jwt.verify(token, secret);
        return decoded ;
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.error('El token ha expirado');
            return false
        } else if (err.name === 'JsonWebTokenError') {
            console.error('El token es inválido');
            return false
        } else {
            console.error(err);
            return false
        }
    }
}

module.exports = {
    login,
    unTokenizar
}