
const loginService = require("../services/loginService")

module.exports.login = async (req, res) =>{

    const {user, pass} = req.body

    if(!user || !pass){
        res.status(300).json({"status": false, "msg" : "Empty data"})
        return
    }
    
    let loginCheck = await loginService.login(user, pass)
    // console.log(loginCheck)
    if( loginCheck ){
        res.status(200).json({status: true, token : loginCheck})
    }

    else{
        res.status(400).json({"status": false,  "msg": "Usuario o contraseña inválidos"})
    }
    
}