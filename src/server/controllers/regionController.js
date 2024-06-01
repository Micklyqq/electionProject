const ApiError = require("../error/ApiError")
const databaseInteraction = require('../database/databaseInteraction')
class RegionController{

    create = async (req,res,next)=>{
        const {name} = req.body;
        if(!name){
            return next(ApiError.badRequest("Нужно заполнить все поля"));
        }
        const database = new databaseInteraction();
        const stmt = database.db.prepare(
            `INSERT INTO regions (name) VALUES(?);`
        );
        stmt.run(name);
        stmt.finalize((err)=>{
            if(err){
                return next(ApiError.internal("Ошибка сервера"));
            }
            else{
                res.json({message:"Регион добавлен"})
                database.closeDb();
            }
        })
    }

    getRegion = async(req,res,next)=>{
        const {id} = req.params;

        const database = new databaseInteraction();
        try{
            const election = await database.getOneRow("regions",id);
            if(election){
                database.closeDb();
                return res.json(election);
            }
            else{
                database.closeDb();
                return next(ApiError.badRequest("Неверный id региона"));
            }
            
        }
        catch(error){
       database.closeDb();
            return next(error);
        }
    }

    getAllRegions= async(req,res,next)=>{
        const database = new databaseInteraction();
        const sql = `SELECT * FROM regions;`;
        try{
            const election = await new Promise((resolve,reject)=>{
                database.db.all(sql,(err,rows)=>{
                    if(err){
                        reject(ApiError.internal("Ошибка сервера, не удалось получить список регионов"));
                    }
                    else{
                        resolve(rows);
                    }
                })
            })
            database.closeDb()
            return res.json(election);
    }
    catch(error){
       database.closeDb();
       return next(error); 
    }
    }
deleteRegion= async (req, res, next) => {
    const { id } = req.params;
 
    const database = new databaseInteraction();
try{
    const delRegion= await database.deleteRow("regions",id)
     database.closeDb();
     return res.json({message:delRegion});
}
catch(error){
    database.closeDb();
    return next(error);
}
}

}
module.exports = new RegionController();