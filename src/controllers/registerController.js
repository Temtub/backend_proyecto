
const registerService = require("../services/registerService")

const emailRegex = /\S+@\S+\.\S+/;

module.exports.register = async (req, res) =>{

    const {user, pass, email} = req.body

    if(!user || !pass || !email){
        res.status(400).json({"status": false, "msg" : "Empty data"})
        return
    }
    // Check if the email cumpliments the regular expresion
    if (!emailRegex.test(email)) {
        res.status(400).json({"status": false, "msg" : "La dirección de correo electrónico proporcionada no es válida. Asegúrate de que tenga el formato correcto, por ejemplo: example@example.com"});
        return;
    }
    
    
    let registerCheck = await registerService.register(user, pass, email)

    if( registerCheck ){
        res.status(200).json({"status": true, "msg" : "Correct register"})
    }

    else{
        res.status(404).json({"status": false,  "msg": "Couldnt create"})
    }
    
}