const sqlite3 = require('sqlite3').verbose();
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
        email TEXT,
        password TEXT,
        passportID TEXT,
        regionID INTEGER,
        FOREIGN KEY (regionID) REFERENCES regions (id)
        UNIQUE (email, passportID)
    );`;
    const regionsSql = `CREATE TABLE IF NOT EXISTS regions (
        id INTEGER PRIMARY KEY,
        name TEXT
    );`;
    const electionsSql = `CREATE TABLE IF NOT EXISTS elections (
        id INTEGER PRIMARY KEY,
        title TEXT, description TEXT,
        regionID INTEGER,
        winnerID INTEGER,
        FOREIGN KEY (regionID) REFERENCES regions (id),
        FOREIGN KEY (winnerID) REFERENCES candidates (id)
    );`;
    const candidatesSql = `CREATE TABLE IF NOT EXISTS candidates (
        id INTEGER PRIMARY KEY,
        fullname TEXT,
        party TEXT,
        description TEXT,
        votes INTEGER,
        electionID INTEGER,
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
}

module.exports = DatabaseInteraction;