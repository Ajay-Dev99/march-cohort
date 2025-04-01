const { create, listCourses, courseDetails, updateCourse, deleteCourse } = require('../controllers/courseController')
const upload = require('../middlewares/multer')

const courseRouter = require('express').Router()


courseRouter.post("/create", upload.single("image"), create)
courseRouter.get("/list-courses", listCourses)
courseRouter.get("/list-course/:courseId", courseDetails)
courseRouter.patch("/update-course/:courseId", upload.single('image'), updateCourse)
courseRouter.delete("/delete-course/:courseId", deleteCourse)




module.exports = courseRouter