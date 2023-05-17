 import express  from "express"; // Модель импорта модуля согласно стандарту питона, модуль експортируеться целиком как експерес
// //const path = require("path")
// import chalk from "chalk";

 import path from "path";
 import {requestTime,logger} from "./public/middleware.js"
 import dotenv from "dotenv"
 import session from 'express-session';
 import { authenticator } from 'otplib';
 import QRCode from 'qrcode';
 import jwt from 'jsonwebtoken';
 import expressJWT from 'express-jwt';
 import bodyParser from 'body-parser';
 import {auth} from './routers/auth.js';
 //import { createRequire } from 'module';
 dotenv.config();
  //const require = createRequire(import.meta.url);
 const __dirname = path.resolve();

// let dotenvp=path.join(__dirname,"./env")
// //require('dotenv').config({path: dotenvp})
// const PORT = process.env.PORT ?? 3001  // || 3001  два варианта или, и с проверкой наличия в енв 
// // чтобы передать в енв надо использовать export PORT = 3000, SET PORT = 3000
// const app = express();

const app = express("express")
import {router} from "./routers/router.js";
app.use(requestTime,logger)
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname,"ejs"))
console.log(app.get("views"))
const PORT = process.env.PORT ?? 3006
app.use("/login", auth)
app.use(express.json()) // для роботы с json 
app.use(express.urlencoded({ extended: false }));// Тоже для работы с json
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(router); // инициализирую подключeние обработчика  запросов todos методом инциализации новых middleware(?)
//bodyParser.urlencoded({extended:true})

app.use(express.static(path.resolve(__dirname,"public")));
//app.use(express.static(path.resolve(__dirname,"ejs")));

//app.use("/signin", import("./routers/auth"))

app.listen(PORT,()=>{
console.info(`Server has been started ON port::${PORT}...`)
}) 