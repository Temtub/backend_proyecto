//This is the router for all the actions that belongs the user
//-----------------------
const registerRouter = require("express").Router()// Create the router

const registerController = require('../controllers/registerController')

registerRouter.post('/', registerController.register );

module.exports = registerRouter