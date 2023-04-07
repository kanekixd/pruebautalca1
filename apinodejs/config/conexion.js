const mysql = require('mysql');

const conexion = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'password',
    port:3306,
    database: 'utalca'
});

conexion.connect((err) =>{
    if(err){
        console.log('a pasao algo malo: '+ err)

    }else{
        console.log("la base de datos conecto")
    }
});

module.exports= conexion;