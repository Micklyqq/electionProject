const ApiError = require("../error/ApiError")
const databaseInteraction = require('../database/databaseInteraction');
const { error } = require("console");
class ElectionController{

    create = async (req,res,next)=>{
        const {title,description,regionID,date} = req.body;
        if(!title || !description || !regionID || !date){
            return next(ApiError.badRequest("Нужно заполнить все поля"));
        }
        const database = new databaseInteraction();
        const stmt = database.db.prepare(
            `INSERT INTO elections (title,description,regionID,date) VALUES(?,?,?,?);`
        );
        stmt.run(title,description,regionID,date);
        stmt.finalize(function(err){
            if(err){
                return next(ApiError.internal("Ошибка сервера"));
            }
        })
        const sql = `SELECT * FROM elections WHERE ROWID = LAST_INSERT_ROWID();`;
        database.db.get(sql,(err,row)=>{
            if(err){
                return err;
            }
            return res.json(row);
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

vote = async(req,res,next)=>{
    const {userID,electionID,candidateID} = req.body;

        const database = new databaseInteraction();
        const userVote= database.db.prepare(
            `INSERT INTO user_vote(userID,electionID,candidateID) VALUES(?,?,?);`
        );
        const candidate = await database.getOneRow('candidates',candidateID);
        console.log(candidate)
        if(candidate){
        await database.updateRow('candidates',candidateID,'votes',candidate.votes+1);  
        }

        userVote.run(userID,electionID,candidateID);
        userVote.finalize((err)=>{
            if(err){
                return next(ApiError.internal("Ошибка сервера"));
            }
            else{
                res.json({message:"Голосование успешно!"})
                database.closeDb();
            }
        })
    
}

getUserVote = async(req,res,next)=>{
const { userID, electionID } = req.query;

    if (!userID || !electionID) {
        return next(ApiError.badRequest("Отсутствуют значения в параметрах"));
    }

    const database = new databaseInteraction();
    const sql = `SELECT * FROM user_vote WHERE userID=? AND electionID=?`;

    try {
        const data = await new Promise((resolve, reject) => {
            database.db.get(sql, [userID, electionID], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });

        if (data) {
            database.closeDb()
            return res.json(data);
        } else {
            database.closeDb();
            return res.json({});
        }
    } catch (err) {
        database.closeDb();
        return next(ApiError.internal("Ошибка сервера"));
    }
}
}
module.exports = new ElectionController();