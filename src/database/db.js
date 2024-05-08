//Import mongoose
const mongoose = require('mongoose');

//Get the enviroment variables 
require('dotenv').config();

//Get the host of the db
const DB_HOST = process.env.DB_HOST;

console.info("Connecting to bd ProyectoDb... ⌛")
//Create the connection to the BD 
const connection = 
    mongoose.connect(DB_HOST)
    .then(() => console.log('Estamos conectados a la BD 👍'));

//Export the connection for use it in the future
module.exports = { connection, mongoose }