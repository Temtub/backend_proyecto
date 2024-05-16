//This is the router for all the aplication is the top one that will contain the rest of routes
//-----------------------
const router = require("express").Router()// Create the router

const userRouter = require("./usersRoutes")// Call the client routes
const chatRouter = require("./chatRoutes")// Call the client routesç
const loginRouter = require("./loginRoutes")
const registerRouter = require("./registerRoutes")

//----- ROUTES FOR THE USER -------
router.use("/user", userRouter)// Generate the routes for 
router.use("/chat", chatRouter)// Generate the routes for 
router.use("/login", loginRouter)
router.use("/register", registerRouter)
// Export the router
module.exports = router