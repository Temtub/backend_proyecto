// Import mongoose and the user and message schema
const { mongoose } = require("../db");
const User = require("./Users");
const Message = require("./Message");

// Define the schema for the chat
const chatSchema = new mongoose.Schema({
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }]
});

// Compile it
const Chat = mongoose.model('Chat', chatSchema);

// Export
module.exports = Chat;
