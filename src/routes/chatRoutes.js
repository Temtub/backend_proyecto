//This is the router for all the actions that belongs the user
//-----------------------
const chatRouter = require("express").Router()// Create the router

const chatController = require('../controllers/chatsController')

chatRouter.post('/get20groups', chatController.get20groups)
chatRouter.get('/getChat/:chatId', chatController.getChatWithMessages );
chatRouter.post('/chats', chatController.getVariousChats );
chatRouter.post('/newMessage', chatController.setNewMessage)
chatRouter.post('/addUserToChat', chatController.addUserToChat)

module.exports = chatRouter