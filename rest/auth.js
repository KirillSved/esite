'use strict';

import * as jwt from "jsonwebtoken"
// import {con as connection} from "./db_con"
import bcrypt from "bcryptjs"
// const jwt = require("jsonwebtoken");
//const connection = con;
// const bcrypt = require("bcryptjs");
// const add_user_log_post = require('./logs').add_user_log_post;

export function getToken (passhash,email,password){
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,passhash,function(err,res){// todo try compare
            if(res){
                let token = jwt.sign({username:email}, process.env.TOKEN,{expiresIn:"24h"});
                resolve(token);
            }else reject("Authorisation error, check the correctness of the entered data")
        })
    })
}

const auth = (req) => {
    return new Promise((resolve,reject)=>{
        let token = req.headers['x-access-token'] || req.headers['authorization'] || req.cookies.authorization;
        if(token){
            if(token.startsWith('Bearer')){token = token.slice(7,token.length)}
        }else{
            reject("Authorisation error");
            return;
        }
        // is token good?
        jwt.verify(token,process.env.TOKEN, async(err,decodedToken)=>{
            if(err) {reject(err); return}
            if(!decodedToken){reject("Unvalid tokenKey"); return}
            //need return user
            connection.query((`SELECT * FROM users WHERE login  = ?;`,[decodedToken.username])
            .then(result => {
                if(result.length == 0 ){reject("Authorisation error, log pass unvalid");return}
                let user = result[0]
                // add_user_log_post(req,user)
                resolve(user)
            })
            .catch(err =>{
                reject(err)
            })
            )
        })
    })
}
export {auth}
