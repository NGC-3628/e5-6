import express from "express";
import { initDb as databaseInit } from "./data/database.js";


const app = express();
const port = process.env.PORT || 1313;


app.get('/', (req, res) => {res.send("Project W5-6. Futher information type api-docs")});


databaseInit((err) => {
    if(err) {
        console.log(err)
    } else {
        app.listen(port, () => {
        console.log(`Database is listening and Node Running i port ${port}`);
        });
    }
});


