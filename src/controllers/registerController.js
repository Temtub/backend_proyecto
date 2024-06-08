
const registerService = require("../services/registerService")

const emailRegex = /\S+@\S+\.\S+/;

module.exports.register = async (req, res) =>{

    const {user, pass, email} = req.body

    if(!user || !pass || !email){
        res.status(400).json({"status": false, "msg" : "Datos vacíos."})
        return
    }
    // Check if the email cumpliments the regular expresion
    if (!emailRegex.test(email)) {
        res.status(404).json({"status": false, "msg" : "La dirección de correo electrónico proporcionada no es válida, por ejemplo: example@example.com"});
        return;
    }
    
    
    let registerCheck = await registerService.register(user, pass, email)

    if(registerCheck == 403){
        res.status(200).json({"status": false, msg:"Ese nombre ya existe, busque otro."})
        return
    } else if( registerCheck ){
        
        res.status(200).json({"status": true, data:registerCheck})
        return
    } else{
        res.status(500).json({"status": false,  "msg": "No se ha podido crear"})
    }
    
}