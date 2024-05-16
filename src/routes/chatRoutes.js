//This is the router for all the actions that belongs the user
//-----------------------
const chatRouter = require("express").Router()// Create the router

const chatController = require('../controllers/chatsController')

chatRouter.get('/', chatController.getChatWithMessages );

module.exports = chatRouter