const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ajaydev:GiennJUjufj06RdJ@cluster0.4vopj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("DB connection successfull");
    } catch (error) {
        console.log(error);

    }
}

module.exports = connectDB