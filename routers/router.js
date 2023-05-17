import { Router } from "express"; // Модель импорта модуля согласно стандарту питона, модуль експортируеться целиком как експерес
//const path = require("path")
import path from "path";
import chalk from "chalk";
import {con as connection} from "../rest/db_con.js";
//  import * as auth from "../rest/auth.js"
import bcrypt from "bcryptjs"
import { getAll, createNewServ,remove,restgetAll } from "../src/server.js";
const __dirname = path.resolve();
let dotenvp=path.join(__dirname,"./env")
//require('dotenv').config({path: dotenvp})
const PORT = process.env.PORT ?? 3001  // || 3001  два варианта или, и с проверкой наличия в енв 
// чтобы передать в енв надо использовать export PORT = 3000, SET PORT = 3000
const router = Router();
let rand = 0;
router.get("/",(req,res)=>{
 // res.send("<h1> Its test-express Server </h1>") ------->
  //  res.render("index",{title:"Home Page",active:"Home"});
  //  console.log(req.requestTime)
  res.render("index",{title:"Home"})
})

router.get("/welcome",(req,res)=>{
    res.render("welcome",{title:"Welcome to Page",active:"Welcome"});
})
router.post("/truly",(req,res)=>{
  if (!(process.env.REGISTER_POSSIBILITY === 'true')) {
    res.status(500).send('Доступ для нової реєстрації закритий! №___'+rand++)
    return
  }
})
// todo TRY router.put() , router.patch()
router.get("/vue",(req,res)=>{
  res.render("vueTest",{title:"Vue to Page",active:"Vue"});
})

router.get("/rowT",(req,res)=>{
res.render("rowTest",{title:"RowTEST",active:"RowT"});
})

router.get("/spinnerTest",(req,res)=>{
res.render("spinnerTest",{title:"spinnerTest", active:"spinner"});
})
router.delete("/api/server/:id",remove)

// router.put();
// router.patch();

router.get("/api/server",getAll)
router.post("/api/server",createNewServ)
router.post("/restapi/server",restgetAll)
//-------------------------
// router.get("/", function (req,res,next){
//   res.render("takeAuth")
// })

router.post("/login", async(req,res,next)=>{
  const {login,password} = req.body
  await connection.query("SELECT * FROM users WHERE login = ?",[login])
  .then(([results])=>{
      if (results.length == 0){throw new Error("check correctnes data")}
      return auth.getToken(results[0].password_hash,login,password)
  })
  .then(token =>{
      res.send(token)
      //addLog({ type: 'SUCCESSFUL_USER_LOGIN', description: 'Вдало ввiйшов користувач', req, json_args: { login: login } })
  })
  .catch(error =>{
      //addLog({ type: 'FAIL_USER_LOGIN', description: 'Невдала спроба входу користувача', req, json_args: { login: login } })
      if(typeof error =="object" && message in error ){
          res.status(500).send(error.message)
      }else{
          res.status(500).send(error)
      }
  })
})


router.post("/register",async(req,res)=>{
  
  const user = {
      login:req.body.login,
      password:bcrypt.hashSync(req.body.password, 10) // 10 - saltRounds
  }
  await connection.query("INSERT INTO users SET ?",user)
  .then(_=>{
      res.send("Seccesfull registration")
  })
  .catch(error =>{
      if(error.code == "ER_DUP_ENTRY"){
          res/status(400).send("rent login name")
      }else res.status(500).send(error.message)
  })
})

router.post("/check",(req,res)=>{
auth.auth(req)
.then(u=>{
    res.json(u.login)
})
.catch(error =>{
    res.status(500).send(error)
})  
})
//-----------------------------

export{router} // try: export default router
