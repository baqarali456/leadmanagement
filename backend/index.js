import { app } from "./app.js"
import connectDB from "./src/db/db.js"

connectDB()
.then(()=>{
   app.listen(process.env.PORT,()=>{
     console.log("SERVER LISTENING ON PORT",process.env.PORT)
   })
   app.on('error',(err)=>{
    console.log("SERVER ERROR",err)
   
    
   })
})
.catch((err)=>{
   console.log('MONGODB CONNECTION FAILED IN APP CATCH BLOCK',err ? err?.message: '')
   
})
