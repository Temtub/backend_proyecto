// Service that will control the information from the BD for all chats
// ----------------

// Get the Chat Model to bring the data
const Chat = require("../database/models/Chat");

// Define una función para obtener los datos del chat y sus mensajes
async function getChatWithMessages(chatId) {
    try {
        // Busca el chat por su ID y popula los mensajes asociados
        const chat = await Chat.findById(chatId).populate('messages').exec();
        
        // Si el chat no existe, devuelve un mensaje de error
        if (!chat) {
            return { error: "Chat not found" };
        }

        // Devuelve el chat con sus mensajes
        return chat;
    } catch (error) {
        // Si ocurre un error durante la búsqueda, devuelve un mensaje de error
        return { error: error.message };
    }
}

/**
 * Gets all chats from an array of ids 
 * @param {*} ids Array of ids you want to search
 * @returns All chatsl found
 */
const getVariousChats = async (ids) =>{
    try {
        // Search the chats form the id
        const chats = await Chat.find({ _id: { $in: ids } });

        // If theres no chat throws an error
        if (!chats || chats.length === 0) {
            return { error: "Chats not found" };
        }
        return chats;
    } catch (error) {
        console.error('Error fetching chats:', error);
        throw error;
    }
}
module.exports = {
    getChatWithMessages,
    getVariousChats
}