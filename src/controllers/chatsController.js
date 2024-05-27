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
    const { chatId } = req.params;

    if (!chatId) {
        return res.status(400).json({ status: false, msg: "Envia una id de chat" });
    }

    try {
        const response = await chatService.getChatWithMessages(chatId);
        if (!response) {
            return res.status(404).json({ status: false, msg: "No se ha encontrado chat o ha ocurrido un error" });
        }

        return res.status(200).json({ status: true, data: response });
    } catch (error) {
        console.error("Error fetching chat with messages:", error);
        return res.status(500).json({ status: false, msg: "Error interno del servidor" });
    }
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

const setNewMessage = async (req, res) =>{

    const { time, message, chatId, userId } = req.body

    if(!time, !message, !chatId, !userId ){
        res.status(400).json({status: false, msg: "Falta informacion"})
    }
    let response = await chatService.setNewMessage(time, message, chatId, userId )
    console.log(response)
    if(!response){
        res.status(404).json({status: false, msg : "Chat no encontrado"})
    }
    else{
        res.status(200).json(response)
    }
}

const get20groups = async (req, res) =>{
    let response = await chatService.get20groups()
    if(!response){
        res.status(500).json({status:false, msg:"Algo salio mal..."})
    }else{
        res.status(200).json({status:true, data:response})
    }
}

const addUserToChat = async (req, res) =>{

    const { userId, chatId } = req.body;

    if (!userId || !chatId) {
        console.log("Aqui");
        return res.status(400).json({ status: false, msg: "No se ha enviado id de usuario o de chat" });
    }

    try {
        const response = await chatService.addUserToChat(userId, chatId);
        console.log(response);

        if (!response) {
            return res.status(500).json({ status: false, msg: "Algo salió mal en el servidor" });
        } else {
            return res.status(200).json({ status: true, data: response });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: "Error en el servidor" });
    }
}
// Export all the funcions
module.exports = {
    getChatWithMessages,
    getVariousChats,
    setNewMessage,
    get20groups,
    addUserToChat,
}