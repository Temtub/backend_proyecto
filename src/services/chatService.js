// Service that will control the information from the BD for all chats
// ----------------

// Get the Chat Model to bring the data
const Chat = require("../database/models/Chat");
const Message = require("../database/models/Message")

/**
 * Obtain the a chat with its messages
* @param {*} chatId 
 * @returns 
 */
async function getChatWithMessages(chatId) {
    try {
        // Search the chat and get all his messages (populate remplaza los ids por los mensajes)
        const chat = await Chat.findById(chatId).populate('messages').exec();

        if (!chat) {
            return false;
        }
        return chat;
    } catch (error) {
        return { error: error.message };
    }
}

/**
 * Gets all chats from an array of ids 
 * @param {*} ids Array of ids you want to search
 * @returns All chatsl found
 */
const getVariousChats = async (ids) => {
    try {
        // Search the chats form the id
        const chats = await Chat.find({ _id: { $in: ids } });

        // If theres no chat throws an error
        if (!chats || chats.length === 0) {
            return { status: false, msg: "No hay chats aún" };
        }
        return chats;
    } catch (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }
}

const setNewMessage = async (time, message, chatId, userId) => {

    try {
        // Create the info of the message
        const newMessage = new Message({
            content: message,
            sender: userId,
            receiver: chatId,
            timestamp: time
        });

        // Save the message
        const savedMessage = await newMessage.save();

        // Find the chat by id and add the new message
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return false
        }

        chat.messages.push(savedMessage._id);

        // Save the chat in the bd
        await chat.save();

        return savedMessage;
    } catch (error) {
        console.error('Error creating message and adding to chat:', error);
        throw error;
    }
};
module.exports = {
    getChatWithMessages,
    getVariousChats,
    setNewMessage
}