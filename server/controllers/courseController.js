const courseModel = require("../model/courseModel");
const uploadToCloudinary = require("../utilites/imageUpload");

const create = async (req, res) => {
    try {

        const { title, description, duration, price } = req.body

        if (!title || !description || !duration || !price) {
            return res.status(400).json({ error: "All fields are required" })
        }
        if (!req.file) {
            return res.status(400).json({ error: 'image not found' })
        }

        const cloudinaryRes = await uploadToCloudinary(req.file.path)

        const newCourse = new courseModel({
            title, description, duration, price, image: cloudinaryRes
        })

        let savedCourse = await newCourse.save()
        if (savedCourse) {
            return res.status(200).json({ message: "Course added", savedCourse })
        }

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })

    }
}

const listCourses = async (req, res) => {
    try {
        const courseList = await courseModel.find();

        res.status(200).json(courseList)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

const courseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;

        const courseDetails = await courseModel.findById(courseId)
        if (!courseDetails) {
            return res.status(400).json({ error: "Course not found" })
        }
        return res.status(200).json(courseDetails)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, duration, price } = req.body
        let imageUrl;

        let isCouseExist = await courseModel.findById(courseId)

        if (!isCouseExist) {
            return res.status(400).json({ error: "Course Not found" })
        }
        if (req.file) {
            const cloudinaryRes = await uploadToCloudinary(req.file.path)
            imageUrl = cloudinaryRes
        }

        const updatedCourse = await courseModel.findByIdAndUpdate(courseId, { title, description, duration, price, image: imageUrl }, { new: true })
        res.status(200).json({ messge: 'Course Updated', updatedCourse })

    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}


const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params
        const deleteCourse = await courseModel.findByIdAndDelete(courseId)
        if (!deleteCourse) {
            return res.status(400).json({ error: "Course Not found" })
        }
        res.status(200).json({ messsage: "Course deleted" })
    } catch (error) {
        console.log(error, "error");
        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }
}

module.exports = {
    create,
    listCourses,
    courseDetails,
    updateCourse,
    deleteCourse
}