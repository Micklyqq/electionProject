const ApiError = require("../error/ApiError")
const databaseInteraction = require('../database/databaseInteraction')
class CandidateController{

    create = async (req,res,next)=>{
        const {fullname,description,party,electionID} = req.body;
        if(!fullname|| !description || !electionID || !party){
            return next(ApiError.badRequest("Нужно заполнить все поля"));
        }
        const database = new databaseInteraction();
        const stmt = database.db.prepare(
            `INSERT INTO candidates (fullname,description,electionID,party) VALUES(?,?,?,?);`
        );
        stmt.run(fullname,description,electionID,party);
        stmt.finalize((err)=>{
            if(err){
                return next(ApiError.internal("Ошибка сервера"));
            }
            else{
                res.json({message:"Кандидат добавлен"})
                database.closeDb();
            }
        })
    }

    getCandidate= async(req,res,next)=>{
        const {id} = req.params;

        const database = new databaseInteraction();
        try{
            const election = await database.getOneRow("candidates",id);
            if(election){
                database.closeDb();
                return res.json(election);
            }
            else{
                database.closeDb();
                return next(ApiError.badRequest("Неверный id кандидата"));
            }
            
        }
        catch(error){
       database.closeDb();
            return next(error);
        }
    }

    getAllCandidates= async(req,res,next)=>{
        const {electionID} = req.params;
        if(!electionID){
            next(ApiError.badRequest("Не указан регион"));
        }
        const database = new databaseInteraction();
        const sql = `SELECT * FROM candidates WHERE electionID = ?;`;
        try{
            const election = await new Promise((resolve,reject)=>{
                database.db.all(sql,[electionID],(err,rows)=>{
                    if(err){
                        reject(ApiError.internal("Ошибка сервера, не удалось получить список кандидатов"));
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
deleteCandidate= async (req, res, next) => {
    const { id } = req.params;
 
    const database = new databaseInteraction();
try{
    const delCandidate = await database.deleteRow("candidates",id)
     database.closeDb();
     return res.json({message:delCandidate});
}
catch(error){
    database.closeDb();
    return next(error);
}
}

vote = async (req,res,next)=>{
    const {id} = req.params;
    
    const database = new databaseInteraction();

    try{
        const candidate = await database.getOneRow("candidates",id);
        database.updateRow("candidates",id,"votes",candidate.votes+1)
        return res.json({message:"Голос засчитан"})
    }
    catch(error){
        database.closeDb()
        return next(error);
    }
}

}
module.exports = new CandidateController();