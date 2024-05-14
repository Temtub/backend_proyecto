// Import mongoose and the user schema
const { mongoose } = require("../db");
const User = require("./Users");

// Define the schema for the message
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Compile the schema
const Message = mongoose.model('Message', messageSchema);

// Export the module
module.exports = Message;
