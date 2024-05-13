//Bring the connection of the BD. 
// Import mongoose from the file 
const { connection, mongoose } = require("../db")

//Get all the types for mongoose
const Schema = mongoose.Schema;

//Create the schema for the users
const users = new mongoose.Schema({
    name: String, //Name of the user
    password: String, //Password of the user
    icon: Buffer, //Icon of the user
    email: String, //Email of the user
    friends: [{
        friendName: String,
        friendImage: Buffer,
        friendBio: String
    }], //Array of friends
    birth_date: Date, //Date of the user
    location: Schema.Types.Mixed, //Localitation of the user,
    bio: String, //Bio of the user
    likes: [String] //The things that the user likes
});

//Compile the users in a Model
const User = mongoose.model('User', users);

//Export the User
module.exports = User
