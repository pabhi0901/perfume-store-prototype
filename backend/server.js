import app from "./src/app.js"
import dotenv from "dotenv"
dotenv.config()
import connectToDb from "./src/db/db.js"

connectToDb()

app.listen(5000,()=>{
    console.log("Server running at port 5000");
})