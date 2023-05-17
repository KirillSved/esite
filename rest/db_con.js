'use strict'
import * as mysql from 'mysql2'
let sql_config = {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DATABASE,
    multipleStatements: true,//?
    connectionLimit: 100,
}
const con = mysql.createPool(sql_config).promise();
export{con}