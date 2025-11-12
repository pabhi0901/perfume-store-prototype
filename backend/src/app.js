import express from "express"
import cardRoute from "./routes/card.route.js"
import cors from "cors"

const app = express()

app.use(cors({
  origin: ["http://localhost:5173",
    "https://perfume-store-prototype-6asp.vercel.app"
  ]
}));
app.use(express.json())
app.use("/cardRoute",cardRoute)

export default app