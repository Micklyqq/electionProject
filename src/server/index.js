const express = require("express");
const app = express();
const router = require("./routes/index");
const DatabaseInteraction = require("./database/databaseInteraction");
const PORT = 3001;

const db = new DatabaseInteraction();
app.use(express.json());
app.use('/api',router);

app.listen(PORT,()=>{
    db.initDb();
    console.log("App starting in port ",PORT)
})