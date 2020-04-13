const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')


const taskSchema= new mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true,


    },
    status:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'User'  
    }
},{
    timestamps:true
})


//use for removing any field from display in postman
taskSchema.methods.toJSON= function(){
    const task = this
    const taskObject = task.toObject()
    // delete taskObject.owner
    return taskObject
}

const Tasks =mongoose.model('Tasks',taskSchema)

module.exports =Tasks