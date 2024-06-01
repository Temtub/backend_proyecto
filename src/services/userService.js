// Service that will control the information from the BD for users
// ----------------

// Get the user Model to bring the data
const User = require("../database/models/Users");
const Chat = require("../database/models/Chat");
const MAX_ATTEMPTS = 40

/**
 * Function to get one user by id from the bd
 * @param {*} idUser The id of the user that wants to be found
 * @returns Object that has been found from the bd
 */
const getOneUser = async (idUser) => {
  let userFound;
  // Make the search of the user by the id
  try {
    userFound = await User.findOne({ "_id": idUser });
  } catch (error) { // if it brings an error it catches it
    console.error("Ha ocurrido un error en la función de getOneUser")
    console.log(error)
    return false
  }
  //Transform the user that has been found into a json

  return userFound;
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

/**
 * Function to create a new chat
 * @param {*} userId 
 * @param {*} attempt 
 * @returns 
 */
const createNewChat = async (userId, attempt = 0) => {
  if (attempt >= MAX_ATTEMPTS) {
    return { state: false, msg: "Vaya, parece que tienes todos los amigos posibles" };
  }

  try {
    // Data to get a random user
    const count = await User.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomUser = await User.findOne().skip(randomIndex);

    // Check if the user exists
    let userData = await userExists(userId);
    let nameOfUserAndChat = randomUser.name

    if (userData) {
      let participants = [userData._id, randomUser._id];
      // console.log(participants)
      //Check if a user already exists
      if (await chatExists(participants) || checkChatWithSamePerson(participants)) {
        return createNewChat(userId, attempt + 1); // Intenta crear un nuevo chat
      }

      // Create the chat in the bd
      let newChat = await createChat(participants, nameOfUserAndChat);
      await addChatToUser(participants, newChat._id);
      return newChat;
    } else {
      return { state: false, msg: "Usuario buscado no existente" };
    }
  } catch (err) {
    console.error(err);
    return { state: false, msg: "Error seleccionando un nuevo usuario" };
  }
}

/**
 * Check if the chat that is creating is with the same person
 * @param {*} participants 
 * @returns 
 */
const checkChatWithSamePerson = (participants) => {
  if (participants.length == 2 && participants[0].toString() == participants[1].toString()) {
    return true
  }
  return false
}
/**
 * Function to check if a chat already exists
 * @param {Array} participants 
 * @returns 
 */
async function chatExists(participants) {

  try {
    // Crear un Set a partir del array de participantes
    const participantSet = new Set(participants.map(id => id.toString()));
    // Buscar todos los chats que tienen el mismo número de participantes
    const potentialChats = await Chat.find({
      users: { $size: participantSet.size }
    });

    // Verificar que no haya un chat con los mismos participantes
    for (const chat of potentialChats) {
      const chatParticipantSet = new Set(chat.users.map(id => id.toString()));

      if (areSetsEqual(participantSet, chatParticipantSet)) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Error checking chat existence:', error);
    throw error;
  }
}


/**
 * Function to check two datas
 * @param {*} setA 
 * @param {*} setB 
 * @returns 
 */
function areSetsEqual(setA, setB) {
  if (setA.size !== setB.size) {
    return false;
  }
  for (let elem of setA) {
    if (!setB.has(elem)) {
      return false;
    }
  }
  return true;
}

/**
 * Creates a new chat in the BD
 * @param {Array} participants Array of ids of user that participate in the chat
 * @param {String} initialMessage First text of the user
 * @returns The chat json
 */
const createChat = async (participants, name, initialMessage) => {


  try {
    const newChat = new Chat({
      users: participants,
      name: name,
      messages: initialMessage ? [{
        sender: initialMessage.sender,
        text: initialMessage.text
      }] : []
    });

    const savedChat = await newChat.save();
    return savedChat;
  } catch (err) {
    console.error('Error al crear el chat:', err);
    return false
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
    return user;
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

const addFriendToUser = async (userId, friendId) => {
  try {
    // Search the user and add the friend 
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      return 404
    }

    return user;
  } catch (error) {
    console.error('Error al agregar amigo:', error);
    return false
  }

}

const addDataToUser = async (birth_date, location, biografia, likes, iconUrl, userId) => {

  try {
    // Encontrar el usuario por su ID y actualizar los datos
    const usuarioActualizado = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          birth_date: birth_date,
          location: location,
          biografia: biografia,
          likes: likes,
          iconUrl: iconUrl
        }
      },
      { new: true } 
    );

    console.log('Usuario actualizado:', usuarioActualizado);
    return usuarioActualizado
  } catch (error) {
    console.error('Error actualizando el usuario:', error);
    return false
  }
}

module.exports = {
  getOneUser,
  createUser,
  createNewChat,
  addFriendToUser,
  addDataToUser
}