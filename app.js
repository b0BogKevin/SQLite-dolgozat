import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser'
import booksRoute from "./routes/books.js"
import { initializeDB } from "./database.js";


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))


app.use("/books",booksRoute)

const startServer = async () => {
    await initializeDB();
    app.listen(3000, () => console.log("Server is running on port 3000"));
};

startServer();