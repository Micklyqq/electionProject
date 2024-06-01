const sqlite3 = require('sqlite3').verbose();
const ApiError = require('../error/ApiError')

class DatabaseInteraction{
    constructor(){
        this.db = this.openDb();
    }
    
openDb() {
    return new sqlite3.Database("./src/server/database/election.db", (err)=>{
    if(err){
        return console.error(err.message);
    }
    console.log("Connected to SQlite database");
});
 }

closeDb(){
   this.db.close((err)=>{
    if(err){
        return console.error(err.message)
    }
    console.log("Close the database connection")
});
 }

initDb(){
    const usersSql = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        regionID INTEGER NOT NULL,
        FOREIGN KEY (regionID) REFERENCES regions (id)
        UNIQUE (email)
    );`;
    const regionsSql = `CREATE TABLE IF NOT EXISTS regions (
        id INTEGER PRIMARY KEY,
        name TEXT
    );`;
    const electionsSql = `CREATE TABLE IF NOT EXISTS elections (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        regionID INTEGER,
        winnerID INTEGER,
        FOREIGN KEY (regionID) REFERENCES regions (id),
        FOREIGN KEY (winnerID) REFERENCES candidates (id)
    );`;
    const candidatesSql = `CREATE TABLE IF NOT EXISTS candidates (
        id INTEGER PRIMARY KEY,
        fullname TEXT NOT NULL,
        party TEXT,
        description TEXT,
        votes INTEGER DEFAULT 0,
        electionID INTEGER NOT NULL,
        FOREIGN KEY (electionID) REFERENCES elections (id)
    );`;

    
    this.db.all(regionsSql,(err)=>{
        if(err){
            throw err;
        }
    })
    this.db.all(usersSql,(err)=>{
        if(err){
            throw err;
        }
    })
    this.db.all(electionsSql,(err)=>{
        if(err){
            throw err;
        }
    })
    this.db.all(candidatesSql,(err)=>{
        if(err){
            throw err;
        }
    })

}
    getOneRow = async(table,rowID)=>{
                const sql = `SELECT * FROM ${table} WHERE id = ?;`;
            const election = await new Promise((resolve,reject)=>{
                this.db.get(sql,[rowID],(err,row)=>{
                    if(err){
                     return reject(ApiError.internal("Ошибка сервера"));
                    }
                    else{
                        resolve(row);
                    }
                })
            })
            return election;
    }

    deleteRow = async (table,rowID) => {
    if (!rowID) {
        throw (ApiError.badRequest("Не представлен id"));
    }


        const election = await new Promise((resolve, reject) => {
            const sqlCheck = `SELECT * FROM ${table} WHERE id = ?`;
            this.db.get(sqlCheck, [rowID], (err, row) => {
                if (err) {
                return  reject(ApiError.internal("Ошибка сервера, попробуйте еще раз"));
                } else {
                    resolve(row);
                }
            });
        });

        if (!election) {
            throw (ApiError.badRequest("Запись с указанным id не найдена"));
        }

        await new Promise((resolve, reject) => {
            const sqlDel = `DELETE FROM ${table} WHERE id = ?`;
            this.db.run(sqlDel, [rowID], (err) => {
                if (err) {
                    return reject(ApiError.internal("Ошибка сервера, попробуйте еще раз"));
                } else {
                    resolve();
                }
            });
        });

        return "Данные успешно удалены"; 
}

updateRow = async(table,rowID,column,value)=>{
    
    if (!rowID) {
        throw (ApiError.badRequest("Не представлен id"));
    }


        const row = await new Promise((resolve, reject) => {
            const sqlCheck = `SELECT * FROM ${table} WHERE id = ?`;
            this.db.get(sqlCheck, [rowID], (err, row) => {
                if (err) {
                return reject(ApiError.internal("Ошибка сервера, попробуйте еще раз"));
                } else {
                    resolve(row);
                }
            });
        });

        if (!row) {
            throw (ApiError.badRequest("Запись с указанным id не найдена"));
        }

        await new Promise((resolve, reject) => {
            const sqlDel = `UPDATE ${table} SET ${column} = ${value} WHERE id = ?`;
            this.db.run(sqlDel, [rowID], (err) => {
                if (err) {
                    return reject(ApiError.internal("Ошибка сервера, попробуйте еще раз"));
                } else {
                    resolve();
                }
            });
        });

        return "Данные успешно изменены"; 
}
}
module.exports = DatabaseInteraction;