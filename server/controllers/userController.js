const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const createToken = require("../utilites/generateToken");
const mongoose = require("mongoose");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = new userModel({ name, email, password: hashedPassword })
        const savedUser = await newUser.save()
        return res.status(201).json({ message: "Account created", savedUser })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const userExist = await userModel.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ error: "User not found" })
        }
        const passwordMatch = await bcrypt.compare(password, userExist.password)
        console.log(passwordMatch, "passwordMatch");

        if (!passwordMatch) {
            return res.status(400).json({ error: "Not a valid password" })
        }

        const userObject = userExist.toObject()
        delete userObject.password

        const token = createToken(userExist._id)



        return res.status(200).json({ message: "Login succesfull", userObject, token })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const profile = async (req, res) => {
    try {
        const userId = req.user;
        const user = await userModel.findById(userId).select("-password")
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.user
        const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true })
        res.status(200).json({ message: "user updated", updatedUser })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid id" })
        }

        await userModel.findByIdAndDelete(userId)
        return res.status(200).json("user deleted")
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}


module.exports = {
    register,
    login,
    profile,
    updateUser,
    deleteUser
}