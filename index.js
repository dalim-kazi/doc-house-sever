import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectWithDB from "./mongo.js";
import handleError from "./Middleware/handleError.js";
import configure from "./Controller/index.js";
const port =process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config();

app.get("/", (req, res) => {
    res.send("doc-house-server")
})
connectWithDB()
configure(app)
app.use(handleError)
app.listen(port, () => {
    console.log('doc house server running' + port)
})