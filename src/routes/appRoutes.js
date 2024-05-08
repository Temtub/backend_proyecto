//This is the router for all the aplication is the top one that will contain the rest of routes
//-----------------------
const router = require("express").Router()// Create the router

//----- ROUTES FOR THE USER -------
const userRouter = require("./usersRoutes")// Call the client routes
router.use("/user", userRouter)// Generate the routes for 

// Export the router
module.exports = router