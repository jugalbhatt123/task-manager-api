const express = require('express')
const router = new express.Router()
const Tasks = require('../models/task')
const auth =require('../middleware/auth')
const User = require('../models/user')


router.post('/task',auth, async function (req,res){
    
    const task = new Tasks({
        ...req.body,
        owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


//GET /tasks?status=false&limit=2&skip=0&sortBy=createdAt:desc
router.get('/task',auth,async (req,res)=>{
    const match = {}
    const sort ={}
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]= parts[1]==='desc' ?-1:1
    }
    if(req.query.status){
        match.status = req.query.status==='true'
    }
    try{
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(404).send(e)
    }
})

router.get('/task/:id',auth, async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Tasks.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/task/:id',async (req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','status']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'invalid updates'})

    }
    try{
        const task = await Tasks.findByIdAndUpdate(_id)
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()

        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})  

router.delete('/task/:id',async (req,res)=>{
    const _id = req.params.id

    try{
        const task = await Tasks.findByIdAndDelete(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router