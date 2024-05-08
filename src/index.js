
//------------- DECLARATION OF VARIABLES AND IMPORT NECESSARY INFO -----------
const { connection, mongoose } = require("./database/db") //Bring the connection of the BD. Import mongoose from the file 
const express = require("express") //Import express
const bodyParser = require("body-parser")// To pass the data 
const router = require("./routes/appRoutes")// Create the router
const PORT = process.env.PORT || 3000 //Port for the connection to the Api

//----------------- CONFIGURATION OF THE EXPRESS APP ------------
// Create an instance of express
const app = express()
//Create the configuration for express, 
app.use(express.json() )
//Configure the app with the body parser
app.use(bodyParser.urlencoded({ extended : true} ) )
//Create the route for the app
app.use("/api", router)

// Make the app start listening 
app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el ${PORT} 😎`)
})
