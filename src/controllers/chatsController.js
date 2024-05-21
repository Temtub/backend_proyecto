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


const getVariousChats = async (req, res) => {
    const { chats } = req.body;

    if (!chats || chats.length <= 0) {
        res.status(400).json({ msg: "Envia chats", status: false });
    } else {
        try {
            let chatsData = await chatService.getVariousChats(chats);
            res.status(200).json(chatsData);
        } catch (error) {
            res.status(500).json({ msg: "Error interno del servidor", status: false });
        }
    }
};


// Export all the funcions
module.exports = {
    getChatWithMessages,
    getVariousChats
}