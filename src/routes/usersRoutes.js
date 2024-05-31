//This is the router for all the actions that belongs the user
//-----------------------
const userRouter = require("express").Router()// Create the router

const usersController = require('../controllers/usersController')

userRouter.get('/:userId', usersController.getOneUser );
userRouter.post('/', usersController.createUser);
userRouter.post("/newChat", usersController.createNewChat)
userRouter.post("/addFriendToUser", usersController.addFriendToUser)
userRouter.post("/addDataToUser", usersController.addDataToUser)

module.exports = userRouter