const mysql=require('mysql2');
module.exports=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
    database: "mysql",
    port:3306,
  });