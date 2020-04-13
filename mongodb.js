
const {MongoClient,ObjectID} = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()



MongoClient.connect(connectionURL,{ useNewUrlParser: true },(error,client)=>{
    if(error){
       return console.log('unable to connect to  database')
    }  

    const db = client.db(databaseName)

    // db.collection('users').findOne({_id:new ObjectID("5e82f1212ea3155830eb6909")},(error,response)=>{
    //     if(error){
    //        return console.log('unable to fetch')
    //     }
    //     console.log(response)
    // })

    // db.collection('users').find({age:18}).count((error,response)=>{
    //     if(error){
    //         return console.log('unable to fetch')
    //     }
    //     console.log(response)
    // }) 

    db.collection('users').insertOne({name:'benji',age:32}).then((result)=>{
        console.log(result.ops)
    }).catch((error)=>{
        console.log(error)
    })
})