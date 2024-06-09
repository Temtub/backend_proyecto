// Service that will control the information from the BD for all chats
// ----------------

// Get the Chat Model to bring the data
const Chat = require("../database/models/Chat");
const User = require("../database/models/Users");
const Message = require("../database/models/Message")
const mongoose = require("mongoose")
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

/**
 * Function to get the 20 groups with more people in there
 * @returns 
 */
const get20groups = async (userId) => {
    console.log(userId)
    try {
        const result = await Chat.aggregate([
            {
                $group: {
                    _id: "$_id",
                    totalParticipants: { $sum: { $size: "$users" } }, // Contar el número de usuarios
                    chat: { $first: "$$ROOT" }
                }
            },
            {
                $match: {
                    totalParticipants: { $gt: 2 }
                }
            },
            {
                $project: {
                    "chat.users": 1,
                    "chat.messages": 1,
                    "chat.name": 1,
                    totalParticipants: 1,
                    "chat.icon": 1
                }
            }
            ,
            {
                $limit: 20
            }
        ]);

        console.log(result)
        return result;

    } catch (error) {
        console.log(error)
        return false
    }
}

const addUserToChat = async (userId, chatId) => {

    // Start the session to create various transactions
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Add the id of the user to the chat
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { $addToSet: { users: userId } },
            { new: true, session } // Return the new document not the old one
        );

        // Add the id of the chat to the user
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { chats: chatId } },
            { new: true, session }
        );

        // Execute the transaction 
        let transactionCommitted = await session.commitTransaction();

        session.endSession();
        console.log('User added to chat successfully');
        return { chat, user }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Error adding user to chat:', error);
        return false
    }
}

const createGroup = async (users, name, icon) => {
    console.log(users)
    try {
        //Create the chat
        const chat = new Chat({
            users,
            name,
            icon
        });
        await chat.save();

        // Save the chat in the users
        const userPromises = users.map(async (userId) => {
            const user = await User.findById(userId);
            if (user) {
                user.chats = user.chats || [];
                user.chats.push(chat._id);
                await user.save();
            }
        });

        await Promise.all(userPromises);

        return chat;
    } catch (error) {
        console.log("aqui")
        if (error.message.includes('BSONObj size')) {
            console.error("ERROR POR TAMAÑO", error)
            return 413
        } else {
            console.error("ERROR", error)
            return false
        }
    }
}

module.exports = {
    getChatWithMessages,
    getVariousChats,
    setNewMessage,
    get20groups,
    addUserToChat,
    createGroup
}