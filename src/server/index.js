const express = require("express");
const cors = require('cors');
const router = require("./routes/index");
const errorHandler = require('./middleware/errorHandlingMiddleware')
const DatabaseInteraction = require("./database/databaseInteraction");
const PORT = 3001;

const db = new DatabaseInteraction();
const app = express();
app.use(cors())
app.use(express.json());
app.use('/api',router);
app.use(errorHandler);

app.listen(PORT,()=>{
    db.initDb();
    db.closeDb();
    console.log("App starting in port ",PORT)
})