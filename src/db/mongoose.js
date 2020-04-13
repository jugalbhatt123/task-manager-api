const mongoose = require('mongoose')


 mongoose.connect(process.env.DATABASE_URL,{
     useNewUrlParser : true,
     useCreateIndex : true,
     useFindAndModify : false,
     useUnifiedTopology:true
 })



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://jugalbhatt123:Panujugu123@mycluster-bftbr.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// const process = require('process')



