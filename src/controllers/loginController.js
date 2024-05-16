
const loginService = require("../services/loginService")

module.exports.login = async (req, res) =>{

    const {user, pass} = req.body

    if(!user || !pass){
        res.status(300).json({"status": false, "msg" : "Empty data"})
        return
    }
    
    let loginCheck = await loginService.login(user, pass)

    if( loginCheck ){
        res.status(200).json({"status": true, "msg" : "Correct login"})
    }

    else{
        res.status(303).json({"status": false,  "msg": "User or pass incorrect"})
    }
    
}