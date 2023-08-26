const mongoose = require('mongoose')
const live_url = 'mongodb+srv://shalini:shalini65@cluster0.i1c589m.mongodb.net/admissionportal?retryWrites=true&w=majority'
const local_url = 'mongodb://127.0.0.1:27017/adm-proj'

const connectdb = ()=>{
    return mongoose.connect(live_url)
    .then(()=>{
        console.log("Database Connected")
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports=connectdb