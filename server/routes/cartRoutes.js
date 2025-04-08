const { addTocart, getCart, removeFromCart, clearCart } = require('../controllers/cartController')
const authMiddleware = require('../middlewares/authMiddleware')


const cartRouter = require('express').Router()


cartRouter.post("/addtocart/:courseId", authMiddleware, addTocart)
cartRouter.get("/getcart", authMiddleware, getCart)
cartRouter.delete("/removefromcart/:courseId", authMiddleware, removeFromCart)
cartRouter.post("/clearcart", authMiddleware, clearCart)

module.exports = cartRouter