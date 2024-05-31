const dbInteraction = require('../database/databaseInteraction')
class UserController{
    
    async registration(req,res){

        const {email,password,passportID,regionID} = req.body;

        const database = new dbInteraction();

        const checkRegSql = `SELECT * FROM users WHERE email = ? OR passportID = ?;`
        const checkReg = database.db.get(checkRegSql,[email,passportID],(err,row)=>{
            if(err){
                console.log(err.message);
                return;
            }
            if(row){
                return row;
            }
               
        })

        if(checkReg){
            res.json({message:"Пользователь с таким email или номером паспорта уже существует"})
            database.closeDb();
            return;
        }

        const regStmt = database.db.prepare(
             `INSERT INTO users (email,password,passportID,regionID) 
        VALUES (?,?,?,?);`
        );

        regStmt.run(email,password,passportID,regionID);
        regStmt.finalize((err)=>{
            if(err){
                res.json({message:"Произошла непредвиденная ошибка"});
            }
            else{
                res.json({message:"Регистрация успешна!"})
            }
        });
        
        database.closeDb();

    }
}

module.exports = new UserController();