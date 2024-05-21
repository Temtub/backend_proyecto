// Service that will control the information from the BD for users
// ----------------

// Get the user Model to bring the data
const User = require("../database/models/Users");
const Chat = require("../database/models/Chat");

/**
 * Function to get one user by id from the bd
 * @param {*} idUser The id of the user that wants to be found
 * @returns Object that has been found from the bd
 */
const getOneUser = async (idUser) =>{
    let userFound;
    // Make the search of the user by the id
    try {
        userFound = await User.findOne({"_id" : idUser });
    } catch (error) { // if it brings an error it catches it
        console.error("Ha ocurrido un error en la función de getOneUser") 
        console.log(error)
        return false
    }
    //Transform the user that has been found into a json
    let userFoundJson = userFound.toJSON() 

    return userFoundJson;
}

/**
 * Function to create a new user
 * @param {*} name 
 * @param {*} password 
 * @param {*} password 
 * @param {*} iconURL 
 * @param {*} email 
 * @param {*} birth_date 
 * @param {*} location 
 * @param {*} bio 
 * @returns 
 */
async function createUser(name, password, iconURL, email, birth_date, location, bio) {
    try {
      const newUser = new User({
        name, 
        password, 
        iconURL, 
        email, 
        birth_date, 
        location, 
        bio
      });

      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  }


const createNewChat = async (user) =>{
  let randomUser;
  // GET THE RANDOM USER
  try {
    // Get the number of users there are
    const count = await User.countDocuments();
    // PIck a random one
    const randomIndex = Math.floor(Math.random() * count);
    // Get the specific user by skipping to the user
    randomUser = await User.findOne().skip(randomIndex);

    // console.log(randomUser)
  } catch (err) {
      console.error(err);
      return { state: false, msg: "Error seleccionando un nuevo usuario"};
  }

  if(userExists(user) ){
    // console.log(user)
    let participants = [user, randomUser._id]
    // Create the chat in the bd
    let newChat = await createChat(participants)
    addChatToUser(participants, newChat._id)
    return newChat
  }
  else{
    return { state : false, msg: "Usuario no existente"}
  }
}

/**
 * Creates a new chat in the BD
 * @param {Array} participants Array of ids of user that participate in the chat
 * @param {String} initialMessage First text of the user
 * @returns The chat json
 */
const createChat = async (participants, initialMessage) => {
  try {
      const newChat = new Chat({
          users: participants,
          messages: initialMessage ? [{
              sender: initialMessage.sender,
              text: initialMessage.text
          }] : []
      });

      const savedChat = await newChat.save();
      return savedChat;
  } catch (err) {
      console.error('Error al crear el chat:', err);
      throw err;
  }
};


/**
 * Check if a user exists searching by id
 * @param {*} userId If of user you want to find
 * 
 */
const userExists = async (userId) => {
  try {
      const user = await User.findById(userId);
      return user !== null;
  } catch (err) {
      console.error('Error al buscar el usuario:', err);
      return false;
  }
};

async function addChatToUser(participants, chatId) {
  const results = [];

  for (const participant of participants) {
    try {
      // Search the user
      const usuario = await User.findById(participant);
      // console.log(chatId)
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      // Añadir el nuevo chat a la lista de chats del usuario
      usuario.chats.push(chatId);

      // Guardar el usuario actualizado en la base de datos
      await usuario.save();

      console.log(`Chat añadido al usuario ${usuario.name}`);
      results.push(usuario);
    } catch (error) {
      console.error('Error al añadir chat al usuario:', error);
      throw error; // Propagar el error para manejo adicional si es necesario
    }
  }
}

module.exports = {
    getOneUser,
    createUser,
    createNewChat

}