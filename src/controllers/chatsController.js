// Controller for the chats data
// -------------------------------

// Declare the service that will bring the info for the user
const chatService = require('../services/chatService')

/**
 * Function to retrieve the data of a chat from two users
 * @param {*} req The request object
 * @param {*} res The response object
 */
const getChatWithMessages = async (req, res) => {


    res.status(200).json()
};



// Export all the funcions
module.exports = {
    getChatWithMessages,
}