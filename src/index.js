
//------------- DECLARATION OF VARIABLES AND IMPORT NECESSARY INFO -----------
const { connection, mongoose } = require("./database/db") //Bring the connection of the BD. Import mongoose from the file 
const express = require("express") //Import express
const bodyParser = require("body-parser")// To pass the data 
const router = require("./routes/appRoutes")// Create the router
const PORT = process.env.PORT || 3001 //Port for the connection to the Api
const WebSocket = require('ws');

//----------------- CONFIGURATION OF THE EXPRESS APP ------------
// Create an instance of express
const app = express()
const cors = require("cors")
//Create the configuration for express, 
app.use(express.json() )
//Configure the app with the body parser
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(cors({}))

//Create the route for the app
app.use("/api", router)

// Make the app start listening 
app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el ${PORT} 😎`)
})
