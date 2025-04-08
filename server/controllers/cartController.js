const cartDb = require("../model/cartModel");
const courseDb = require("../model/courseModel");


const getCart = async (req, res) => {
    try {
        const userId = req.user
        const cart = await cartDb.findOne({ userId }).populate("courses.courseId")
        console.log(cart);

        if (!cart) {
            return res.status(400).json({ error: 'cart is empty' })
        }

        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const addTocart = async (req, res) => {
    try {
        const userId = req.user
        const { courseId } = req.params

        const course = await courseDb.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        let cart = await cartDb.findOne({ userId })

        if (!cart) {
            cart = new cartDb({ userId, courses: [] })
        }

        const courseAlreadyExist = cart.courses.some((item) => item.courseId.equals(courseId))

        if (courseAlreadyExist) {
            return res.status(400).json({ error: "Course already in cart" })

        }

        cart.courses.push({
            courseId,
            price: course.price
        })

        cart.calculateTotalPrice()

        await cart.save()

        res.status(200).json({ message: "added to cart", cart })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })

    }
}


const removeFromCart = async (req, res) => {
    try {

        const userId = req.user;
        const { courseId } = req.params

        let cart = await cartDb.findOne({ userId })
        if (!cart) {
            return res.status(404).json({ error: "cart not found" })
        }

        cart.courses = cart.courses.filter((item) => !item.courseId.equals(courseId))

        cart.calculateTotalPrice();

        await cart.save()

        res.status(200).json({ message: 'course removed from cart', cart })


    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const clearCart = async (req, res) => {
    try {
        const userId = req.user;

        const cart = await cartDb.findOne({ userId })

        if (!cart) {
            return res.status(404).json({ error: "cart not found" })
        }

        cart.courses = []

        await cart.save()
        return res.status(200).json({ message: 'cart cleared' })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }

}

module.exports = {
    addTocart,
    getCart,
    removeFromCart,
    clearCart
}