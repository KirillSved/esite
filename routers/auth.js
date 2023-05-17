 import {Router} from "express";
 import {con as connection} from "../rest/db_con.js";
 import  {auth as auth} from "../rest/auth.js";
 import bcrypt from "bcryptjs"
 import { createRequire } from 'module';
 //const require = createRequire(import.meta.url);
 const router = Router();
 //const addLog = require('../code/logs').add
router.get("/", function (req,res,next){
    res.render("takeAuth",{title:"Login"})
})

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
export{router as auth}