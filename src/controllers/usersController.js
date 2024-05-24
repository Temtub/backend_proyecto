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
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


async function createNewChat (req, res){

    const {user} = req.body
    let newChat = await userService.createNewChat(user)
    // console.log(newChat)
    if(!newChat){
        res.status(500).json({status:false, msg:"Ha ocurrido un error"})
        return 
    }
    res.status(200).json(newChat)
}
// Export all the funcions
module.exports = {
    getOneUser,
    createUser,
    createNewChat

}