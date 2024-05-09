// Service that will control the information from the BD for users
// ----------------

// Get the user Model to bring the data
const User = require("../database/models/Users");

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

module.exports = {
    getOneUser,
}