const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        }

    }
)

module.exports = new mongoose.model("User", userSchema)


