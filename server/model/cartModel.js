const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courses: [
        {
            courseId: {
                type: mongoose.Types.ObjectId,
                ref: 'courses',
                required: true
            },
            price: {
                type: Number,
                required: true
            },
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
})

cartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.courses.reduce((total, course) => total + course.price, 0)
}

module.exports = new mongoose.model('carts', cartSchema)