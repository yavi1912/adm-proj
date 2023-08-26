const express = require('express')
const app = express()
const port = 1000
const web = require('./routes/web')
const connectdb = require('./db/dbcon')

const fileUpload = require('express-fileupload')

//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser())

//temp file uploader
app.use(fileUpload({ useTempFiles: true }))

//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash')

//messages
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
}))
//false messages
app.use(flash())

//connection
connectdb()

//data get
app.use(express.urlencoded({ extended: true }))

//router load
app.use('/', web)

//ejs set html
app.set('view engine', 'ejs')

//static files
app.use(express.static('public'))


//server create
app.listen(port, () => {
  console.log(`server start localhost:${port}`)
  //$=templating string
})
