const { paymentFunction } = require('../controllers/paymentController')
const authMiddleware = require('../middlewares/authMiddleware')

const paymentRouter = require('express').Router()

paymentRouter.post("/stripe-checkout", authMiddleware, paymentFunction)





module.exports = paymentRouter