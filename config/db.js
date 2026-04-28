const mongo=require('mongoose')
require('dotenv').config(); 
const connection=async()=>{
    try{ 
const conn =mongo.connect(process.env.url).then(()=>{
    console.log("connection btw database established")
    })
}
catch(error){
    console.error("atlas not connected")
    
}

}
module.exports=connection