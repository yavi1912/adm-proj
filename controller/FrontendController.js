const UserModel = require("../models/user")
const bcrypt = require('bcrypt')
const cloudinary = require("cloudinary").v2;
const jwt  = require('jsonwebtoken');
const CourseModel = require("../models/course");

          
cloudinary.config({ 
  cloud_name: 'dfma8ebzh', 
  api_key: '978924289879812', 
  api_secret: '8Jk69qCvnk9gJZ6k4GAPCTs10eM' 
});

class FrontController {
    static login=async(req,res)=>{
        try {
          res.render('login',{message:req.flash('success')})
        } catch (error) {
           console.log(error)
        }
    }
    static register =async(req,res)=>{
        try {
          res.render('register',{message:req.flash('error')})  
        } catch (error) {
           console.log(error)
        }
    }
    static dashboard=async(req,res)=>{
        try {
          const{name,image,_id} = req.data1
          const btech = await CourseModel.findOne({user_id:_id,course:'B.Tech.'})
          const mca = await CourseModel.findOne({user_id:_id,course:'MCA'})
          const bca = await CourseModel.findOne({user_id:_id,course:'BCA'})
            // console.log(name)
            res.render('dashboard',{n:name, img:image, b:btech, bca:bca, mca:mca})
        } catch (error) {
           console.log(error)
      }
    }
    static about=async(req,res)=>{
        try {
          const{name,image} = req.data1
          res.render('about',{n:name, img:image})  
        } catch (error) {
           console.log(error)
      }
    }
    static contact=async(req,res)=>{
        try {
          const{name,image} = req.data1
          res.render('contact',{n:name, img:image})  
        } catch (error) {
           console.log(error)
      }
    }
    static userinsert=async(req,res)=>{
        const{name,email,password,confirmpassword}= req.body
        const image = req.files.image
        //  console.log(image)
        const imageupload = await cloudinary.uploader.upload(image.tempFilePath,{
          folder: 'profileimage'
        })
        // console.log(imageupload)
          const user = await UserModel.findOne({email:email})
          // console.log(user)
          if(user){
            req.flash('error','Email already exist!')
            res.redirect('/register')
          }else{
            if(name && email && password && confirmpassword){
              if (password == confirmpassword) {
                  try {
                      const hashpassword = await bcrypt.hash(password, 10);
                      //console.log(hashpassword);
                      const result = new UserModel({
                          name:name,
                          email:email,
                          password:hashpassword,
                          image: {
                              public_id: imageupload.public_id,
                              url: imageupload.secure_url,
                            },
                      })
                      await result.save()
                      req.flash('success','registration successfully please login!')
                      res.redirect('/')
                  } catch (error) {
                      console.log(error)
                  }
                 } else {
                  req.flash('error','password and confirmpassword does not match!')
                  res.redirect('/register') 
              }
          }else{
              req.flash('error','all feild are required!')
              res.redirect('/register')
          }
      
            
          }
          
    } 
    static varifylogin = async (req, res) => {
      try {
          const { email, password } = req.body;
          if (email && password) {
            const user = await UserModel.findOne({ email: email })
    
            if (user != null) {
              const isMatched = bcrypt.compare(password, user.password)
              if ( isMatched) {
                if(user.role == 'student'){
                  // generate token
               const token = jwt.sign({ ID: user._id }, 'asus_september2020');
                //  console.log(token)
                 res.cookie('token',token)
                 res.redirect('/dashboard')
                }
                if(user.role == 'admin'){
                  // generate token
               const token = jwt.sign({ ID: user._id }, 'asus_september2020');
               //  console.log(token)
                  res.cookie('token',token)
                  res.redirect('/admin/dashboard')
                }
              } else {
                req.flash('error', 'Email or password is not valid')
                return res.redirect('/')
              }
            } else {
              req.flash('error', 'You are not a registered user')
              return res.redirect('/')
            }
          } else {
            req.flash('error', 'All Fields Required')
            return res.redirect('/')
          }
        } catch (err) {
          console.log(err);
        }
      }
      
    static logout = async(req,res)=>{
       try {
          res.clearCookie('token')
          res.redirect('/')
       } catch (error) {
          console.log(error)
       }
      }
      static profile=async(req,res)=>{
        try {
          const{name,image} = req.data1
          res.render('profile',{n:name, img:image})  
        } catch (error) {
           console.log(error)
      }
    }
    }
module.exports=FrontController









 // console.log(req.files.image)  
          // console.log(req.body)  
          // const result= new UserModel({
          //   name: req.body.name,
          //   email: req.body.email,
          //   password: req.body.password  
          // })
          // await result.save()
          // res.redirect('/')
          // res.send('Data received successfully')