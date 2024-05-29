// Import mongoose and the database connection file
const { mongoose } = require("../db");
const bcrypt = require('bcrypt');

const Chat = require("../models/Chat")

// Define the schema for users
const userSchema = new mongoose.Schema({ 
    name: {type: String, required:true}, // Name of the user
    password: {type: String, required:true}, // Password of the user
    iconURL: String, // URL of the user's icon
    email: {type: String, required:true}, // Email of the user
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }], // Array of friends
    birth_date: Date, // User's birth date
    location: mongoose.Schema.Types.Mixed, // User's location
    bio: String, // User's bio
    likes: [String], // The things that the user likes
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }] // Array of chat IDs
});

userSchema.path('friends').default([]);
userSchema.path('likes').default([]);

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.generatePassword = async function(candidatePassword) {
    try {
        // Número de rondas de sal (cuanto mayor sea, más seguro pero más lento)
        const saltRounds = 10;
        
        // Generar la sal
        const salt = await bcrypt.genSalt(saltRounds);
        
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(candidatePassword, salt);
        
        // Guardar la contraseña encriptada en el documento del usuario
        this.password = hashedPassword;
        
        // Devolver la contraseña encriptada
        return hashedPassword;
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        throw error;
    }
};
// Compile the schema into a model
const User = mongoose.model('User', userSchema);

// Export the user model
module.exports = User;
