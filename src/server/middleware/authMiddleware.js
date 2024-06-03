const env = require("../env");
const ApiError = require("../error/ApiError")
const jwt = require('jsonwebtoken');


module.exports = function (req,res,next){
    if(req.method==="OPTIONS"){
        next();
    }

    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
              next(ApiError.unauthorized("Не авторизован"))
        }
        const decoded = jwt.verify(token,env.jwtKey);
        req.user = decoded;
        next();
    }
    catch (e){
       return next(ApiError.unauthorized("Не авторизован"))
    }
}