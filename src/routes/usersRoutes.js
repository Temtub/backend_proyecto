//This is the router for all the actions that belongs the user
//-----------------------
const userRouter = require("express").Router()// Create the router

const usersController = require('../controllers/usersController')

userRouter.get('/:userId', usersController.getOneUser );

module.exports = userRouter