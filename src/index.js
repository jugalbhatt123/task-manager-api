const express = require('express')
require('./db/mongoose')
const User =require('./models/user')
const Tasks =require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
var mongoose = require('mongoose');
const multer = require('multer')

const auth = require('./middleware/auth')

// // DataBase Config
// const db = require('./config1/keys').mongoURI;

// // Connect to MongoDB
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

const app = express()
const port = process.env.PORT



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})


