import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config({});
import connectDB from "./Connection/db.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin: "http/localhost:5173",
    credentials : true
}

app.use(cors(corsOptions));


app.listen(PORT , () => {
    connectDB(),
    console.log(`Server running at port ${PORT}`)});
