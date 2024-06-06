// Controller for the user data
// -------------------------------

// Declare the service that will bring the info for the user
const userService = require('../services/userService')

/**
 * Function to retrieve a user from the database
 * @param {*} req The request object
 * @param {*} res The response object
 */
const getOneUser = async (req, res) => {
    try {
        // Extract the user ID from the URL parameters
        const { userId } = req.params;
        // Check if the user ID is provided
        if (!userId) {
            return res.status(400).json({ error: "Please provide a user ID to search." });
        }

        // Retrieve user information from the service
        const user = await userService.getOneUser(userId);
        // If no user found, return a message
        if (!user) {
            return res.status(404).json({ error: "No user found." });
        }
        // Return the user information
        res.status(200).json(user);

    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "An error occurred while retrieving the user." });
    }
};

async function createUser(req, res) {
    // console.log(req)
    const { name, password, iconURL, email, birth_date, location, bio } = req.body;
    try {
        const user = await userService.createUser(name, password, iconURL, email, birth_date, location, bio);
        
        if(!user){
            console.error("Error registrando el usuario en ejabberd")
            res.status(500).json({ status: false, message: 'Error registrando el usuario, algo ha funcionado mal.' });
            return
        }else if(user == 405){
            res.status(405).json({ status: false, message: 'Ese nombre ya está en uso.' });
            return
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Function to create a new chat
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function createNewChat(req, res) {

    const { user } = req.body
    let newChat = await userService.createNewChat(user)
    console.log("Chat creado nuevo:")
    console.log(newChat)
    if (!newChat) {
        res.status(500).json({ status: false, msg: "Ha ocurrido un error" })
        return
    }
    res.status(200).json(newChat)
}


const addFriendToUser = async (req, res) => {

    const { userId, friendId } = req.body

    if (!userId || !friendId) {
        res.status(400).json({ status: false, msg: "Falta id de usuario o de amigo" })
        return
    }
    const response = await userService.addFriendToUser(userId, friendId)
    console.log(response)
    if (!response) {
        res.status(500).json({ status: false, msg: "Ha ocurrido un error interno" })
        return
    }
    else if (response === 404) {
        res.status(404).json({ status: false, msg: "Usuario no encontrado" })
        return
    }else if (response === 405){
        res.status(404).json({ status: false, msg: "Los usuarios ya son amigos" })
    }
     else {
        res.status(200).json({ status: true, response })
    }
}

const addDataToUser = async (req, res) => {
    let { birth_date, location, bio, likes, iconUrl, userId }  = req.body

    console.log(req.body)
    if(!birth_date || !location || !bio || !likes ||!userId){
        res.status(400).json({status:false, msg:"Envía todos los datos"})
    }

    if(likes.length < 3){
        res.status(400).json({status:false, msg:"Escoge al menos 3 gustos"})
    }

    if(bio.length > 30){
        res.status(400).json({status:false, msg:"La biografía no puede superar los 30 carácteres"})
    }

    if(!iconUrl){
        iconUrl = "empty"
    }

    const response = await userService.addDataToUser( birth_date, location, bio, likes, iconUrl, userId)

    if(!response){
        res.status(500).json({status:false, msg: "Error interno del servidor"})
    }
    else{
        res.status(200).json({status : true, data:response})
    }
}

// Export all the funcions
module.exports = {
    getOneUser,
    createUser,
    createNewChat,
    addFriendToUser,
    addDataToUser
}