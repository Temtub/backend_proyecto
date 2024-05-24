//This is the router for all the actions that belongs the user
//-----------------------
const loginRouter = require("express").Router()// Create the router

const loginController = require('../controllers/loginController')

loginRouter.post('/', loginController.login );
loginRouter.post('/token', loginController.unTokenizar );

module.exports = loginRouter