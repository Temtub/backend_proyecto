//This is the router for all the actions that belongs the user
//-----------------------
const userRouter = require("express").Router()// Create the router
const User = require("../database/models/Users");

// const clienteController = require('../../controllers/ClienteController')

userRouter.get('/', async (req, res, next) => {
    try {
        const person = await User.findOne({ 'name': 'Usuario Ejemplo' });
        console.log(person);
        res.json(person); // Envía el objeto encontrado como respuesta en formato JSON
    } catch (error) {
        next(error); // Pasa cualquier error a la función de manejo de errores
    }
});

module.exports = userRouter