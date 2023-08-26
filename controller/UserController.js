const UserModel = require('../models/user')
class UserController{
    
    static home =(req,res)=>{
        res.render('home')
    }
    static about =(req,res)=>{
         res.render('about')
    }
    static team =(req,res)=>{
         res.send('hello team')
    }
    
}
module.exports=UserController