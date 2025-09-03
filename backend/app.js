import express from "express";
import cors from "cors";


const app = express();

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb",extended:true}))
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true,
}))


// import lead router here

import { leadRouter } from "./src/routes/lead.route.js";


app.use("/api/v1/lead",leadRouter);



export {
    app,
}