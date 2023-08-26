const mongoose = require('mongoose')
//create schema
const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
        Rerequired:true 
    },
    email:{
        type:String,
        Rerequired:true 
    },
    mobile:{
        type:String,
        Rerequired:true 
    },
    dob:{
        type:String,
        Rerequired:true 
    },
    gender:{
        type:String,
        Rerequired:true 
    },
    address:{
        type:String,
        Rerequired:true 
    },
    collage:{
        type:String,
        Rerequired:true 
    },
    course:{
        type:String,
        Rerequired:true 
    },
    branch:{
        type:String,
        Rerequired:true 
    },
    user_id:{
        type:String,
        Required:true   
    },
},{timestamps:true})

const CourseModel = mongoose.model('course',CourseSchema)

module.exports = CourseModel 
