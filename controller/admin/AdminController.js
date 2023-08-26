const CourseModel = require('../../models/course')

class AdminController {

    static dashboard = async (req, res) => {
        try {
            const { name, image, _id } = req.data1
            const data = await CourseModel.find()
            res.render('admin/dashboard', { n: name, img: image, p: data })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = AdminController