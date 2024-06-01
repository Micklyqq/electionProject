const ApiError = require("../error/ApiError")
const databaseInteraction = require('../database/databaseInteraction');
const { error } = require("console");
class ElectionController{

    create = async (req,res,next)=>{
        const {title,description,regionID} = req.body;
        if(!title || !description || !regionID){
            return next(ApiError.badRequest("Нужно заполнить все поля"));
        }
        const database = new databaseInteraction();
        const stmt = database.db.prepare(
            `INSERT INTO elections (title,description,regionID) VALUES(?,?,?);`
        );
        stmt.run(title,description,regionID);
        stmt.finalize((err)=>{
            if(err){
                return next(ApiError.internal("Ошибка сервера"));
            }
            else{
                res.json({message:"Выборный процесс создан"})
                database.closeDb();
            }
        })
    }

    getElection = async(req,res,next)=>{
        const {id} = req.params;

        const database = new databaseInteraction();
        try{
            const election = await database.getOneRow("elections",id);
            if(election){
                database.closeDb();
                return res.json(election);
            }
            else{
                database.closeDb();
                return next(ApiError.badRequest("Неверный id выборов"));
            }
            
        }
        catch(error){
       database.closeDb();
            return next(error);
        }
    }

    getAllElections = async(req,res,next)=>{
        const {regionID} = req.params;
        console.log(regionID);
        if(!regionID){
            next(ApiError.badRequest("Не указан регион"));
        }
        const database = new databaseInteraction();
        const sql = `SELECT * FROM elections WHERE regionID = ?;`;
        try{
            const election = await new Promise((resolve,reject)=>{
                database.db.all(sql,[regionID],(err,rows)=>{
                    if(err){
                        reject(ApiError.internal("Ошибка сервера, не удалось получить список выборов"));
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
deleteElection = async (req, res, next) => {
    const { id } = req.params;
 
try{
    const database = new databaseInteraction();
    const delElection = await database.deleteRow("elections",id)
     return res.json({message:delElection});
}
catch(error){
    next(error);
}
}

selectWinner = async (req,res,next)=>{
    const {id} = req.params;
    const database = new databaseInteraction()
    try{
        console.log("rurru")
        const sql = `
        SELECT * FROM candidates
        WHERE electionID = ${id}
        ORDER BY votes DESC
        LIMIT 1;
        `;
        const winner = await new Promise((resolve,reject)=>{
            database.db.all(sql,(error,rows)=>{
                if(error){
                    return reject(ApiError.internal(error))
                }
                resolve(rows);
            })
        })
        
        database.updateRow("elections",id,"winnerID",winner[0].id);
        database.closeDb();
        return res.json({winnerID:winner[0].id});
    }
    catch(error){
        database.closeDb();
        next(error);
    }
}
}
module.exports = new ElectionController();