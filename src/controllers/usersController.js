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


// Export all the funcions
module.exports = {
    getOneUser,
}