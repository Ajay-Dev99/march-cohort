const { register, login, profile, updateUser, deleteUser } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const userRouter = require('express').Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/profile", authMiddleware, profile)
userRouter.patch("/update", authMiddleware, updateUser)
userRouter.delete("/delete-user/:userId", deleteUser)

module.exports = userRouter