// Import mongoose and the database connection file
const { mongoose } = require("../db");
const bcrypt = require('bcrypt');

const Chat = require("../models/Chat")

// Define the schema for users
const userSchema = new mongoose.Schema({
    name: String, // Name of the user
    password: String, // Password of the user
    iconURL: String, // URL of the user's icon
    email: String, // Email of the user
    friends: [{
        name: String, // Friend's name
        imageURL: String, // URL of the friend's image
        bio: String // Friend's bio
    }], // Array of friends
    birth_date: Date, // User's birth date
    location: mongoose.Schema.Types.Mixed, // User's location
    bio: String, // User's bio
    likes: [String], // The things that the user likes
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }] // Array of chat IDs
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Compile the schema into a model
const User = mongoose.model('User', userSchema);

// Export the user model
module.exports = User;
