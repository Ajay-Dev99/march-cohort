const express = require("express")
const connectDB = require("./config/dbConnection")
const userRouter = require("./routes/userRoutes")
const courseRouter = require("./routes/courseRoutes")
const cors = require('cors')
const cartRouter = require("./routes/cartRoutes")
const paymentRouter = require("./routes/paymentRoute")
require('dotenv').config()

const app = express()

app.get("/", (req, res) => {
    res.json("Server started")
})

//connect Db
connectDB()

//middleware
app.use(cors({
    origin: "https://march-cohort-hl3w.vercel.app"
}))
app.use(express.json())

//routes
app.use("/user", userRouter)
app.use("/course", courseRouter)
app.use("/cart", cartRouter)
app.use("/payment", paymentRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server starts on port ${process.env.PORT}`);
})

