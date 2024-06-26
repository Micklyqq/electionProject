const ApiError = require('../error/ApiError')
const dbInteraction = require('../database/databaseInteraction')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../env');
const DatabaseInteraction = require('../database/databaseInteraction');
const generateJWT= (id,email,role,regionID) => {
try{

const payload = {
    id,
    email,
    role,
    regionID
}

const token = jwt.sign(payload,env.jwtKey,{
    expiresIn:"30d",
}) 
return token;

}
catch(err){
console.log("Error generating token: ",err);
throw err;
}
}


class UserController{
    
    
        checkUserExist = (database,email)=>{ 
       return new Promise((resolve,reject)=>{
        const checkRegSql = `SELECT * FROM users WHERE email = ?;`
        database.db.get(checkRegSql,[email],(err,row)=>{
            if(err){
            reject(err);
            }
            if(row){
                resolve(row);
            }
            else{
                resolve(null)
            }
               
        })

       }) 
    }

     registration = async (req,res,next)=>{

        const {email,password,regionID} = req.body;

        if(!email || !password || !regionID){
           return next(ApiError.badRequest("Некорректный email или пароль")); 
        }
        const database = new dbInteraction();

            const user = await this.checkUserExist(database,email);
            if(user !== null){
                return next(ApiError.badRequest("Пользователь с таким email уже существует"));
            }
        
            const hashPass = await bcrypt.hash(password,5);
            const role = "USER";
        const regStmt = database.db.prepare(
             `INSERT INTO users (email,password,regionID,role) 
        VALUES (?,?,?,?);`
        );

        regStmt.run(email,hashPass,regionID,role);
        regStmt.finalize((err)=>{
            if(err){
                res.json({message:"Произошла непредвиденная ошибка"});
            }
        
        });

        const regUser = await this.checkUserExist(database,email);
        if(regUser){
        database.closeDb();
        const token = generateJWT(regUser.id,regUser.email,regUser.role,regUser.regionID);
        return res.json({token})
        }
        else{
            database.closeDb();
            res.json({message:"Получение данных пользователя провалилось"})
        }
        
    }

    auth = async (req,res,next)=>{
    const {email,password} = req.body;
      const database = new dbInteraction(); 
        const user = await this.checkUserExist(database,email);
        if(!user){
           return next(ApiError.badRequest("Неверный email")); 
        }
        const comparedPassword = bcrypt.compareSync(password,user.password);
        if(!comparedPassword){
        return next(ApiError.badRequest("Неверный пароль"));
        }
        const token = generateJWT(user.id,user.email,user.role,user.regionID);
        database.closeDb();
        return res.json({token});
    }

    giveAdmin = async (req,res,next)=>{
        const {email} = req.body;
        const database = new dbInteraction();
        const user= await this.checkUserExist(database,email);
        if(!user){
        return next(ApiError.badRequest("Пользователя с таким email не существует"));
        }
        const stmt = database.db.prepare(`UPDATE users SET role = "ADMIN" WHERE email = ?;`);
        stmt.run(email);
        stmt.finalize((err)=>{
            if(err){
                return next(
                 ApiError.internal("Ошибка сервера")
                )
            }
            else{
                res.json({message:"Роль выдана"})
            }
        })
    }

    async check(req, res, next) {
    try {
        const database = new DatabaseInteraction();
        const user = await database.getOneRow('users',req.user.id);
        console.log(user)
      const token = generateJWT(
        user.id,
        user.email,
        user.role,
        user.regionID
      );
      return res.json({ token });
    } catch (e) {
      res.json({ message: e });
    }
  }

}

module.exports = new UserController();