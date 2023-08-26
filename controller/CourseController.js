const CourseModel = require('../models/course')

class CourseController {

    static courseinsert = async (req, res) => {
        try {
            // console.log(req.body)
            // res.send('Data received successfully')
            const{_id} = req.data1
            const result = new CourseModel({
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                dob: req.body.dob,
                gender: req.body.gender,
                address: req.body.address,
                collage: req.body.collage,
                course: req.body.course,
                branch: req.body.branch,
                user_id:_id
            })
            await result.save()
            res.redirect('/course/display')

        } catch (error) {
            console.log(error)
        }
    }
    static coursedisplay = async (req, res) => {
        try {
            const{name,image,_id} = req.data1
            const data = await CourseModel.find({user_id:_id})
            // console.log(data)
            res.render('course/display',{n:name, img:image, d:data})
        } catch (error) {
            console.log(error)
        }
    }
    static courseview = async (req, res) => {
        try {
            const{name,image} = req.data1
            const data = await CourseModel.findById(req.params.id)
            // console.log(data)
            res.render('course/view',{n:name, img:image, d:data})
        } catch (error) {
            console.log(error)
        }
    }
    static courseedit = async (req, res) => {
        try {
            const{name,image} = req.data1
            const data = await CourseModel.findById(req.params.id)
            // console.log(data)
            res.render('course/edit',{n:name, img:image, d:data})
        } catch (error) {
            console.log(error)
        }
    }
    static courseupdate = async (req, res) => {
        try {
            const data = await CourseModel.findByIdAndUpdate(req.params.id,{
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                dob: req.body.dob,
                gender: req.body.gender,
                address: req.body.address,
                collage: req.body.collage,
                course: req.body.course,
                branch: req.body.branch  
            })
            // console.log(data)
            
            res.redirect('/course/display')
        } catch (error) {
            console.log(error)
        }
    }
    static coursedelete = async (req, res) => {
        try {
            const data = await CourseModel.findByIdAndDelete(req.params.id)
            // console.log(data)
            res.redirect('/course/display')
        } catch (error) {
            console.log(error)

        }
    }
}
module.exports = CourseController